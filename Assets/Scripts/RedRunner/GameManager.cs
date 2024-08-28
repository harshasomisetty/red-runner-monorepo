using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

using BayatGames.SaveGameFree;
using BayatGames.SaveGameFree.Serializers;

using RedRunner.Characters;
using RedRunner.TerrainGeneration;
using RedRunner.Utilities;
using TMPro;
using System.Text.RegularExpressions;
using RedRunner.UI;

namespace RedRunner
{
    public sealed class GameManager : MonoBehaviour
    {
        private const float ScoreForSkinUnlock = 20;
        private const string PrefsKeySkinUnlock = "SkinUnlock";
        public delegate void AudioEnabledHandler(bool active);

        public delegate void ScoreHandler(float newScore, float highScore, float lastScore);

        public delegate void ResetHandler();

        public static event ResetHandler OnReset;
        public static event ScoreHandler OnScoreChanged;
        public static event AudioEnabledHandler OnAudioEnabled;

        private static GameManager m_Singleton;

        public static GameManager Singleton
        {
            get
            {
                return m_Singleton;
            }
        }
        private int CoinsCollectedForPushing = 0;
        [SerializeField]
        private Character m_MainCharacter;
        [SerializeField]
        [TextArea(3, 30)]
        private string m_ShareText;
        [SerializeField]
        private string m_ShareUrl;
        private float m_StartScoreX = 0f;
        private float m_HighScore = 0f;
        private float m_LastScore = 0f;
        private float m_Score = 0f;

        private bool m_GameStarted = false;
        private bool m_GameRunning = false;
        private bool m_AudioEnabled = true;

        public CharacterSkins CharacterSkins;
        /// <summary>
        /// This is my developed callbacks compoents, because callbacks are so dangerous to use we need something that automate the sub/unsub to functions
        /// with this in-house developed callbacks feature, we garantee that the callback will be removed when we don't need it.
        /// </summary>
        public Property<int> m_Coin = new Property<int>(0);

        //Jump Boosters//
        [Header("Jump Booster")]
        public int NumberOfJumpBoosters = 0;
        public bool IsJumpBoosterActive = false;
        public UIButton JumpBoosterButton;
        public TextMeshProUGUI JumpBoosterCountText;
        int JumpBoostersStartValue = 0;
        bool FoundJumpBoosters = false;
        [Header("Speed Booster")]
        public int NumberOfSpeedBoosters = 0;
        public bool IsSpeedBoosterActive = false;
        public UIButton SpeedBoosterButton;
        public TextMeshProUGUI SpeedBoosterCountText;
        int SpeedBoostersStartValue = 0;
        bool FoundSpeedBoosters = false;



        #region Getters
        public bool gameStarted
        {
            get
            {
                return m_GameStarted;
            }
        }

        public bool gameRunning
        {
            get
            {
                return m_GameRunning;
            }
        }

        public bool audioEnabled
        {
            get
            {
                return m_AudioEnabled;
            }
        }
        #endregion

        void Awake()
        {
            if (m_Singleton != null)
            {
                Destroy(gameObject);
                return;
            }
            SaveGame.Serializer = new SaveGameBinarySerializer();
            m_Singleton = this;
            m_Score = 0f;

            if (SaveGame.Exists("coin"))
            {
                m_Coin.Value = SaveGame.Load<int>("coin");
            }
            else
            {
                m_Coin.Value = 0;
            }
            if (SaveGame.Exists("audioEnabled"))
            {
                SetAudioEnabled(SaveGame.Load<bool>("audioEnabled"));
            }
            else
            {
                SetAudioEnabled(true);
            }
            if (SaveGame.Exists("lastScore"))
            {
                m_LastScore = SaveGame.Load<float>("lastScore");
            }
            else
            {
                m_LastScore = 0f;
            }
            if (SaveGame.Exists("highScore"))
            {
                m_HighScore = SaveGame.Load<float>("highScore");
            }
            else
            {
                m_HighScore = 0f;
            }
            string SkinEquipped = PlayerPrefs.GetString("SkinEquipped", "Default");
            ChangeSkinWithIndex(SkinEquipped);
        }

        public void ChangeSkinWithIndex(string _SkinEquipped)
        {
            m_MainCharacter.Skeleton.ChangeCharacterSkin(_SkinEquipped, CharacterSkins);
        }

        void UpdateDeathEvent(bool isDead)
        {
            if (isDead)
            {
                StartCoroutine(DeathCrt());
            }
            else
            {
                StopCoroutine("DeathCrt");
            }
        }

