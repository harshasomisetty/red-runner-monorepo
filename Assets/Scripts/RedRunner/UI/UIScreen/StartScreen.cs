using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace RedRunner.UI
{
    public class StartScreen : UIScreen
    {
        [SerializeField]
        protected Button PlayButton = null;
        [SerializeField]
        protected Button HelpButton = null;

        private void Start()
        {
            //PlayButton.SetButtonAction(() =>
            //{
            //    var uiManager = UIManager.Singleton;
            //    var InGameScreen = uiManager.UISCREENS.Find(el => el.ScreenInfo == UIScreenInfo.IN_GAME_SCREEN);
            //    if (InGameScreen != null)
            //    {
            //        uiManager.OpenScreen(InGameScreen);
            //        GameManager.Singleton.StartGame();
            //    }
            //});

            //ExitButton.SetButtonAction(() =>
            //{
            //    GameManager.Singleton.ExitGame();
            //});
        }
        public override void UpdateScreenStatus(bool open)
        {
            base.UpdateScreenStatus(open);
        }
    }
}