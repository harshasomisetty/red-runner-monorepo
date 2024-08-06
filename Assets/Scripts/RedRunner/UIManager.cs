using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using RedRunner.UI;
using System.Linq;
using UnityEngine.UI;
using UnityEditor;
using TMPro;

namespace RedRunner
{
    public enum UIScreenInfo
    {
        LOADING_SCREEN,
        START_SCREEN,
        END_SCREEN,
        PAUSE_SCREEN,
        IN_GAME_SCREEN
    }

    public class UIManager : MonoBehaviour
    {

        private static UIManager m_Singleton;

        public static UIManager Singleton
        {
            get
            {
                return m_Singleton;
            }
        }

        [SerializeField]
        private List<UIScreen> m_Screens;
        private UIScreen m_ActiveScreen;
        private UIWindow m_ActiveWindow;
        [SerializeField]
        private Texture2D m_CursorDefaultTexture;
        [SerializeField]
        private Texture2D m_CursorClickTexture;
        [SerializeField]
        private float m_CursorHideDelay = 1f;

        [Header("UI Items")]
        public InputField email, Password;
        public GameObject LogInScreen;
        public TextMeshProUGUI PlayerID, WalletAddress;
        public GameObject[] ActiveGamePlay;
        public GameObject PopUpScreen;
        public Text FailedPopText;
        public GameObject LoginPanel;
        public Button OkButton;

        public List<UIScreen> UISCREENS
        {
            get
            {
                return m_Screens;
            }
        }

        public UIScreen GetUIScreen(UIScreenInfo screenInfo)
        {
            return m_Screens.Find(el => el.ScreenInfo == screenInfo);
        }

        void Awake()
        {
            if (m_Singleton != null)
            {
                Destroy(gameObject);
                return;
            }
            m_Singleton = this;

            Cursor.SetCursor(m_CursorDefaultTexture, Vector2.zero, CursorMode.Auto);

            OkButton.SetButtonAction(() =>
            {
                TogglePopUpPanel(false, "");
            });
        }

        void Start()
        {
            Init();
            CheckForReplayingCondition();
        }

        void CheckForReplayingCondition()
        {
            if (PlayerPrefs.GetInt("ReplayingGame",0) == 1)
            {
                OnSignInCompleted(true, "");
                PlayerPrefs.SetInt("ReplayingGame", 0);
            }
            else
            {

            }
            
        }

        public void Init()
        {
            var loadingScreen = GetUIScreen(UIScreenInfo.LOADING_SCREEN);
            OpenScreen(loadingScreen);
        }

        void Update()
        {
            if (Input.GetButtonDown("Cancel"))
            {
                //Added enumeration to store screen info, aka type, so it will be easier to understand it
                var pauseScreen = GetUIScreen(UIScreenInfo.PAUSE_SCREEN);
                var ingameScreen = GetUIScreen(UIScreenInfo.IN_GAME_SCREEN);

                //If the pause screen is not open : open it otherwise close it
                if (!pauseScreen.IsOpen)
                {
                    if(m_ActiveScreen == ingameScreen)
                    {
                        if (IsAsScreenOpen())
                            CloseAllScreens();

                        OpenScreen(pauseScreen);
                        GameManager.Singleton.StopGame();
                    }
                }
                else 
                {
                    if (m_ActiveScreen == pauseScreen)
                    {
                        CloseScreen(pauseScreen);
                        OpenScreen(ingameScreen);
                        ////We are sure that we want to resume the game when we close a screen
                        GameManager.Singleton.ResumeGame();
                    }
                }
            }

            if (Input.GetMouseButtonDown(0))
            {
                Cursor.SetCursor(m_CursorClickTexture, Vector2.zero, CursorMode.Auto);
            }
            else if (Input.GetMouseButtonUp(0))
            {
                Cursor.SetCursor(m_CursorDefaultTexture, Vector2.zero, CursorMode.Auto);
            }
        }

        public void OpenWindow(UIWindow window)
        {
            window.Open();
            m_ActiveWindow = window;
        }

        public void CloseWindow(UIWindow window)
        {
            if (m_ActiveWindow == window)
            {
                m_ActiveWindow = null;
            }
            window.Close();
        }

        public void CloseActiveWindow()
        {
            if (m_ActiveWindow != null)
            {
                CloseWindow(m_ActiveWindow);
            }
        }

        public void OpenScreen(UIScreen screen)
        {
            CloseAllScreens();
            screen.UpdateScreenStatus(true);
            m_ActiveScreen = screen;
        }

        public void CloseScreen(UIScreen screen)
        {
            if (m_ActiveScreen == screen)
            {
                m_ActiveScreen = null;
            }
            screen.UpdateScreenStatus(false);
        }

        public void CloseAllScreens()
        {
            foreach (var screen in m_Screens)
                CloseScreen(screen);
        }

        bool IsAsScreenOpen()
        {
            foreach (var screen in m_Screens)
            {
                if (screen.IsOpen)
                    return true;
            }

            return false;
        }
        bool CheckInputField(string checkstring)
        {
            if(!string.IsNullOrEmpty(checkstring) && !string.IsNullOrWhiteSpace(checkstring))
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
            if(CheckInputField (email.text)&& CheckInputField(Password.text)&&
                email.text.Contains(".com",System.StringComparison.OrdinalIgnoreCase)&&Password.text.Length>=6)
            {
                GoogleAndFirebaseAuth.instance.SignInUserWithFirebase(email.text, Password.text, OnSignInCompleted);
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
                email.text.Contains(".com", System.StringComparison.OrdinalIgnoreCase) && Password.text.Length >= 6)
            {
                GoogleAndFirebaseAuth.instance.SignUpUserWithFirebase(email.text, Password.text, OnSignUpCompleted);
            }
            else
            {
                TogglePopUpPanel(true, "email or password is incorrect");
                //Debug.Log("email or password is incorrect");
            }
        }
        public void SignInWithGoogle()
        {
            GoogleAndFirebaseAuth.instance.SignInWithGoogle(OnSignInCompleted);
        }
        void OnSignUpCompleted(bool success, string message)
        {
            if (success)
            {
                Debug.Log("Sign-up succeeded: " + message);
                TogglePopUpPanel(true, "Please Now Click On Sign In To Play Game");
            }
            else
            {
                email.text = "";
                Password.text = "";
                TogglePopUpPanel(true, "Sign Up Failed" + message);
                //Debug.LogError("Sign-up failed: " + message);
            }
        }
        void OnSignInCompleted(bool success, string message)
        {
            if (success)
            {
                Debug.Log("Sign In succeeded: " + message);
                LogInScreen.SetActive(false);
                PlayerID.text = "" + StaticStrings.UserName;
                WalletAddress.text = "" + StaticStrings.walletAddress;
                foreach(GameObject go in ActiveGamePlay)
                {
                    go.SetActive(true);
                }
            }
            else
            {
                email.text = "";
                Password.text = "";
                TogglePopUpPanel(true, "Sign In Failed : "+ message);
                //Debug.LogError("Sign In failed: " + message);
            }
        }

        public void TogglePopUpPanel(bool State, string message = "")
        {
            PopUpScreen.SetActive(State);
            LoginPanel.SetActive(!State);
            FailedPopText.text = message;
        }

        public void CopyWalletAdress()
        {
#if UNITY_WEBGL
            GoogleAndFirebaseAuth.instance.CopyText();
#else
            GUIUtility.systemCopyBuffer = WalletAddress.text;
            Debug.Log("Copy wallet Address");
#endif
        }
    }

}