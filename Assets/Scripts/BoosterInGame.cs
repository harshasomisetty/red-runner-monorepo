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
            BoosterValue.text = data.boosterValue;
        }
    }
}
