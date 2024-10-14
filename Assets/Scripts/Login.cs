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
    public Toggle AcceptConditions;
    public TextMeshProUGUI SignUpSuccessButtonText;
    public Texture2D m_CursorDefaultTexture;

    private void Awake()
    {
        OkButton.SetButtonAction(() =>
        {
            TogglePopUpPanel(false, "");
        });
        Cursor.SetCursor(m_CursorDefaultTexture, Vector2.zero, CursorMode.Auto);
    }

    private void Start()
    {
        SocketController.Instance.AddListener(this);
        QRSocketController.Instance.OnQRCodeReceived += SetQRCodeImage;
        QRSocketController.Instance.OnQRLoginCompleted += HandleQRCodeLoginComplete;
    }


    public void UserLogInFirebase()
    {
        //if (!AcceptConditions.isOn)
        //{
        //    GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Please Accept All Terms", 1);
        //    return;
        //}
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
            TogglePopUpPanel(true, "Email or password is incorrect");
            Debug.Log("email or password is incorrect");
        }
    }
    public void UserSignUpFirebase()
    {
        if (!AcceptConditions.isOn)
        {
            GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Please accept all the terms and conditions", 1);
            return;
        }
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
        if (!AcceptConditions.isOn)
        {
            GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Please accept all the terms and conditions", 1);
            return;
        }
        ToggleDataLoadingWindow(true);
        API_Manager.Instance.SignInWithGoogle(OnSignInCompleted);
    }
    void OnSignUpCompleted(bool success, string message)
    {
        ToggleDataLoadingWindow(false);
        if (success)
        {
            Debug.Log("Sign-Up Successfull: " + message);
            TogglePopUpPanel(true, "Your account has been created. Click 'PLAY' to login");
            SwitchOkSignUpButtonToLogin();
        }
        else
        {
            TogglePopUpPanel(true, "Sign up failed: " + message);
        }
    }
    void OnSignInCompleted(bool success, string message)
    {
        ToggleDataLoadingWindow(false);
        if (success)
        {
            SocketController.Instance.ConnectSocketWithUserId(StaticDataBank.playerlocalid);

            Debug.Log("Sign in success: " + message);
            Loader.Instance.LoadScene(Loader.SceneToLoad.Menu);
        }
        else
        {
            TogglePopUpPanel(true, "Login failed: " + message);
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
            GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Logging in...");
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
        GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Generating QR");
        QRSocketController.Instance.InitiateQRCodeLogin();
        QRCodePanel.SetActive(true);
    }
    
    private void SetQRCodeImage(string qrCodeDataUrl)
    {
        if (QRCodeImage == null)
        {
            Debug.Log("QRCodeImage is not assigned in the Login script.");
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
        GlobalCanvasManager.Instance.LoadingPanel.HidePopup();
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
            GlobalCanvasManager.Instance.LoadingPanel.HidePopup();
            OnSignInCompleted(true, "Login success");
        }
        catch (Exception e)
        {
            Debug.Log("Error parsing QR login payload: " + e.Message);
            GlobalCanvasManager.Instance.LoadingPanel.HidePopup();
            OnSignInCompleted(false, "Login failed: Error processing login data");
        }
    }

    public void OnSocketMessageReceived(SocketEventsType messageHeader, string payload)
    {
        Debug.Log("on socket message received: " + messageHeader + " with payload: " + payload);
        switch (messageHeader)
        {
            case SocketEventsType.qrScanned:
                Debug.Log("QR Code scanned");
                GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Log in with QR");
                break;
            // Handle other non-QR related events here
            default:
                Debug.LogWarning("Unhandled socket event: " + messageHeader);
                break;
        }
    }

    public void QRPopupClose()
    {
        GlobalCanvasManager.Instance.LoadingPanel.HidePopup();
        QRCodePanel.SetActive(false);
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
