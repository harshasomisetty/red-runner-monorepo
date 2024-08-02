using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

public class GoogleAndFirebaseAuth : MonoBehaviour
{
    // Delegate for handling the response
    public delegate void SignUpCallback(bool success, string message);
    public delegate void SignInCallback(bool success, string message);
    public delegate void SignInWithGoogleCallback (bool success, string message);
    public delegate void ScoreSubmit (bool success, string message);
    public delegate void LeaderBoardData (bool success, LeaderboarData data);
    SignInWithGoogleCallback GoogleAuth;


    public static GoogleAndFirebaseAuth instance;
    private void Awake()
    {
        instance = this;
    }
    public void SignInWithGoogle(SignInWithGoogleCallback signIn)
    {
        GoogleAuth = signIn;
        Googl_Auth();
    }
    [System.Obsolete]
    public void Googl_Auth()
    {
        //newurl = RemoveLastCharacter(Application.absoluteURL);
        //Debug.Log(newurl);
        //Debug.Log("Calling to JS Method " + newurl);
        Application.ExternalEval($"signInWithGoogle('{StaticStrings.clientId}', '{Application.absoluteURL}');");
    }
    // This method will be called by the JavaScript code (call back return by OAuth.js file.)
    public void OnGoogleSignIn(string idToken)
    {
        Debug.Log("Google ID Token: " + idToken + "Request URl for Firebase : " + Application.absoluteURL);
        ExchangeCodeForTokens(idToken, Application.absoluteURL);
        // Handle the ID token, e.g., send it to your backend server for verification
    }
    public void ExchangeCodeForTokens(string authCode, string requestUri)
    {
        Debug.Log("recieved auth code from js:" + authCode);

        StartCoroutine(ExchangeCodeForTokensCoroutine(authCode, requestUri));
    }

    private IEnumerator ExchangeCodeForTokensCoroutine(string authCode, string requestUri)
    {
        WWWForm form = new WWWForm();
        form.AddField("code", authCode);
        form.AddField("client_id", StaticStrings.clientId);
        form.AddField("client_secret", StaticStrings.clientSecret);
        form.AddField("redirect_uri", requestUri);
        form.AddField("grant_type", "authorization_code");

        using (UnityWebRequest www = UnityWebRequest.Post(StaticStrings.tokenEndpoint, form))
        {
            yield return www.SendWebRequest();

            if (www.result == UnityWebRequest.Result.ConnectionError || www.result == UnityWebRequest.Result.ProtocolError)
            {
                Debug.LogError(www.error);
            }
            else
            {
                string jsonResponse = www.downloadHandler.text;
                //TokenResponse tokenResponse = JsonConvert.DeserializeObject<TokenResponse>(jsonResponse);
                JObject resoponse = JObject.Parse(jsonResponse);
                //Debug.Log("Access Token: " + tokenResponse.access_token);
                Debug.Log("Access Token in JObject: " + resoponse["access_token"]);
                string myidtoken = resoponse["id_token"].ToString();
                Debug.Log("ID Token: " + myidtoken);
                //Debug.Log("ID Token in JObject: " + tokenResponse.id_token);

                // Now authenticate with Firebase
                AuthenticateWithFirebase(myidtoken);
            }
        }
    }
    public void SignUpUserWithFirebase(string email, string password, SignUpCallback callback)
    {
        StartCoroutine(SignUpFirebase(email, password, callback));
    }

