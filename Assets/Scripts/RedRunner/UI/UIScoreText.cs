using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

using RedRunner.Utilities;

namespace RedRunner.UI
{

	public class UIScoreText : Text
	{

		protected bool m_Collected = false;

		protected override void Awake()
		{
			GameManager.OnScoreChanged += GameManager_OnScoreChanged;
			GameManager.OnReset += GameManager_OnReset;
			base.Awake();
		}

		void GameManager_OnReset()
		{
			m_Collected = false;
		}

		void GameManager_OnScoreChanged(float newScore, float highScore, float lastScore)
		{
			if (text != null)
			{
				text = newScore.ToLength();
			}
			if (newScore > highScore && !m_Collected)
			{
				m_Collected = true;
				GetComponent<Animator>().SetTrigger("Collect");
			}
		}
        protected override void OnDisable()
        {
            GameManager.OnScoreChanged -= GameManager_OnScoreChanged;
            GameManager.OnReset -= GameManager_OnReset;
        }
    }

}