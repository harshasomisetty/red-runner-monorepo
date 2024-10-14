using RedRunner.UI;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using Newtonsoft.Json.Linq;
using System;
using Newtonsoft.Json;

public class Login : MonoBehaviour, SocketEventListener
{
    [Header("UI Items")]

    public TMP_InputField email;
    public TMP_InputField Password;
    public GameObject PopUpScreen;
    public GameObject QRCodePanel;
    public Image QRCodeImage;
    public TextMeshProUGUI PopUpMessage;
    public GameObject LoginPanel;
    public UIButton OkButton;
    public TextMeshProUGUI SignUpSuccessButtonText;


    private void Awake()
    {
        OkButton.SetButtonAction(() =>
        {
            TogglePopUpPanel(false, "");
        });
    }

    private void Start()
    {
        SocketController.Instance.AddListener(this);
        QRSocketController.Instance.OnQRCodeReceived += SetQRCodeImage;
        QRSocketController.Instance.OnQRLoginCompleted += HandleQRCodeLoginComplete;
    }


    public void UserLogInFirebase()
    {
        if (StaticDataBank.CheckInputField(email.text) && StaticDataBank.CheckInputField(Password.text) &&
            email.text.Contains(".", System.StringComparison.OrdinalIgnoreCase) &&
            email.text.Contains("@", System.StringComparison.OrdinalIgnoreCase) &&
            Password.text.Length >= 6 && email.text.Length >= 6)
        {
            ToggleDataLoadingWindow(true);
            API_Manager.Instance.SignInUserWithFirebase(email.text, Password.text, OnSignInCompleted);
        }
        else
        {
            TogglePopUpPanel(true, "email or password is incorrect");
            Debug.Log("email or password is incorrect");
        }
    }
    public void UserSignUpFirebase()
    {
        if (StaticDataBank.CheckInputField(email.text) && StaticDataBank.CheckInputField(Password.text) &&
            email.text.Contains(".", System.StringComparison.OrdinalIgnoreCase) &&
            email.text.Contains("@", System.StringComparison.OrdinalIgnoreCase) &&
            Password.text.Length >= 6 && email.text.Length >= 6)
        {
            ToggleDataLoadingWindow(true);
            API_Manager.Instance.SignUpUserWithFirebase(email.text, Password.text, OnSignUpCompleted);
        }
        else
        {
            TogglePopUpPanel(true, "Email or password is not correct");
        }
    }
    public void SignInWithGoogle()
    {
        ToggleDataLoadingWindow(true);
        API_Manager.Instance.SignInWithGoogle(OnSignInCompleted);
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
            SocketController.Instance.ConnectSocketWithUserId(StaticDataBank.playerlocalid);

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

    public void ToggleDataLoadingWindow(bool state)
    {
        LoginPanel.SetActive(!state);

        if (state)
            GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Logging In...");
        else
            GlobalCanvasManager.Instance.LoadingPanel.HidePopup();
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

    public void SalvayLink()
    {
        Utils.OpenURLInNewTab("https://salvay.io");
    }

    public void OnQRCodeLoginButtonClicked()
    {
        QRSocketController.Instance.InitiateQRCodeLogin();
        QRCodePanel.SetActive(true);
    }

    private void SetQRCodeImage(string qrCodeDataUrl)
    {
        if (QRCodeImage == null)
        {
            Debug.LogError("QRCodeImage is not assigned in the Login script.");
            return;
        }

        string base64Data = qrCodeDataUrl.Substring(qrCodeDataUrl.IndexOf(",") + 1);

        // Convert base64 to byte array
        byte[] imageData = Convert.FromBase64String(base64Data);

        // Create a new texture and load the image data
        Texture2D texture = new Texture2D(2, 2);
        texture.LoadImage(imageData);

        // Create a sprite from the texture
        Sprite sprite = Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), new Vector2(0.5f, 0.5f));

        // Set the sprite to the Image component
        QRCodeImage.sprite = sprite;
    }

    private void HandleQRCodeLoginComplete(string payload)
    {
        Debug.Log("Payload in the final handler: " + payload);
        try
        {
            JArray jsonArray = JArray.Parse(payload);
            if (jsonArray.Count < 2 || jsonArray[0].ToString() != "qrLoginCompleted")
            {
                throw new System.Exception("Invalid payload structure");
            }

            JObject data = (JObject)jsonArray[1]["payload"];

            // Extract user data
            JObject user = (JObject)data["user"];
            string walletId = user["walletId"]?.ToString();
            string username = user["name"]?.ToString();
            string userId = user["userId"]?.ToString();
            string email = user["email"]?.ToString();

            // Extract token data
            JObject tokens = (JObject)data["tokens"];
            string jwtToken = tokens["access"]["token"]?.ToString();

            // Assign data to StaticDataBank
            StaticDataBank.walletAddress = walletId;
            StaticDataBank.UserName = username;
            StaticDataBank.playerlocalid = userId;
            StaticDataBank.jwttoken = jwtToken;

            QRCodePanel.SetActive(false);
            OnSignInCompleted(true, "Login Success");
        }
        catch (System.Exception e)
        {
            Debug.LogError("Error parsing QR login payload: " + e.Message);
            OnSignInCompleted(false, "Login Failed: Error processing login data");
        }
    }

    public void OnSocketMessageReceived(SocketEventsType messageHeader, string payload)
    {
        Debug.Log("on socket message received: " + messageHeader + " with payload: " + payload);
        switch (messageHeader)
        {
            case SocketEventsType.qrScanned:
                Debug.Log("QR Code scanned");
                break;
            // Handle other non-QR related events here
            default:
                Debug.LogWarning("Unhandled socket event: " + messageHeader);
                break;
        }
    }

    public void RemoveListener()
    {
        SocketController.Instance.RemoveListener(this);
    }

    private void OnDestroy()
    {
        RemoveListener();
        QRSocketController.Instance.OnQRCodeReceived -= SetQRCodeImage;
        QRSocketController.Instance.OnQRLoginCompleted -= HandleQRCodeLoginComplete;
    }
}
