using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

namespace RedRunner.UI
{
    public class EndScreen : UIScreen
    {
        [SerializeField]
        protected Button ResetButton = null;
        [SerializeField]
        protected Button HomeButton = null;
        [SerializeField]
        protected Button ExitButton = null;

        private void Start()
        {
            ResetButton.SetButtonAction(() =>
            {
                //SceneManager.LoadScene(SceneManager.GetActiveScene().name);
                GameManager.Singleton.Reset();
                var ingameScreen = GameTemplateUIManager.Singleton.GetUIScreen(UIScreenInfo.IN_GAME_SCREEN);
                GameTemplateUIManager.Singleton.OpenScreen(ingameScreen);
                GameManager.Singleton.StartGame();
                Loader.Instance.LoadScene(Loader.SceneToLoad.Menu);
            });
            HomeButton.SetButtonAction(() => 
            {
                //GameManager.Singleton.Reset();
                //GameManager.Singleton.Init();
                Time.timeScale = 1f;
                Loader.Instance.LoadScene(Loader.SceneToLoad.Menu);
            });
        }

        public override void UpdateScreenStatus(bool open)
        {
            base.UpdateScreenStatus(open);
        }
    }

}