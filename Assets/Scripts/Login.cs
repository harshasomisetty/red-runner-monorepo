using Newtonsoft.Json;
using RedRunner.UI;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class Login : MonoBehaviour
{
    [Header("UI Items")]

    public TMP_InputField email;
    public TMP_InputField Password;
    public GameObject PopUpScreen;
    public TextMeshProUGUI PopUpMessage;
    public GameObject LoginPanel;
    public Button OkButton;
    public GameObject ApiLoader;
    public TextMeshProUGUI SignUpSuccessButtonText;


    private void Awake()
    {
        OkButton.SetButtonAction(() =>
        {
            TogglePopUpPanel(false, "");
        });
    }

    bool CheckInputField(string checkstring)
    {
        if (!string.IsNullOrEmpty(checkstring) && !string.IsNullOrWhiteSpace(checkstring))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    public void UserLogInFirebase()
    {
        if (CheckInputField(email.text) && CheckInputField(Password.text) &&
            email.text.Contains(".com", System.StringComparison.OrdinalIgnoreCase) &&
            Password.text.Length >= 6 && email.text.Length >= 6)
        {
            ToggleDataLoadingWindow(true);
            API_Manager.instance.SignInUserWithFirebase(email.text, Password.text, OnSignInCompleted);
        }
        else
        {
            TogglePopUpPanel(true, "email or password is incorrect");
            Debug.Log("email or password is incorrect");
        }
    }
    public void UserSignUpFirebase()
    {
        if (CheckInputField(email.text) && CheckInputField(Password.text) &&
            email.text.Contains(".com", System.StringComparison.OrdinalIgnoreCase) &&
            Password.text.Length >= 6 && email.text.Length >= 6)
        {
            ToggleDataLoadingWindow(true);
            API_Manager.instance.SignUpUserWithFirebase(email.text, Password.text, OnSignUpCompleted);
        }
        else
        {
            TogglePopUpPanel(true, "Email or password is not correct");
        }
    }
    public void SignInWithGoogle()
    {
        ToggleDataLoadingWindow(true);
        API_Manager.instance.SignInWithGoogle(OnSignInCompleted);
    }
    void OnSignUpCompleted(bool success, string message)
    {
        ToggleDataLoadingWindow(false);
        if (success)
        {
            Debug.Log("Sign-Up Successfull: " + message);
            TogglePopUpPanel(true, "Your account has been created. Click 'PLAY' To Login");
            SwitchOkSignUpButtonToLogin();
        }
        else
        {
            TogglePopUpPanel(true, "Sign-Up Failed: " + message);
        }
    }
    void OnSignInCompleted(bool success, string message)
    {
        ToggleDataLoadingWindow(false);
        if (success)
        {
            Debug.Log("Sign In Success: " + message);
            Loader.Instance.LoadScene(Loader.SceneToLoad.Menu);
        }
        else
        {
            TogglePopUpPanel(true, "Login Failed: " + message);
        }
    }

    public void TogglePopUpPanel(bool State, string message = "")
    {
        PopUpScreen.SetActive(State);
        LoginPanel.SetActive(!State);
        PopUpMessage.text = message;
    }

    public void ToggleDataLoadingWindow(bool State)
    {
        LoginPanel.SetActive(!State);
        ApiLoader.SetActive(State);
    }

    void SwitchOkSignUpButtonToLogin()
    {
        SignUpSuccessButtonText.text = "PLAY!";
        OkButton.SetButtonAction(() =>
        {
            PopUpScreen.SetActive(false);
            UserLogInFirebase(); 
        });
    }


    public TextAsset jsonFile;
    public GameShopData.GameShopData.GameShopAssets mynewshop;
    [ContextMenu("makedata")]
    public void makedata()
    {
        string json = @"{
          ""GameShopAssets"": {
            ""SpeedBoosters"": [
              {
                ""Attributes"": [
                  {
                    ""TraitType"": ""Speed"",
                    ""Value"": ""Fast""
                  },
                  {
                    ""TraitType"": ""Duration"",
                    ""Value"": ""30s""
                  }
                ],
                ""CollectionId"": ""sb001"",
                ""Description"": ""Increases speed for 30 seconds"",
                ""ImageUrl"": ""http://example.com/speed_booster.png"",
                ""Name"": ""Speed Booster"",
                ""BoosterType"": ""Temporary"",
                ""BoosterMultiplier"": 2,
                ""Price"": [
                  {
                    ""CurrencyId"": ""USD"",
                    ""price"": ""1.99""
                  }
                ]
              }
            ],
            ""DoubleJumpBoosters"": [
              {
                ""Attributes"": [
                  {
                    ""TraitType"": ""Jump"",
                    ""Value"": ""Double""
                  }
                ],
                ""CollectionId"": ""dj001"",
                ""Description"": ""Allows double jump for 1 minute"",
                ""ImageUrl"": ""http://example.com/double_jump.png"",
                ""Name"": ""Double Jump Booster"",
                ""BoosterType"": ""Temporary"",
                ""BoosterMultiplier"": 1,
                ""Price"": [
                  {
                    ""CurrencyId"": ""USD"",
                    ""price"": ""2.99""
                  }
                ]
              }
            ],
            ""Skins"": [
              {
                ""Attributes"": [
                  {
                    ""TraitType"": ""Color"",
                    ""Value"": ""Red""
                  }
                ],
                ""CollectionId"": ""sk001"",
                ""Description"": ""A vibrant red skin"",
                ""ImageUrl"": ""http://example.com/red_skin.png"",
                ""Name"": ""Red Skin"",
                ""SkinType"": ""Color"",
                ""Price"": [
                  {
                    ""CurrencyId"": ""USD"",
                    ""price"": ""0.99""
                  }
                ]
              }
            ]
          }
        }";
        string jsonstr = jsonFile.text;
        Debug.Log("Json data : " + jsonstr);
        string userDatajson = JsonConvert.SerializeObject(mynewshop);
        Debug.Log(" my Json data : " + userDatajson);
        mynewshop = JsonConvert.DeserializeObject<GameShopData.GameShopData.GameShopAssets>(jsonstr);
        Debug.Log("Get New Shop Data");
        Debug.Log(mynewshop.SpeedBoosters[0].Name);
        Debug.Log(mynewshop.SpeedBoosters[0].Description);
    }
}
