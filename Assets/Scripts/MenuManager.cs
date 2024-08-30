using TMPro;
using UnityEngine;

public class MenuManager : MonoBehaviour
{
    [Header("Help Window")]
    public GameObject HelpWindow;

    [Header("Profile Attributes Placeholders")]
    public TextMeshProUGUI PlayerName_Placeholder;
    public TextMeshProUGUI WalletID_Placeholder;

    bool GameLaunched = false;
    private void Awake()
    {
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
        // TestWithdrawFunds();
    }

    private void TestWithdrawFunds()
    {
        API_Manager.Instance.WithdrawFunds((isSuccess,response) =>
        {
            if (isSuccess)
            {
                Utils.OpenURLInNewTab(response);   
            }
        });
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
}
