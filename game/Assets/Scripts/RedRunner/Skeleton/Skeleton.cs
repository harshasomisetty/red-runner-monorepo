using System.Collections;
using System.Collections.Generic;
using Unity.Profiling;
using UnityEngine;

namespace RedRunner
{

	public class Skeleton : MonoBehaviour
	{

		#region Delegates

		public delegate void ActiveChangedHandler (bool active);

		#endregion

		#region Events

		public event ActiveChangedHandler OnActiveChanged;

		#endregion

		#region Fields

		[Header ("Skeleton")]
		[Space]
		[SerializeField]
		private Rigidbody2D m_Body;
		[SerializeField]
		private Rigidbody2D m_RightFoot;
		[SerializeField]
		private Rigidbody2D m_LeftFoot;
		[SerializeField]
		private Rigidbody2D m_RightHand;
		[SerializeField]
		private Rigidbody2D m_LeftHand;
		[SerializeField]
		private Rigidbody2D m_RightArm;
		[SerializeField]
		private Rigidbody2D m_LeftArm;
		[SerializeField]
		private Transform m_LeftEye;
		[SerializeField]
		private Transform m_RightEye;
		[SerializeField]
		private bool m_IsActive = false;

		#endregion

		#region Properties

		public Rigidbody2D Body { get { return m_Body; } }

		public Rigidbody2D RightFoot { get { return m_RightFoot; } }

		public Rigidbody2D LeftFoot { get { return m_LeftFoot; } }

		public Rigidbody2D RightHand { get { return m_RightHand; } }

		public Rigidbody2D LeftHand { get { return m_LeftHand; } }

		public Rigidbody2D RightArm { get { return m_RightArm; } }

		public Rigidbody2D LeftArm { get { return m_LeftArm; } }

		public Transform LeftEye { get { return m_LeftEye; } }

		public Transform RightEye { get { return m_RightEye; } }

		public bool IsActive { get { return m_IsActive; } }

		#endregion

		#region Public Methods

		public void SetActive (bool active, Vector2 velocity)
		{
			if (m_IsActive != active) {
				if (!active) {
					m_Body.velocity = velocity;
				}
				m_IsActive = active;
				m_Body.simulated = active;
				m_RightFoot.simulated = active;
				m_LeftFoot.simulated = active;
				m_RightHand.simulated = active;
				m_LeftHand.simulated = active;
				m_RightArm.simulated = active;
				m_LeftArm.simulated = active;
				if (OnActiveChanged != null) {
					OnActiveChanged (active);
				}
			}
		}
        public void ChangeCharacterSkin(string SkinName, CharacterSkins character)
        {
            int skinIndex = 0;
            switch (SkinName)
            {
                case "halloweenSkin":
                    skinIndex = 3;
                    break;
                case "alienSkin":
                    skinIndex = 4;
                    break;
                case "christmasSkin":
                    skinIndex = 5;
                    break;
                case "polkaDotSkin":
                    skinIndex = 6;
                    break;
                case "robotSkin":
                    skinIndex = 7;
                    break;
                case "solanaSkin":
                    skinIndex = 8;
                    break;
                case "spaceSkin":
                    skinIndex = 9;
                    break;
                case "thiefSkin":
                    skinIndex = 10;
                    break;
                case "wrestlerSkin":
                    skinIndex = 11;
                    break;
                case "zombieSkin":
                    skinIndex = 12;
                    break;
				case "Default":
                    skinIndex = 0;
                    break;
            }
            m_Body.GetComponent<SpriteRenderer>().sprite = character.Skins[skinIndex].Body;
            m_LeftEye.GetComponent<SpriteRenderer>().sprite = character.Skins[skinIndex].Eye;
            m_LeftArm.GetComponent<SpriteRenderer>().sprite = character.Skins[skinIndex].LeftArm;
            m_LeftFoot.GetComponent<SpriteRenderer>().sprite = character.Skins[skinIndex].LeftFoot;
            m_LeftHand.GetComponent<SpriteRenderer>().sprite = character.Skins[skinIndex].LeftHand;
            m_RightEye.GetComponent<SpriteRenderer>().sprite = character.Skins[skinIndex].Eye;
            m_RightArm.GetComponent<SpriteRenderer>().sprite = character.Skins[skinIndex].RightArm;
            m_RightFoot.GetComponent<SpriteRenderer>().sprite = character.Skins[skinIndex].RightFoot;
            m_RightHand.GetComponent<SpriteRenderer>().sprite = character.Skins[skinIndex].RightHand;
        }
        #endregion

    }

}