
public static class StaticStrings 
{
    public static readonly string FireBase_Web_API_Key = "AIzaSyDd8TaOxZT_tit1Wh5GmBOzYZdoKMMZ6pI";
    public static readonly string clientId = "3228064304-bh62c6vvtcmqm8c2viecnondtrpn5nbq.apps.googleusercontent.com";
    public static readonly string clientSecret = "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";
    //public static readonly string clientId = "283391004653-4e9vpcvs2ftrnpuebag6gva9814mc3i3.apps.googleusercontent.com";
    //public static readonly string clientSecret = "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";



    public static readonly string signUpUrl = $"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={FireBase_Web_API_Key}";
    public static readonly string signInUrl = $"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FireBase_Web_API_Key}";
    public static readonly string tokenEndpoint = "https://oauth2.googleapis.com/token";

    public static readonly string firebaseEndpoint = $"https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key={FireBase_Web_API_Key}";

    //public static readonly string BackendBaseUrl = "http://192.168.68.134:3000/v1/";
    static readonly string BackendBaseUrl = "http://clv.services:3000/v1/";
    public static readonly string registerOrLogin = BackendBaseUrl + "auth/registerOrLogin";
    //public static readonly string Register = BackendBaseUrl + "auth/register";
    //public static readonly string LogIn = BackendBaseUrl + "auth/login";
    public static readonly string LeaderBoard_Submit = BackendBaseUrl + "leaderboard/addEntry";
    public static readonly string Get_LeaderBoard = BackendBaseUrl + "leaderboard/getLeaderboard";

    public static string playerlocalid = "";
    public static string UserName = "";
    public static string jwttoken = "";
    public static string walletAddress = "";
}
