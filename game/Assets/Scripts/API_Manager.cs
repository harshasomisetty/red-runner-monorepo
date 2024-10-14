using System;
using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Text;
using Unity.Profiling;

public class API_Manager : SingletonBase<API_Manager>
{
    public delegate void SignInCallback(bool success, string message);
    public delegate void ScoreSubmit (bool success, string message);
    public delegate void LeaderBoardData (bool success, List<Leaderboard> data);
    public delegate void GameShopCall (bool success, GameShop data);
    public delegate void GetImage (bool success, Sprite data);
    public delegate void GetInventory(bool success, InventoryData.Root data);
    public delegate void MintingNft(bool success, string message);
    public delegate void TokenPushingDelg(bool success, string message);
    public delegate void InventoryUpdateDelg(bool success, string message);
    public delegate void BuyItemCall(bool success, string message);
    public delegate void GetMarketPlaceCall(bool success, MarketPlace.Root message);
    public delegate void ListOnSaleCal(bool success, string message);
    SignInCallback GoogleAuth = null;


    protected override void Awake()
    {
        Application.runInBackground = true;
        base.Awake();
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


        //*
        string jsonRequestBody = JsonConvert.SerializeObject(requestBody);

        string url = StaticDataBank.firebaseEndpoint;

        UnityWebRequest request = new UnityWebRequest(url, "POST");

        byte[] bodyRaw = Encoding.UTF8.GetBytes(jsonRequestBody);

        request.uploadHandler = new UploadHandlerRaw(bodyRaw);

        request.downloadHandler = new DownloadHandlerBuffer();

        request.SetRequestHeader("Content-Type", "application/json");

        yield return request.SendWebRequest();
        //

        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            Debug.LogError(request.error);
            GoogleAuth(false, "Google Auth Failed");
        }
        else
        {
            string jsonResponse = request.downloadHandler.text;

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
    #endregion

    #region Firebase Api's
    public void SignUpUserWithFirebase(string email, string password, SignInCallback callback)
    {
        StartCoroutine(SignUpFirebase(email, password, callback));
    }

    private IEnumerator SignUpFirebase(string _email, string _password, SignInCallback callback)
    {

        var userData = new 
        {
            email = _email,
            password = _password,
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
            callback(false, "User already exists");
            Debug.LogError(request.result);
        }
        else
        {
            Debug.Log(request.downloadHandler.text);
            JObject resoponse = JObject.Parse(request.downloadHandler.text);

            string _idToken = resoponse["idToken"].ToString();

            string getemail = resoponse["email"].ToString();

            string localId = resoponse["localId"].ToString();

            Debug.Log("ID token : " + _idToken + " email : " + _email + " localId : " + localId);

            StartCoroutine(BackendRegisterorLogIn(_idToken, _email, localId, callback));
        }
    }

    public void SignInUserWithFirebase(string email, string password, SignInCallback signInCallback)
    {
        StartCoroutine(SignInFirebase(email, password, signInCallback));
    }

    private IEnumerator SignInFirebase(string _email, string _password, SignInCallback signInCallback)
    {

        var userData = new 
        {
            email = _email,
            password = _password,
            returnSecureToken = true
        };

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


            StartCoroutine(BackendRegisterorLogIn(_idToken, _email, localId, signInCallback));
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
                    signUp(false, " User already exist");
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

                //Debug.Log("jwttoken : " + jwttoken);

                signUp(true, "SuccessFully Loged In");
            }
        }
    }
    #endregion

    #region Leaderboard Api's
    public void Score_Submit(int score, ScoreSubmit submit)
    {
        StartCoroutine(Leadboard_SubmitScore(score, submit));
    }
    private IEnumerator Leadboard_SubmitScore(int m_score, ScoreSubmit submit)
    {
        var userData = new
        {
            score = m_score
        };

        string userDatajson = JsonConvert.SerializeObject(userData);

        string url = StaticDataBank.LeaderBoard_Submit + StaticDataBank.playerlocalid;

        UnityWebRequest request = new UnityWebRequest(url, "POST");

        byte[] bodyRaw = Encoding.UTF8.GetBytes(userDatajson);

        request.uploadHandler = new UploadHandlerRaw(bodyRaw);

        request.downloadHandler = new DownloadHandlerBuffer();

        request.SetRequestHeader("Content-Type", "application/json");

        request.SetRequestHeader("Authorization", "Bearer " + StaticDataBank.jwttoken);

        yield return request.SendWebRequest();
        
        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            submit(false, "Failed to submit score");
            Debug.LogError(request.error);
        }
        else
        {
            string jsonResponse = request.downloadHandler.text;
            Debug.Log(jsonResponse);
            submit(true, "Successfully to submit score");
        }
    }
    public void Leadboard_GetAll(LeaderBoardData data)
    {
        StartCoroutine(Leadboard_Get(data));
    }
    private IEnumerator Leadboard_Get(LeaderBoardData data)
    {
        using (UnityWebRequest www = UnityWebRequest.Get(StaticDataBank.Get_LeaderBoard + StaticDataBank.playerlocalid))
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
    public void Leadboard_GetRelativeScore(LeaderBoardData data)
    {
        StartCoroutine(Leadboard_GetRelative(data));
    }
    private IEnumerator Leadboard_GetRelative(LeaderBoardData data)
    {
        using (UnityWebRequest www = UnityWebRequest.Get(StaticDataBank.Get_LeaderBoard_Relative + StaticDataBank.playerlocalid))
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
                Debug.Log(www.error);
                Call(false, null);
            }
            else
            {
                string jsonResponse = www.downloadHandler.text;
                //Debug.Log(jsonResponse);
                GameShop gameShop = JsonUtility.FromJson<GameShop>(jsonResponse);
                Call(true, gameShop);
            }
        }
    }

    #endregion

    #region Inventory
    public void GetInvectory(GetInventory getInventory, int _pageNumber, string _collectionID = "", string _fetchType = "UniqueAsset")
    {
        var userData = new
        {
            pageNumber = _pageNumber,
            types = _fetchType,
            forSale = false,
            collectionId = _collectionID
        };

        StartCoroutine(Get_Inventory(getInventory, userData));
    }
    public void Getcurrency(GetInventory getInventory, int _pageNumber = 1, string _fetchType = "Currency")
    {
        var userData = new
        {
            pageNumber = _pageNumber,
            types = _fetchType,
        };
        StartCoroutine(Get_Inventory(getInventory, userData));
    }
    private IEnumerator Get_Inventory(GetInventory getInventory,object userData)
    {

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
            getInventory(false, null);
            Debug.Log(request.error);
        }
        else
        {
            string jsonResponse = request.downloadHandler.text;
            //Debug.Log(jsonResponse);
            InventoryData.Root inventoryData = JsonConvert.DeserializeObject<InventoryData.Root>(jsonResponse);
            //Debug.Log(inventory.data[0].item.name);
            getInventory(true, inventoryData);
        }
    }

    #endregion

    #region Minting API

    public void MintNft(string mintId, MintingNft ismint)
    {
        StartCoroutine(Mint_Nft(mintId, ismint));
    }
    private IEnumerator Mint_Nft(string mintId, MintingNft ismint)
    {
        var userData = new
        {
            itemId = mintId
        };

        string userDatajson = JsonConvert.SerializeObject(userData);

        string url = StaticDataBank.Mint + StaticDataBank.playerlocalid;

        UnityWebRequest request = new UnityWebRequest(url, "POST");

        byte[] bodyRaw = Encoding.UTF8.GetBytes(userDatajson);

        request.uploadHandler = new UploadHandlerRaw(bodyRaw);

        request.downloadHandler = new DownloadHandlerBuffer();

        request.SetRequestHeader("Content-Type", "application/json");

        request.SetRequestHeader("Authorization", "Bearer " + StaticDataBank.jwttoken);

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            ismint?.Invoke(false, request.error);
            Debug.Log(request.error);
        }
        else
        {
            string jsonResponse = request.downloadHandler.text;
            Debug.Log(jsonResponse);
            ismint?.Invoke(true, jsonResponse);
        }
    }
    #endregion

    #region WithdrawFunds
    public void WithdrawFunds(Action<bool,string> callback)
    {
        StartCoroutine(Withdraw_Funds(callback));
    }
    private IEnumerator Withdraw_Funds(Action<bool,string> callback)
    {
        string url = StaticDataBank.Withdraw + StaticDataBank.playerlocalid;

        UnityWebRequest request = new UnityWebRequest(url, "POST");
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");
        request.SetRequestHeader("Authorization", "Bearer " + StaticDataBank.jwttoken);

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            callback?.Invoke(false, request.error);
            Debug.Log(request.error);
        }
        else
        {
            string jsonResponse = request.downloadHandler.text;
            Debug.Log(jsonResponse);
            JObject jsonObject = JObject.Parse(jsonResponse);

            // Extract the checkoutUrl value
            string checkoutUrl = jsonObject["data"]["url"]?.ToString();
            Debug.Log(checkoutUrl);
            callback?.Invoke(true, checkoutUrl);
        }
    }

    #endregion

    #region BuyingThings

    public void BuyNft(string mintId,bool isSol, MintingNft ismint)
    {
        StartCoroutine(Buy_Nft(mintId,isSol, ismint));
    }
    private IEnumerator Buy_Nft(string mintId, bool isSol, MintingNft ismint)
    {
        var userData = new
        {
            itemId = mintId,
            currencyId = isSol?"SOL":"USDC"
        };

        string userDatajson = JsonConvert.SerializeObject(userData);

        string url = StaticDataBank.Buy + StaticDataBank.playerlocalid;

        UnityWebRequest request = new UnityWebRequest(url, "POST");

        byte[] bodyRaw = Encoding.UTF8.GetBytes(userDatajson);

        request.uploadHandler = new UploadHandlerRaw(bodyRaw);

        request.downloadHandler = new DownloadHandlerBuffer();

        request.SetRequestHeader("Content-Type", "application/json");

        request.SetRequestHeader("Authorization", "Bearer " + StaticDataBank.jwttoken);

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            ismint?.Invoke(false, request.error);
            Debug.Log(request.error);
        }
        else
        {
            string jsonResponse = request.downloadHandler.text;
            Debug.Log(jsonResponse);
            JObject jsonObject = JObject.Parse(jsonResponse);

            // Extract the checkoutUrl value
            string checkoutUrl = jsonObject["checkoutUrl"]?.ToString();
            Debug.Log(checkoutUrl);
            ismint?.Invoke(true, checkoutUrl);
        }
    }
    #endregion

    #region TokenPushing
    public void PushTokens(int NumberOfTokens, TokenPushingDelg TokenPushingResponseFunction)
    {
        StartCoroutine(PushTokensRoutine(NumberOfTokens, TokenPushingResponseFunction));
    }
    private IEnumerator PushTokensRoutine(int _NumberOfTokens, TokenPushingDelg TokenPushingResponseFunction)
    {
        var userData = new
        {
            quantity = _NumberOfTokens
        };
        string userDatajson = JsonConvert.SerializeObject(userData);
        string url = StaticDataBank.TokensPushingLink + StaticDataBank.playerlocalid;
        UnityWebRequest request = new UnityWebRequest(url, "POST");
        byte[] bodyRaw = Encoding.UTF8.GetBytes(userDatajson);
        request.uploadHandler = new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");
        request.SetRequestHeader("Authorization", "Bearer " + StaticDataBank.jwttoken);
        Debug.Log("Link for tokens pushing is " + url);
        yield return request.SendWebRequest();
        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            TokenPushingResponseFunction(false, request.error);
            Debug.Log(request.error);
        }
        else
        {
            string jsonResponse = request.downloadHandler.text;
            Debug.Log(jsonResponse);
            TokenPushingResponseFunction(true, jsonResponse);
        }
    }
    #endregion

    #region InventoryUpdate
    public void UpdateInventoryItem(string ItemID, string AssetID, int UsesLeftValue, InventoryUpdateDelg InventoryUpdateResponseFunction)
    {
        StartCoroutine(UpdateInventoryItemRoutine(ItemID, AssetID, UsesLeftValue, InventoryUpdateResponseFunction));
    }
    private IEnumerator UpdateInventoryItemRoutine(string _ItemID, string _AssetID, int _UsesLeftValue, InventoryUpdateDelg _InventoryUpdateResponseFunction)
    {
        var userData = new
        {
            itemId = _ItemID,
            assetId = _AssetID,
            usesLeft = _UsesLeftValue
        };
        string userDatajson = JsonConvert.SerializeObject(userData);
        Debug.Log(userDatajson);
        string url = StaticDataBank.InventoryUpdateLink + StaticDataBank.playerlocalid;
        UnityWebRequest request = new UnityWebRequest(url, "POST");
        byte[] bodyRaw = Encoding.UTF8.GetBytes(userDatajson);
        request.uploadHandler = new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");
        request.SetRequestHeader("Authorization", "Bearer " + StaticDataBank.jwttoken);
        Debug.Log("Link for inventory update is " + url);
        yield return request.SendWebRequest();
        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            _InventoryUpdateResponseFunction(false, request.error);
            Debug.Log(request.error);
        }
        else
        {
            string jsonResponse = request.downloadHandler.text;
            Debug.Log(jsonResponse);
            _InventoryUpdateResponseFunction(true, jsonResponse);
        }
    }
    #endregion


    #region Get MarketPlace

    public void GetMarketPlace(string collectionID, int pageNumber, GetMarketPlaceCall _Marketlacecall)
    {
        StartCoroutine(Get_MarketPlace(collectionID, pageNumber, _Marketlacecall));
    }
    private IEnumerator Get_MarketPlace(string _collectionID, int page_Number, GetMarketPlaceCall _marketplacecall)
    {
        var userData = new
        {
            pageNumber = page_Number,
            types = "UniqueAsset,Currency",
            collectionId = _collectionID
        };
        string userDatajson = JsonConvert.SerializeObject(userData);
        string url = StaticDataBank.GetMarketPlace + StaticDataBank.playerlocalid;
        UnityWebRequest request = new UnityWebRequest(url, "POST");
        byte[] bodyRaw = Encoding.UTF8.GetBytes(userDatajson);
        request.uploadHandler = new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");
        request.SetRequestHeader("Authorization", "Bearer " + StaticDataBank.jwttoken);

        yield return request.SendWebRequest();
        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            _marketplacecall(false, null);
            Debug.Log(request.error);
        }
        else
        {
            string jsonResponse = request.downloadHandler.text;
            Debug.Log(jsonResponse);
            MarketPlace.Root data = JsonConvert.DeserializeObject<MarketPlace.Root>(jsonResponse);
            _marketplacecall(true, data);
        }
    }

    #endregion


    #region ListOnSale
    public void ListOnSale(string boosterId, float amount, ListOnSaleCal Sale)
    {
        StartCoroutine(List_On_Sale(boosterId, amount, Sale));
    }
    private IEnumerator List_On_Sale(string _boosterId, float _amount, ListOnSaleCal _Sale)
    {
        var userData = new
        {
            assetId = _boosterId,
            amount = _amount
        };

        string userDatajson = JsonConvert.SerializeObject(userData);

        string url = StaticDataBank.listForSale + StaticDataBank.playerlocalid;

        UnityWebRequest request = new UnityWebRequest(url, "POST");

        byte[] bodyRaw = Encoding.UTF8.GetBytes(userDatajson);

        request.uploadHandler = new UploadHandlerRaw(bodyRaw);

        request.downloadHandler = new DownloadHandlerBuffer();

        request.SetRequestHeader("Content-Type", "application/json");

        request.SetRequestHeader("Authorization", "Bearer " + StaticDataBank.jwttoken);

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            _Sale?.Invoke(false, request.error);
            Debug.Log(request.error);
        }
        else
        {
            string jsonResponse = request.downloadHandler.text;
            Debug.Log(jsonResponse);
            JObject jsonObject = JObject.Parse(jsonResponse);

            // Extract the checkoutUrl value
            string checkoutUrl = jsonObject["data"]["consentUrl"]?.ToString();
            Debug.Log(checkoutUrl);
            _Sale?.Invoke(true, checkoutUrl);
        }
    }
    public void UnListOnSale(string assetId, ListOnSaleCal Sale)
    {
        StartCoroutine(UnList_On_Sale(assetId, Sale));
    }
    private IEnumerator UnList_On_Sale(string _assetId, ListOnSaleCal _Sale)
    {
        var userData = new
        {
            assetId = _assetId,
        };

        string userDatajson = JsonConvert.SerializeObject(userData);

        string url = StaticDataBank.UnlistForSale + StaticDataBank.playerlocalid;

        UnityWebRequest request = new UnityWebRequest(url, "POST");

        byte[] bodyRaw = Encoding.UTF8.GetBytes(userDatajson);

        request.uploadHandler = new UploadHandlerRaw(bodyRaw);

        request.downloadHandler = new DownloadHandlerBuffer();

        request.SetRequestHeader("Content-Type", "application/json");

        request.SetRequestHeader("Authorization", "Bearer " + StaticDataBank.jwttoken);

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            _Sale?.Invoke(false, request.error);
            Debug.Log(request.error);
        }
        else
        {
            string jsonResponse = request.downloadHandler.text;
            Debug.Log(jsonResponse);
            JObject jsonObject = JObject.Parse(jsonResponse);

            // Extract the checkoutUrl value
            string checkoutUrl = jsonObject["data"]["consentUrl"]?.ToString();
            Debug.Log(checkoutUrl);
            _Sale?.Invoke(true, checkoutUrl);
        }
    }
    #endregion

    #region BuyFromMarketPlace

    public void BuyFromMarket(string assetId, ListOnSaleCal Sale)
    {
        StartCoroutine(Buy_From_Market(assetId, Sale));
    }
    private IEnumerator Buy_From_Market(string _assetId, ListOnSaleCal _Sale)
    {
        var userData = new
        {
            assetId = _assetId,
        };

        string userDatajson = JsonConvert.SerializeObject(userData);

        string url = StaticDataBank.BuyItemFromMarketplace + StaticDataBank.playerlocalid;

        UnityWebRequest request = new UnityWebRequest(url, "POST");

        byte[] bodyRaw = Encoding.UTF8.GetBytes(userDatajson);

        request.uploadHandler = new UploadHandlerRaw(bodyRaw);

        request.downloadHandler = new DownloadHandlerBuffer();

        request.SetRequestHeader("Content-Type", "application/json");

        request.SetRequestHeader("Authorization", "Bearer " + StaticDataBank.jwttoken);

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            _Sale?.Invoke(false, request.error);
            Debug.Log(request.error);
        }
        else
        {
            string jsonResponse = request.downloadHandler.text;
            Debug.Log(jsonResponse);
            JObject jsonObject = JObject.Parse(jsonResponse);

            // Extract the checkoutUrl value
            string checkoutUrl = jsonObject["data"]["consentUrl"]?.ToString();
            Debug.Log(checkoutUrl);
            _Sale?.Invoke(true, checkoutUrl);
        }
    }


    #endregion



    #region Generic API Caller
    //you can add more two or more prams for callback to make more generic like this
    //public delegate void ApiCallback<T1, T2>(bool success, T1 responseData, T2 additionalData);
    public delegate void ApiCallback<T>(bool success, T response);

    public IEnumerator CallApi<T>(string endpoint, string httpMethod, object requestData, ApiCallback<T> callback)
    {
        string jsonData = JsonConvert.SerializeObject(requestData);

        string url = endpoint + StaticDataBank.playerlocalid;

        UnityWebRequest request = new UnityWebRequest(url, httpMethod);

        byte[] bodyRaw = Encoding.UTF8.GetBytes(jsonData);

        request.uploadHandler = new UploadHandlerRaw(bodyRaw);

        request.downloadHandler = new DownloadHandlerBuffer();

        request.SetRequestHeader("Content-Type", "application/json");

        request.SetRequestHeader("Authorization", "Bearer " + StaticDataBank.jwttoken);

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
        {
            callback(false, default(T));
            Debug.LogError(request.error);
        }
        else
        {
            string jsonResponse = request.downloadHandler.text;
            Debug.Log(jsonResponse);
            T responseData = JsonConvert.DeserializeObject<T>(jsonResponse);

            callback(true, responseData);
        }
    }

    #endregion
}