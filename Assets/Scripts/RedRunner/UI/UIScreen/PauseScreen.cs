﻿using UnityEngine;
using UnityEngine.UI;

namespace RedRunner.UI
{
    public class PauseScreen : UIScreen
    {
        [SerializeField]
        protected Button ResumeButton = null;
        [SerializeField]
        protected Button HomeButton = null;
        [SerializeField]
        protected Button SoundButton = null;
        [SerializeField]
        protected Button ExitButton = null;

        private void Start()
        {
            ResumeButton.SetButtonAction(() =>
            {
                var inGameScreen = GameTemplateUIManager.Singleton.UISCREENS.Find(el => el.ScreenInfo == UIScreenInfo.IN_GAME_SCREEN);
                GameTemplateUIManager.Singleton.OpenScreen(inGameScreen);
                GameManager.Singleton.StartGame();
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
