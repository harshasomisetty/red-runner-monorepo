using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class ShopManager : MonoBehaviour
{
    public static GameShopDecoder Instance;
    [Header("UI elements")]
    public Transform SpeedBoosterContainer;
    public Transform DoubleJumpContainer, SkinContainer;
    [Header("Detail Panel UI")]
    public GameObject DetailPanel;
    public TextMeshProUGUI attribute;
    public TextMeshProUGUI BoosterName;
    public TextMeshProUGUI Description;
    public Image boosterImage;


    public GameShop _gameShop;

    private void OnEnable()
    {
        _gameShop = GameShopDecoder.Instance.GameShop;
    }
    public void GetSkinsDetails(int index)
    {
        DetailPanel.SetActive(true);
        switch (index)
        {
            case 0:
                GameShop.Skin zombieSkin = _gameShop.skins.zombieSkin;
                ShowDetailPanel(zombieSkin);
                break;
            case 1:
                GameShop.Skin alienSkin = _gameShop.skins.alienSkin;
                ShowDetailPanel(alienSkin);
                break;
            case 2:
                GameShop.Skin robotSkin = _gameShop.skins.robotSkin;
                ShowDetailPanel(robotSkin);
                break;
            case 3:
                GameShop.Skin spaceSkin = _gameShop.skins.spaceSkin;
                ShowDetailPanel(spaceSkin);
                break;
            case 4:
                GameShop.Skin christmasSkin = _gameShop.skins.christmasSkin;
                ShowDetailPanel(christmasSkin);
                break;
            case 5:
                GameShop.Skin solanaSkin = _gameShop.skins.solanaSkin;
                ShowDetailPanel(solanaSkin);
                break;
            case 6:
                GameShop.Skin halloweenSkin = _gameShop.skins.halloweenSkin;
                ShowDetailPanel(halloweenSkin);
                break;
            case 7:
                GameShop.Skin polkaDotSkin = _gameShop.skins.polkaDotSkin;
                ShowDetailPanel(polkaDotSkin);
                break;
            case 8:
                GameShop.Skin thiefSkin = _gameShop.skins.thiefSkin;
                ShowDetailPanel(thiefSkin);
                break;
            case 9:
                GameShop.Skin wrestlerSkin = _gameShop.skins.wrestlerSkin;
                ShowDetailPanel(wrestlerSkin);
                break;

        }
    }
    
    public void GetBoostersDetails(int index)
    {
        DetailPanel.SetActive(true);
        switch (index)
        {
            case 0:
                GameShop.Booster speed = _gameShop.boosters.speed_boosters.speed_booster_3;
                ShowDetailPanel(speed);
                break;
            case 1:
                GameShop.Booster speed1 = _gameShop.boosters.speed_boosters.speed_booster_6;
                ShowDetailPanel(speed1);
                break;
            case 2:
                GameShop.Booster speed2 = _gameShop.boosters.speed_boosters.speed_booster_10;
                ShowDetailPanel(speed2);
                break;
            case 3:
                GameShop.Booster speed3 = _gameShop.boosters.speed_boosters.speed_booster_999;
                ShowDetailPanel(speed3);
                break;
            case 4:
                GameShop.Booster jump = _gameShop.boosters.double_jump_boosters.double_jump_3;
                ShowDetailPanel(jump);
                break;
            case 5:
                GameShop.Booster jump1 = _gameShop.boosters.double_jump_boosters.double_jump_6;
                ShowDetailPanel(jump1);
                break;
            case 6:
                GameShop.Booster jump3 = _gameShop.boosters.double_jump_boosters.double_jump_999;
                ShowDetailPanel(jump3);
                break;

        }
    }

    public void ShowDetailPanel(GameShop.Skin skin)
    {
        API_Manager.instance.DownloadImage(skin.imageUrl, (success, sprite) => {
            if (success)
            {
                boosterImage.sprite = sprite;
                boosterImage.SetNativeSize();
            }
            else
            {
                Debug.Log("Failed to fetch image");
            }
        });
        BoosterName.text = skin.name;
        Description.text = skin.description;
        attribute.text = skin.attributes[0].traitType + ":" + skin.attributes[0].value;
    }
    public void ShowDetailPanel(GameShop.Booster booster)
    {
        API_Manager.instance.DownloadImage(booster.imageUrl, (success, sprite) => {
            if (success)
            {
                boosterImage.sprite = sprite;
                boosterImage.SetNativeSize();
            }
            else
            {
                Debug.Log("Failed to fetch image");
            }
        });
        BoosterName.text = booster.name;
        Description.text = booster.description;
        attribute.text = booster.attributes[0].traitType + ":" + booster.attributes[0].value;
    }
    
}
