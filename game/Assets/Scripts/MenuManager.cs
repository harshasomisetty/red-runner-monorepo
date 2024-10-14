using TMPro;
using UnityEngine;
using DG.Tweening;


public class MenuManager : MonoBehaviour
{
    [Header("Help Window")]
    public GameObject HelpWindow;

    [Header("Profile Attributes Placeholders")]
    public TextMeshProUGUI PlayerName_Placeholder;
    public TextMeshProUGUI WalletID_Placeholder;
    public Texture2D m_CursorDefaultTexture;

    bool GameLaunched = false;
    private void Awake()
    {
        Cursor.SetCursor(m_CursorDefaultTexture, Vector2.zero, CursorMode.Auto);
        PopulateProfileDetails();
    }
    public void LaunchGame()
    {
        if (!GameLaunched)
        {
            GameLaunched = true;
            Loader.Instance.LoadScene(Loader.SceneToLoad.Game);
        }
    }

    public void ToggleHelpWindow(bool State)
    {
        HelpWindow.SetActive(State);
    }


    string InsertAsteriskInMiddle(string input)
    {
        int length = input.Length;

        int middle = length / 2;

        string firstHalf = input.Substring(0, (middle / 2));
        //string secondHalf = input.Substring(middle);

        return firstHalf + "****";
    }

    void PopulateProfileDetails()
    {
        PlayerName_Placeholder.text = StaticDataBank.UserName.ToString();
        string walletaddress = InsertAsteriskInMiddle(StaticDataBank.walletAddress.ToString());
        WalletID_Placeholder.text = walletaddress;
    }

    public void CopyWalletAdress()
    {
#if UNITY_WEBGL
        CopyText();
#else
            GUIUtility.systemCopyBuffer = ""+StaticDataBank.walletAddress;
            Debug.Log("Copy wallet Address");
#endif
        GlobalCanvasManager.Instance.SocketPrompter.ShowPopup("Wallet Address copied");
    }
    [System.Obsolete]
    public void CopyText()
    {
        Debug.Log("Calling to JS Method Googl");
        Application.ExternalEval($"copyToClipboard('{StaticDataBank.walletAddress}');");
    }
    public void ChangeSkin(int skinIndex)
    {
        //m_MainCharacter.Skeleton.ChangeCharacterSkin(skinIndex, CharacterSkins);
    }

    bool _withDrawOpen = false;
    public RectTransform WithDrawPanel;

    public void ToggleWithdrawPanel()
    {
        if(_withDrawOpen)
        {
            WithDrawPanel.DOScaleY(0f, 0.3f).OnComplete(delegate {
                _withDrawOpen = false;
            });
        }
        else
        {
            WithDrawPanel.DOScaleY(1f, 0.3f).OnComplete(delegate {
                _withDrawOpen = true;
            });
        }
    }
    public void WithDrawCurrency()
    {
        API_Manager.Instance.WithdrawFunds((isSuccess, response) =>
        {
            if (isSuccess)
            {
                Utils.OpenURLInNewTab(response);
            }
        });
    }
}
