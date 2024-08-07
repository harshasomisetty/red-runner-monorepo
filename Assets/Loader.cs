using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
public class Loader : MonoBehaviour
{
    [Header("Loader Visua Object")]
    public GameObject Loader_Visual; 

    string SplashSceneConstant = "Splash";
    string MenuSceneConstant = "Menu";
    string GameSceneConstant = "GamePlay";

    public static Loader Instance;
    public enum SceneToLoad
    {
        Splash, Menu, Game
    }
    public SceneToLoad _SceneToLoad;

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
        }
        else
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
    }

    public void LoadScene(SceneToLoad _SceneToLoad)
    {
        switch (_SceneToLoad)
        {
            case SceneToLoad.Splash:
                SceneManager.LoadScene(SplashSceneConstant);
                break;
            case SceneToLoad.Menu:
                SceneManager.LoadScene(MenuSceneConstant);
                break;
            case SceneToLoad.Game:
                SceneManager.LoadScene(GameSceneConstant);
                break;
        }
        Loader_Visual.SetActive(true);
    }

    public void LoadSceneSynchornized()
    {
        switch (_SceneToLoad)
        {
            case SceneToLoad.Splash:
                SceneManager.LoadSceneAsync(SplashSceneConstant);
                break;
            case SceneToLoad.Menu:
                SceneManager.LoadSceneAsync(MenuSceneConstant);
                break;
            case SceneToLoad.Game:
                SceneManager.LoadSceneAsync(GameSceneConstant);
                break;
        }
        Loader_Visual.SetActive(true);
    }


}