        IEnumerator DeathCrt()
        {
            m_LastScore = m_Score;
            if (m_Score > m_HighScore)
            {
                m_HighScore = m_Score;
            }
            if (OnScoreChanged != null)
            {
                OnScoreChanged(m_Score, m_HighScore, m_LastScore);
            }
            Debug.Log("Score Submit" + m_Score);
            CallToServerOnGameEnd(m_Score);
            yield return new WaitForSecondsRealtime(1.5f);

            EndGame();
            SendTokensToServer();
            if (FoundJumpBoosters)
            {
                if (JumpBoostersStartValue > NumberOfJumpBoosters)
                {
                    GlobalFeaturesManager.Instance.UpdateJumpBoosterValue(NumberOfJumpBoosters);
                }
            }
            if (FoundSpeedBoosters)
            {
                if (SpeedBoostersStartValue > NumberOfSpeedBoosters)
                {
                    GlobalFeaturesManager.Instance.UpdateSpeedBoosterValue(NumberOfSpeedBoosters);
                }
            }
            var endScreen = GameTemplateUIManager.Singleton.UISCREENS.Find(el => el.ScreenInfo == UIScreenInfo.END_SCREEN);
            GameTemplateUIManager.Singleton.OpenScreen(endScreen);
        }
        public static int ExtractInteger(string s)
        {
            Match match = Regex.Match(s, @"\d+");

            if (match.Success)
            {
                return int.Parse(match.Value);
            }

            throw new InvalidOperationException("No integer found in the string.");
        }
        private void Start()
        {
            m_MainCharacter.IsDead.AddEventAndFire(UpdateDeathEvent, this);
            m_StartScoreX = m_MainCharacter.transform.position.x;
            Init();
            FetchBoosters();
        }

        public void Init()
        {
            EndGame();
            //UIManager.Singleton.Init();
            StartCoroutine(Load());
        }

        void Update()
        {
            if (m_GameRunning)
            {
                if (m_MainCharacter.transform.position.x > m_StartScoreX && m_MainCharacter.transform.position.x > m_Score)
                {
                    m_Score = m_MainCharacter.transform.position.x;
                    if (OnScoreChanged != null)
                    {
                        OnScoreChanged(m_Score, m_HighScore, m_LastScore);
                        CheckSkinUnlock(m_Score);
                    }
                }
            }
        }

        private void CheckSkinUnlock(float score)
        {
            if(!PlayerPrefs.HasKey(PrefsKeySkinUnlock))
            {
                if (score.ToScore() >= ScoreForSkinUnlock)
                {
                    PlayerPrefs.SetInt(PrefsKeySkinUnlock,1);
                    
                    API_Manager.Instance.MintNft("wrestlerSkin", (success, message) =>
                    {
                        if (success)
                        {
                            Debug.Log("Skin Unlocked");
                            
                            GlobalCanvasManager.Instance.SocketPrompter.ShowPopup("Wrestler Skin Unlocked");
                        }
                    });
                }
            }
        }

        IEnumerator Load()
        {
            var startScreen = GameTemplateUIManager.Singleton.UISCREENS.Find(el => el.ScreenInfo == UIScreenInfo.START_SCREEN);
            yield return new WaitForSecondsRealtime(3f);
           // UIManager.Singleton.OpenScreen(startScreen);
        }

        void OnApplicationQuit()
        {
            if (m_Score > m_HighScore)
            {
                m_HighScore = m_Score;
            }
            SaveGame.Save<int>("coin", m_Coin.Value);
            SaveGame.Save<float>("lastScore", m_Score);
            SaveGame.Save<float>("highScore", m_HighScore);
        }

        public void ExitGame()
        {
            Application.Quit();
        }

        public void ToggleAudioEnabled()
        {
            SetAudioEnabled(!m_AudioEnabled);
        }

        public void SetAudioEnabled(bool active)
        {
            m_AudioEnabled = active;
            AudioListener.volume = active ? 1f : 0f;
            if (OnAudioEnabled != null)
            {
                OnAudioEnabled(active);
            }
        }

        public void StartGame()
        {
            m_GameStarted = true;
            ResumeGame();
            ReactivateJumpBoosterIfAvailable();
        }

        public void StopGame()
        {
            m_GameRunning = false;
            Time.timeScale = 0f;
        }

        public void ResumeGame()
        {
            m_GameRunning = true;
            Time.timeScale = 1f;
        }

