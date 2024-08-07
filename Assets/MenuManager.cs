using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.Experimental.XR.Interaction;

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
    }

    void PopulateProfileDetails()
    {
        PlayerName_Placeholder.text = StaticDataBank.UserName.ToString();
        WalletID_Placeholder.text = StaticDataBank.walletAddress.ToString();
    }

    public void CopyWalletAdress()
    {
#if UNITY_WEBGL
        CopyText();
#else
            GUIUtility.systemCopyBuffer = WalletAddress.text;
            Debug.Log("Copy wallet Address");
#endif
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
