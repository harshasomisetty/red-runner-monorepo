using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

public class GoogleAndFirebaseAuth : MonoBehaviour
{
    public delegate void SignInCallback(bool success, string message);
    public delegate void ScoreSubmit (bool success, string message);
    public delegate void LeaderBoardData (bool success, List<Root> data);
    SignInCallback GoogleAuth = null;


    public static GoogleAndFirebaseAuth instance;
    private void Awake()
    {
        instance = this;
    }
    public void SignInWithGoogle(SignInCallback signIn)
    {
        Debug.Log("Calling to SignInWithGoogle");
        GoogleAuth = signIn;
        Googl_Auth();
    }
    [System.Obsolete]
    public void CopyText()
    {
        Debug.Log("Calling to JS Method Googl");
        Application.ExternalEval($"copyToClipboard('{StaticStrings.walletAddress}');");
    }
    [System.Obsolete]
    public void Googl_Auth()
    {
        //newurl = RemoveLastCharacter(Application.absoluteURL);
        //Debug.Log(newurl);
        Debug.Log("Calling to JS Method Googl" );
        Application.ExternalEval($"signInWithGoogle('{StaticStrings.clientId}', '{Application.absoluteURL}');");
    }
    // This method will be called by the JavaScript code (call back return by OAuth.js file.)
    public void OnGoogleSignIn(string idToken)
    {
        Debug.Log("Google ID Token: " + idToken + "Request URl for Firebase : " + Application.absoluteURL);
        ExchangeCodeForTokens(idToken);
        // Handle the ID token, e.g., send it to your backend server for verification
    }
    public void ExchangeCodeForTokens(string authCode)
    {
        Debug.Log("recieved auth code from js:" + authCode);

        StartCoroutine(ExchangeCodeForTokensCoroutine(authCode));
    }

    private IEnumerator ExchangeCodeForTokensCoroutine(string authCode)
    {
        string requestUri = Application.absoluteURL;
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

                JObject resoponse = JObject.Parse(jsonResponse);

                Debug.Log("Access Token in JObject: " + resoponse["access_token"]);

                string myidtoken = resoponse["id_token"].ToString();

                Debug.Log("ID Token: " + myidtoken);

                AuthenticateWithFirebase(myidtoken);
            }
        }
    }
    public void SignUpUserWithFirebase(string email, string password, SignInCallback callback)
    {
        StartCoroutine(SignUpFirebase(email, password, callback));
    }

    private IEnumerator SignUpFirebase(string email, string password, SignInCallback callback)
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
            callback(false, " User Already Exists");
            Debug.LogError(request.result);
        }
        else
        {
            Debug.Log(request.downloadHandler.text);
            JObject resoponse = JObject.Parse(request.downloadHandler.text);

            string _idToken = resoponse["idToken"].ToString();

            string getemail = resoponse["email"].ToString();

            string localId = resoponse["localId"].ToString();

            Debug.Log("ID token : " + _idToken + " email : " + email + " localId : " + localId);

            StartCoroutine(BackendRegisterorLogIn(_idToken, email, localId, callback));
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
            // CODE HERE //
            signInCallback(false, "User Does Not Exist.\n Please Sign Up!");
        }
        else
        {
            Debug.Log(request.downloadHandler.text);
            JObject resoponse = JObject.Parse(request.downloadHandler.text);

            string _idToken = resoponse["idToken"].ToString();

            //string getemail = resoponse["email"].ToString();

            string localId = resoponse["localId"].ToString();

            Debug.Log("ID token : " + _idToken +  " localId : " + localId);


            StartCoroutine(BackendRegisterorLogIn(_idToken, email, localId, signInCallback));
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

                //GoogleAuth(true, "Google Auth Success");

                StartCoroutine(BackendRegisterorLogIn(_idToken, email, localId, GoogleAuth));
            }
        }
    }
    private IEnumerator BackendRegisterorLogIn(string _idToken, string email, string localId, SignInCallback signUp)
    {
        WWWForm form = new WWWForm();
        form.AddField("tokenId", _idToken);
        form.AddField("email", email);
        form.AddField("userId", localId);

        using (UnityWebRequest www = UnityWebRequest.Post(StaticStrings.registerOrLogin, form))
        {
            yield return www.SendWebRequest();

            if (www.result == UnityWebRequest.Result.ConnectionError || www.result == UnityWebRequest.Result.ProtocolError)
            {
                if (www.responseCode == 409)
                {
                    Debug.LogWarning("Conflict detected: HTTP 409. Attempting to resolve the conflict...");
                    signUp(false, " User Already Exist");
                }
                else
                {
                    signUp(false, "Server Error : " + www.error);
                    Debug.LogError(www.error);
                }
            }
            else
            {
                string jsonResponse = www.downloadHandler.text;

                Debug.Log(jsonResponse);

                JObject resoponse = JObject.Parse(jsonResponse);

                string walletId = resoponse["user"]["walletId"].ToString();

                StaticStrings.walletAddress = walletId;

                string username = resoponse["user"]["name"].ToString();

                StaticStrings.UserName = username;

                string jwttoken = resoponse["tokens"]["access"]["token"].ToString();

                StaticStrings.playerlocalid = localId;

                StaticStrings.jwttoken = jwttoken;

                signUp(true, "SuccessFully Loged In");
            }
        }
    }
    public void Score_Submit(string score, string localId, ScoreSubmit submit)
    {
        StartCoroutine(Leadboard_SubmitScore(score, localId, submit));
    }
    private IEnumerator Leadboard_SubmitScore(string score, string localId, ScoreSubmit submit)
    {
        int newscore = ExtractInteger(score);
        Debug.Log("my score goes to server is : " + newscore);
        WWWForm form = new WWWForm();
        form.AddField("score", newscore.ToString());
        form.AddField("userId", localId);

        using (UnityWebRequest www = UnityWebRequest.Post(StaticStrings.LeaderBoard_Submit, form))
        {
            www.SetRequestHeader("Authorization", "Bearer " + StaticStrings.jwttoken);

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
            www.SetRequestHeader("Authorization", "Bearer " + StaticStrings.jwttoken);

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
                List<Root> leaderboarddata = JsonConvert.DeserializeObject<List<Root>>(jsonResponse);
                data(true, leaderboarddata);
            }
        }
    }
    public static int ExtractInteger(string s)
    {
        Match match = Regex.Match(s, @"\d+");

        if (match.Success)
        {
            return int.Parse(match.Value);
        }

        throw new InvalidOperationException("No integer found in the string.");
    }
}
[Serializable]
public struct Root
{
    public string name;
    public string userId;
    public int score;
    public DateTime createdAt;
    public DateTime updatedAt;
}
