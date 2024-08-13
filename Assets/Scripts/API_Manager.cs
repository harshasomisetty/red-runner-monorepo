using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using UnityEditor.PackageManager.Requests;
using UnityEngine.SocialPlatforms.Impl;
using UnityEngine.SocialPlatforms;
using System.Text;
using UnityEngine.Purchasing.MiniJSON;
using System.Net;

public class API_Manager : MonoBehaviour
{
    public delegate void SignInCallback(bool success, string message);
    public delegate void ScoreSubmit (bool success, string message);
    public delegate void LeaderBoardData (bool success, List<Leaderboard> data);
    public delegate void GameShopCall (bool success, string data);
    public delegate void GetImage (bool success, Sprite data);
    public delegate void GetInventory (bool success, string message);
    SignInCallback GoogleAuth = null;


    public static API_Manager instance;
    private void Awake()
    {
        DontDestroyOnLoad(this);
        instance = this;
    }
    #region JsCallingMethod
    public void SignInWithGoogle(SignInCallback signIn)
    {
        Debug.Log("Calling to SignInWithGoogle");
        GoogleAuth = signIn;
        Googl_Auth();
    }
    [System.Obsolete]
    public void Googl_Auth()
    {
        Debug.Log("Calling to JS Method Googl" );
        Application.ExternalEval($"signInWithGoogle('{StaticDataBank.clientId}', '{Application.absoluteURL}');");
    }
    // This method will be called by the JavaScript code (call back return by OAuth.js file.)
    public void OnGoogleSignIn(string idToken)
    {
        Debug.Log("Google ID Token: " + idToken + "Request URl for Firebase : " + Application.absoluteURL);
        ExchangeCodeForTokens(idToken);
        // Handle the ID token, e.g., send it to your backend server for verification
    }
    #endregion

    #region Goodle Auth Token
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
        form.AddField("client_id", StaticDataBank.clientId);
        form.AddField("client_secret", StaticDataBank.clientSecret);
        form.AddField("redirect_uri", requestUri);
        form.AddField("grant_type", "authorization_code");

        using (UnityWebRequest www = UnityWebRequest.Post(StaticDataBank.tokenEndpoint, form))
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

        using (UnityWebRequest www = UnityWebRequest.PostWwwForm(StaticDataBank.firebaseEndpoint, ""))
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
    #endregion

    #region Firebase Api's
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
        UnityWebRequest request = new UnityWebRequest(StaticDataBank.signUpUrl, "POST");
        byte[] bodyRaw = System.Text.Encoding.UTF8.GetBytes(json);
        request.uploadHandler = new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            callback(false, "User Already Exists");
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

        UnityWebRequest request = new UnityWebRequest(StaticDataBank.signInUrl, "POST");
        byte[] bodyRaw = System.Text.Encoding.UTF8.GetBytes(json);
        request.uploadHandler = new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            Debug.LogError(request.result);
            // CODE HERE //
            signInCallback(false, "Check password or username!");
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
    #endregion

