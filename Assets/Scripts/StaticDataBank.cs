
using System.Text.RegularExpressions;

public static class StaticDataBank 
{
    #region BackEnd Keys
    public static readonly string FireBase_Web_API_Key = "AIzaSyDd8TaOxZT_tit1Wh5GmBOzYZdoKMMZ6pI";
    public static readonly string clientId = "3228064304-bh62c6vvtcmqm8c2viecnondtrpn5nbq.apps.googleusercontent.com";
    public static readonly string clientSecret = "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";
    //public static readonly string clientId = "283391004653-4e9vpcvs2ftrnpuebag6gva9814mc3i3.apps.googleusercontent.com";
    //public static readonly string clientSecret = "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";

    #endregion


    #region Firebase Api's
    public static readonly string signUpUrl = $"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={FireBase_Web_API_Key}";
    public static readonly string signInUrl = $"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FireBase_Web_API_Key}";
    public static readonly string firebaseEndpoint = $"https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key={FireBase_Web_API_Key}";
    #endregion

    #region Google Api's
    public static readonly string tokenEndpoint = "https://oauth2.googleapis.com/token";
    #endregion

    #region Backend Api's
    //public static readonly string BackendBaseUrl = "http://192.168.68.134:3000/v1/";
    //static readonly string BackendBaseUrl = "http://clv.services:3000/v1/";
    static readonly string BackendBaseUrl = "https://gameshift.clvtechnologies.com/v1/";
    public static readonly string registerOrLogin = BackendBaseUrl + "auth/registerOrLogin";
    //public static readonly string Register = BackendBaseUrl + "auth/register";
    //public static readonly string LogIn = BackendBaseUrl + "auth/login";
    public static readonly string LeaderBoard_Submit = BackendBaseUrl + "leaderboard/addEntry?userId=";
    public static readonly string Get_LeaderBoard = BackendBaseUrl + "leaderboard/getLeaderboard?userId=";
    public static readonly string Get_ShopData = BackendBaseUrl + "shop/getShopData?userId=";
    public static readonly string Get_Inventory = BackendBaseUrl + "gs/getInventory?userId=";
    public static readonly string Mint = BackendBaseUrl + "gs/mintAsset?userId=";
    public static readonly string TokensPushingLink = BackendBaseUrl + "gs/claimCoins?userId=";
    public static readonly string InventoryUpdateLink = BackendBaseUrl + "gs/updateNft?userId=";
    #endregion

    #region Static Profile Data

    public static string playerlocalid = "";
    public static string UserName = "";
    public static string jwttoken = "";
    public static string walletAddress = "";

    #endregion



    public static string RemoveWordFromString(string m_string)
    {
        //string originalString = _name;
        //string wordToRemove = word;
        //string modifiedString = originalString.Replace(wordToRemove, "").Trim();
        //return modifiedString;
        string[] namesToRemove = new string[] { "Skin", "Speed Boosters", "Double Jumps" };

        foreach (string _name in namesToRemove)
        {
            m_string = Regex.Replace(m_string, @"\b" + Regex.Escape(_name) + @"\b", "", RegexOptions.IgnoreCase).Trim();
        }

        return m_string;
    }
}
