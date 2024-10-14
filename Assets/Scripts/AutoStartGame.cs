using RedRunner;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AutoStartGame : MonoBehaviour
{
    float TimeToShowUI = 0.5f;
    public CanvasGroup[] UIGroups; 
    private void Start()
    {
        Invoke("DisableUITransperancy", TimeToShowUI);
        StartGame();
    }
    public void StartGame()
    {
        var uiManager = GameTemplateUIManager.Singleton;
        var InGameScreen = uiManager.UISCREENS.Find(el => el.ScreenInfo == UIScreenInfo.IN_GAME_SCREEN);
        if (InGameScreen != null)
        { 
            uiManager.OpenScreen(InGameScreen);
            GameManager.Singleton.StartGame();
        }
     }

    void DisableUITransperancy()
    {
        for (int i = 0; i < UIGroups.Length; i++)
        {
            UIGroups[i].alpha = 1f;
        }
    }
}