    #region BackEnd for register or login
    private IEnumerator BackendRegisterorLogIn(string _idToken, string email, string localId, SignInCallback signUp)
    {
        WWWForm form = new WWWForm();
        form.AddField("tokenId", _idToken);
        form.AddField("email", email);
        form.AddField("userId", localId);

        using (UnityWebRequest www = UnityWebRequest.Post(StaticDataBank.registerOrLogin, form))
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

                StaticDataBank.walletAddress = walletId;

                string username = resoponse["user"]["name"].ToString();

                StaticDataBank.UserName = username;

                string jwttoken = resoponse["tokens"]["access"]["token"].ToString();

                StaticDataBank.playerlocalid = localId;

                StaticDataBank.jwttoken = jwttoken;

                signUp(true, "SuccessFully Loged In");
            }
        }
    }
    #endregion

    #region Leaderboard Api's
    public void Score_Submit(int score, string localId, ScoreSubmit submit)
    {
        StartCoroutine(Leadboard_SubmitScore(score, localId, submit));
    }
    private IEnumerator Leadboard_SubmitScore(int score, string localId, ScoreSubmit submit)
    {
        WWWForm form = new WWWForm();
        form.AddField("score", score.ToString());
        form.AddField("userId", localId);


        using (UnityWebRequest www = UnityWebRequest.Post(StaticDataBank.LeaderBoard_Submit, form))
        {
            www.SetRequestHeader("Content-Type", "application/json");
            www.SetRequestHeader("Authorization", "Bearer " + StaticDataBank.jwttoken);

            yield return www.SendWebRequest();

            if (www.result == UnityWebRequest.Result.ConnectionError || www.result == UnityWebRequest.Result.ProtocolError)
            {
                submit(false, "Failed to submit score");
                Debug.LogError(www.error);
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
        using (UnityWebRequest www = UnityWebRequest.Get(StaticDataBank.Get_LeaderBoard))
        {
            www.SetRequestHeader("Content-Type", "application/json");

            www.SetRequestHeader("Authorization", "Bearer " + StaticDataBank.jwttoken);

            yield return www.SendWebRequest();

            if (www.result == UnityWebRequest.Result.ConnectionError || www.result == UnityWebRequest.Result.ProtocolError)
            {
                data(false, null);
                Debug.LogError(www.error);
            }
            else
            {
                string jsonResponse = www.downloadHandler.text;
                Debug.Log(jsonResponse);
                List<Leaderboard> leaderboarddata = JsonConvert.DeserializeObject<List<Leaderboard>>(jsonResponse);
                data(true, leaderboarddata);
            }
        }
    }
    #endregion

    #region Shop Api's

    public void GetShopData(GameShopCall Call)
    {
        StartCoroutine(Get_ShopData(Call));
    }
    private IEnumerator Get_ShopData(GameShopCall Call)
    {

        using (UnityWebRequest www = UnityWebRequest.Get(StaticDataBank.Get_ShopData + StaticDataBank.playerlocalid))
        {
            www.SetRequestHeader("Authorization", "Bearer " + StaticDataBank.jwttoken);

            yield return www.SendWebRequest();

            if (www.result == UnityWebRequest.Result.ConnectionError || www.result == UnityWebRequest.Result.ProtocolError)
            {
                Debug.LogError(www.error);
                Call(false, null);
            }
            else
            {
                string jsonResponse = www.downloadHandler.text;
                Debug.Log(jsonResponse);
                //GameShop Shop_Data = JsonConvert.DeserializeObject<GameShop>(jsonResponse);
                //Debug.Log(Shop_Data.boosters.speed_boosters.speed_booster_10.price + " : speed booster price");
                Call(true, jsonResponse);
            }
        }
    }

    #endregion

    #region Download Images

    public void DownloadImage(string URL,GetImage sprite)
    {
        StartCoroutine(Download_Image(URL, sprite));
    }

    IEnumerator Download_Image(string url,GetImage spritecallback)
    {
        using (UnityWebRequest request = UnityWebRequestTexture.GetTexture(url))
        {
            // Send the request and wait for the download to complete
            yield return request.SendWebRequest();

            // Check for errors
            if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
            {
                spritecallback(false,null);
                Debug.Log("Error downloading image: " + request.error);
            }
            else
            {
                Debug.Log("A");
                // Get the downloaded texture
                Texture2D texture = ((DownloadHandlerTexture)request.downloadHandler).texture;

                // Convert the texture to a sprite and assign it to the Image component
                if (texture != null)
                {
                    // Create a sprite from the downloaded texture
                    Sprite sprite = Sprite.Create(
                        texture,
                        new Rect(0, 0, texture.width, texture.height),
                        new Vector2(0.5f, 0.5f));

                    // Set the sprite to the Image component
                    //previewImage.sprite = sprite;
                    spritecallback(true, sprite);
                }
            }
        }
    }

    #endregion

    #region Inventory
    public void GetInvectory(GetInventory getInventory)
    {
        StartCoroutine(Get_Inventory(getInventory));
    }
    private IEnumerator Get_Inventory(GetInventory getInventory)
    {
        var userData = new
        {
            pageNumber = 1,
            types = "UniqueAsset,Currency",
            forSale = false
        };

        string userDatajson = JsonConvert.SerializeObject(userData);

        string url = StaticDataBank.Get_Inventory + StaticDataBank.playerlocalid;

        UnityWebRequest request = new UnityWebRequest(url, "POST");

        byte[] bodyRaw = Encoding.UTF8.GetBytes(userDatajson);

        request.uploadHandler = new UploadHandlerRaw(bodyRaw);

        request.downloadHandler = new DownloadHandlerBuffer();

        request.SetRequestHeader("Content-Type", "application/json");

        request.SetRequestHeader("Authorization", "Bearer " + StaticDataBank.jwttoken);

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            getInventory(false, "Failed to Get Inventory");
            Debug.LogError(request.error);
        }
        else
        {
            string jsonResponse = request.downloadHandler.text;
            Debug.Log(jsonResponse);
            getInventory(true, jsonResponse);
        }
    }

    #endregion

}