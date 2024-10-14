using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class BoosterInGame : MonoBehaviour
{
    public Image BoosterImage;
    public TextMeshProUGUI BoosterValue;

    public void PopulateBooster(DataContainer data)
    {
        BoosterImage.sprite = data.m_sprite;
        if (BoosterValue != null)
        {
            string m_value = data.boosterValue.ToString();
            if (data.boosterValue.Contains("Skin"))
            {
                m_value = m_value.Replace("Skin", "");
            }
            BoosterValue.text = m_value;
        }
    }
}
