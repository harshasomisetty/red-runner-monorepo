using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class BoosterInGame : MonoBehaviour
{
    public Image BoosterImage;
    public TextMeshProUGUI BoosterValue;

    public void PopulateBooster(Sprite m_Sprite, string m_boosterValue)
    {
        BoosterImage.sprite = m_Sprite;
        if (BoosterValue != null)
        {
            BoosterValue.text = m_boosterValue;
        }
    }
}