        public void EndGame()
        {
            m_GameStarted = false;
            StopGame();
        }

        public void RespawnMainCharacter()
        {
            RespawnCharacter(m_MainCharacter);
        }


        public void RespawnCharacter(Character character)
        {
            Block block = TerrainGenerator.Singleton.GetCharacterBlock();
            if (block != null)
            {
                Vector3 position = block.transform.position;
                position.y += 2.56f;
                position.x += 1.28f;
                character.transform.position = position;
                character.Reset();
            }
        }

        //BOOSTER METHODS//
        void FetchBoosters()
        {
            if (PlayerPrefs.GetInt("SpeedBoostersEquipped") != 0)
            {
                FoundSpeedBoosters = true;
            }
            if (PlayerPrefs.GetInt("JumpBoostersEquipped") != 0)
            {
                FoundJumpBoosters = true;
            }
            if (FoundSpeedBoosters)
            {
                NumberOfSpeedBoosters = GlobalFeaturesManager.Instance.GetSpeedBoosterUses();
                SpeedBoostersStartValue = NumberOfSpeedBoosters;
                UpdateSpeedBoosterCount();
            }
            else
            {
                KillSpeedBoosters();
            }
            if (FoundJumpBoosters)
            {
                NumberOfJumpBoosters = GlobalFeaturesManager.Instance.GetJumpBoosterUses();
                JumpBoostersStartValue = NumberOfJumpBoosters;
                UpdateJumpBoosterCount();
            }
            else
            {
                KillJumpBoosters();
            }
        }
        void KillSpeedBoosters()
        {
            SpeedBoosterButton.gameObject.SetActive(false);
        }
        void KillJumpBoosters()
        {
            JumpBoosterButton.gameObject.SetActive(false);
        }
        //BOOSTER START//
        public void ConsumeJumpBooster()
        {
            if (NumberOfJumpBoosters > 0)
            {
                NumberOfJumpBoosters--;
                UpdateJumpBoosterCount();
                JumpBoosterButton.interactable = false;
                IsJumpBoosterActive = true;
            }
        }
        void UpdateJumpBoosterCount()
        {
            JumpBoosterCountText.text = NumberOfJumpBoosters.ToString();
        }
        public void ReactivateJumpBoosterIfAvailable()
        {
            if (NumberOfJumpBoosters > 0)
            {
                JumpBoosterButton.interactable = true;
            }
        }
   
        public void ConsumeSpeedBooster()
        {
            if (NumberOfSpeedBoosters > 0)
            {
                NumberOfSpeedBoosters--;
                UpdateSpeedBoosterCount();
                SpeedBoosterButton.interactable = false;
                IsSpeedBoosterActive = true;
            }
        }
        void UpdateSpeedBoosterCount()
        {
            SpeedBoosterCountText.text = NumberOfSpeedBoosters.ToString();
        }

        public void ReactivateSpeedBoosterIfAvailable()
        {
            if (NumberOfSpeedBoosters > 0)
            {
                SpeedBoosterButton.interactable = true;
            }
        }

        public void SpeedBoosterNotAllowed()
        {
            SpeedBoosterButton.interactable = false;
        }
        //BOOSTERS METHOD END//

        public void Reset()
        {
            m_Score = 0f;
            if (OnReset != null)
            {
                OnReset();
            }
        }

        public void ShareOnTwitter()
        {
            Share("https://twitter.com/intent/tweet?text={0}&url={1}");
        }

        public void ShareOnGooglePlus()
        {
            Share("https://plus.google.com/share?text={0}&href={1}");
        }

        public void ShareOnFacebook()
        {
            Share("https://www.facebook.com/sharer/sharer.php?u={1}");
        }

        public void Share(string url)
        {
            Application.OpenURL(string.Format(url, m_ShareText, m_ShareUrl));
        }
        public void CallToServerOnGameEnd(float m_Score)
        {
            int myscore = ExtractInteger(m_Score.ToLength());
            API_Manager.Instance.Score_Submit(myscore, StaticDataBank.playerlocalid, (success, message) => {
                if (success)
                {
                    Debug.Log("Score Submited");
                }
            });
        }

        public void SendTokensToServer()
        {
            GlobalFeaturesManager.Instance.SetTokensToPushQty(CoinsCollectedForPushing);
        }

        public void IncrementCollectibleTokens()
        {
            CoinsCollectedForPushing++;
        }

        [System.Serializable]
        public class LoadEvent : UnityEvent
        {

        }

    }

}