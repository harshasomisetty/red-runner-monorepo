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

    
    public void UserLogInFirebase()
    {
        if (StaticDataBank.CheckInputField(email.text) && StaticDataBank.CheckInputField(Password.text) &&
            email.text.Contains(".", System.StringComparison.OrdinalIgnoreCase) &&
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
            email.text.Contains(".com", System.StringComparison.OrdinalIgnoreCase) &&
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
        QRCodePanel.SetActive(true);
    }

    public void QRPopupClose()
    {
        QRCodePanel.SetActive(false);
    }
}