    private IEnumerator SignUpFirebase(string email, string password, SignUpCallback callback)
    {

        var userData = new 
        {
            email = email,
            password = password,
            returnSecureToken = true
        };

        //string json = JsonUtility.ToJson(userData);
        string json = JsonConvert.SerializeObject(userData);
        UnityWebRequest request = new UnityWebRequest(StaticStrings.signUpUrl, "POST");
        byte[] bodyRaw = System.Text.Encoding.UTF8.GetBytes(json);
        request.uploadHandler = new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            Debug.LogError(request.result);
            callback(false, request.error);
        }
        else
        {
            Debug.Log("User signed up successfully!");
            Debug.Log(request.downloadHandler.text);
            JObject resoponse = JObject.Parse(request.downloadHandler.text);

            string _idToken = resoponse["idToken"].ToString();

            string getemail = resoponse["email"].ToString();

            string localId = resoponse["localId"].ToString();

            Debug.Log("ID token : " + _idToken + " email : " + email + " localId : " + localId);
            callback(true, "User signed up successfully!");
            StartCoroutine(BackendRegister(_idToken, email, localId));
        }
    }

    public void SignInUserWithFirebase(string email, string password, SignInCallback signInCallback)
    {
        StartCoroutine(SignInFirebase(email, password, signInCallback));
    }

    private IEnumerator SignInFirebase(string email, string password, SignInCallback signInCallback)
    {

        var userData = new 
        {
            email = email,
            password = password,
            returnSecureToken = true
        };

        //string json = JsonUtility.ToJson(userData);
        string json = JsonConvert.SerializeObject(userData);

        UnityWebRequest request = new UnityWebRequest(StaticStrings.signInUrl, "POST");
        byte[] bodyRaw = System.Text.Encoding.UTF8.GetBytes(json);
        request.uploadHandler = new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            Debug.LogError(request.result);
            signInCallback(false, "Sign In Failed");
        }
        else
        {
            Debug.Log("User signed in successfully!");
            Debug.Log(request.downloadHandler.text);
            JObject resoponse = JObject.Parse(request.downloadHandler.text);

            string _idToken = resoponse["idToken"].ToString();

            string getemail = resoponse["email"].ToString();

            string localId = resoponse["localId"].ToString();

            Debug.Log("ID token : " + _idToken + " email : " + email + " localId : " + localId);
            signInCallback(true, "Sign In Success");
            //string email=
            StartCoroutine(BackendLogIn(_idToken, localId));
        }
    }


    
    private void AuthenticateWithFirebase(string idToken)
    {
        StartCoroutine(AuthenticateWithFirebaseCoroutine(idToken));
    }

    private IEnumerator AuthenticateWithFirebaseCoroutine(string idToken)
    {
        var requestBody = new
        {
            postBody = $"id_token={idToken}&providerId=google.com",
            requestUri = "http://localhost",
            returnIdpCredential = true,
            returnSecureToken = true
        };

        string jsonRequestBody = JsonConvert.SerializeObject(requestBody);

        using (UnityWebRequest www = UnityWebRequest.PostWwwForm(StaticStrings.firebaseEndpoint, ""))
        {
            byte[] bodyRaw = new System.Text.UTF8Encoding().GetBytes(jsonRequestBody);
            www.uploadHandler = new UploadHandlerRaw(bodyRaw);
            www.downloadHandler = new DownloadHandlerBuffer();
            www.SetRequestHeader("Content-Type", "application/json");

            yield return www.SendWebRequest();

            if (www.result == UnityWebRequest.Result.ConnectionError || www.result == UnityWebRequest.Result.ProtocolError)
            {
                Debug.LogError(www.error);
                GoogleAuth(false, "Google Auth Failed");
            }
            else
            {
                string jsonResponse = www.downloadHandler.text;

                Debug.Log("Firebase Auth Response: " + jsonResponse);

                JObject resoponse = JObject.Parse(jsonResponse);

                string _idToken = resoponse["idToken"].ToString();

                string email = resoponse["email"].ToString();

                string localId = resoponse["localId"].ToString();

                Debug.Log("ID token : " + _idToken + " email : " + email + " localId : " + localId);

                GoogleAuth(true, "Google Auth Success");

                StartCoroutine(BackendRegister(_idToken, email, localId));
            }
        }
    }
    private IEnumerator BackendRegister(string _idToken, string email, string localId)
    {
        WWWForm form = new WWWForm();
        form.AddField("tokenId", _idToken);
        form.AddField("email", email);
        form.AddField("userId", localId);

        using (UnityWebRequest www = UnityWebRequest.Post(StaticStrings.Register, form))
        {
            yield return www.SendWebRequest();

            if (www.result == UnityWebRequest.Result.ConnectionError || www.result == UnityWebRequest.Result.ProtocolError)
            {
                Debug.LogError(www.error);
            }
            else
            {
                string jsonResponse = www.downloadHandler.text;
                Debug.Log(jsonResponse);
            }
        }
    }
    private IEnumerator BackendLogIn(string _idToken, string localId)
    {
        WWWForm form = new WWWForm();
        form.AddField("tokenId", _idToken);
        form.AddField("userId", localId);


        using (UnityWebRequest www = UnityWebRequest.Post(StaticStrings.LogIn, form))
        {
            yield return www.SendWebRequest();

            if (www.result == UnityWebRequest.Result.ConnectionError || www.result == UnityWebRequest.Result.ProtocolError)
            {
                Debug.LogError(www.error);
            }
            else
            {
                string jsonResponse = www.downloadHandler.text;
                Debug.Log(jsonResponse);
                StaticStrings.playerlocalid = localId;
                StaticStrings.tokenId = _idToken;
            }
        }
    }
    public void Score_Submit(string score, string localId, ScoreSubmit submit)
    {
        StartCoroutine(Leadboard_SubmitScore(score, localId, submit));
    }
    private IEnumerator Leadboard_SubmitScore(string score, string localId, ScoreSubmit submit)
    {
        WWWForm form = new WWWForm();
        form.AddField("score", score);
        form.AddField("userId", localId);

        using (UnityWebRequest www = UnityWebRequest.Post(StaticStrings.LeaderBoard_Submit, form))
        {
            www.SetRequestHeader("Authorization", "Bearer " + StaticStrings.tokenId);

            yield return www.SendWebRequest();

            if (www.result == UnityWebRequest.Result.ConnectionError || www.result == UnityWebRequest.Result.ProtocolError)
            {
                Debug.LogError(www.error);
                submit(false, "Failed to submit score");
            }
            else
            {
                string jsonResponse = www.downloadHandler.text;
                Debug.Log(jsonResponse);
                submit(true, "Successfully to submit score");
            }
        }
    }
    public void Leadboard_GetAll(LeaderBoardData data)
    {
        StartCoroutine(Leadboard_Get(data));
    }
    private IEnumerator Leadboard_Get(LeaderBoardData data)
    {
        using (UnityWebRequest www = UnityWebRequest.Get(StaticStrings.Get_LeaderBoard))
        {
            www.SetRequestHeader("Authorization", "Bearer " + StaticStrings.tokenId);

            yield return www.SendWebRequest();

            if (www.result == UnityWebRequest.Result.ConnectionError || www.result == UnityWebRequest.Result.ProtocolError)
            {
                Debug.LogError(www.error);
                data(false, null);
            }
            else
            {
                string jsonResponse = www.downloadHandler.text;
                Debug.Log(jsonResponse);
                LeaderboarData leaderboarddata = JsonUtility.FromJson<LeaderboarData>(jsonResponse);
                Debug.Log(leaderboarddata.data[0].name);
                data(true, leaderboarddata);
            }
        }
    }
}
[System.Serializable]
public class Root
{
    public string userId;
    public int score;
    public string name;
}
[System.Serializable]
public class LeaderboarData
{
    public Root[] data;
}
