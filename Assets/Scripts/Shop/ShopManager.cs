using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class ShopManager : MonoBehaviour
{
    public static ShopManager Instance;

    [Header("UI elements")]
    public Transform SpeedBoosterContainer;
    public Transform DoubleJumpContainer;
    public Transform SkinContainer;

    [Header("Detail Panel UI")]
    public GameObject DetailPanel;
    public TextMeshProUGUI attribute;
    public TextMeshProUGUI BoosterName;
    public TextMeshProUGUI Description;
    public Image boosterImage;


    //Shop Data Availability//
    bool ShopDataAvailability = false;

    public GameShop GameShopData;
    void Start()
    {
        API_Manager.instance.GetShopData(GetAllShopData);
    }

    void GetAllShopData(bool sucess, string response)
    {
        if (sucess)
        {
            GameShop _gamedata = JsonUtility.FromJson<GameShop>(response);
            GameShopData = _gamedata;
            ShopDataAvailability = true;
        }
        else
        {
            ShopDataAvailability = false;
            Debug.Log("Shop Data Failed");
        }
        ConfirmShopDataAvailability(ShopDataAvailability);
    }

    void ConfirmShopDataAvailability(bool State)
    {
        if (State)
        {

        }
        else
        {

        }
    }

    public void GetSkinsDetails(int index)
    {
        DetailPanel.SetActive(true);
        switch (index)
        {
            case 0:
                GameShop.Skin zombieSkin = GameShopData.skins.zombieSkin;
                ShowDetailPanel(zombieSkin);
                break;
            case 1:
                GameShop.Skin alienSkin = GameShopData.skins.alienSkin;
                ShowDetailPanel(alienSkin);
                break;
            case 2:
                GameShop.Skin robotSkin = GameShopData.skins.robotSkin;
                ShowDetailPanel(robotSkin);
                break;
            case 3:
                GameShop.Skin spaceSkin = GameShopData.skins.spaceSkin;
                ShowDetailPanel(spaceSkin);
                break;
            case 4:
                GameShop.Skin christmasSkin = GameShopData.skins.christmasSkin;
                ShowDetailPanel(christmasSkin);
                break;
            case 5:
                GameShop.Skin solanaSkin = GameShopData.skins.solanaSkin;
                ShowDetailPanel(solanaSkin);
                break;
            case 6:
                GameShop.Skin halloweenSkin = GameShopData.skins.halloweenSkin;
                ShowDetailPanel(halloweenSkin);
                break;
            case 7:
                GameShop.Skin polkaDotSkin = GameShopData.skins.polkaDotSkin;
                ShowDetailPanel(polkaDotSkin);
                break;
            case 8:
                GameShop.Skin thiefSkin = GameShopData.skins.thiefSkin;
                ShowDetailPanel(thiefSkin);
                break;
            case 9:
                GameShop.Skin wrestlerSkin = GameShopData.skins.wrestlerSkin;
                ShowDetailPanel(wrestlerSkin);
                break;
        }
    }
    
    public void GetSpeedBoostersDetails(int index)
    {
        DetailPanel.SetActive(true);
        switch (index)
        {
            case 0:
                GameShop.Booster speed = GameShopData.boosters.speed_boosters.speed_booster_3;
                ShowDetailPanel(speed);
                break;
            case 1:
                GameShop.Booster speed1 = GameShopData.boosters.speed_boosters.speed_booster_6;
                ShowDetailPanel(speed1);
                break;
            case 2:
                GameShop.Booster speed2 = GameShopData.boosters.speed_boosters.speed_booster_10;
                ShowDetailPanel(speed2);
                break;
            case 3:
                GameShop.Booster speed3 = GameShopData.boosters.speed_boosters.speed_booster_999;
                ShowDetailPanel(speed3);
                break;
        }
    }

    public void GetJumpBoostersDetails(int index)
    {
        switch (index)
        {
            case 0:
                GameShop.Booster jump = GameShopData.boosters.double_jump_boosters.double_jump_3;
                ShowDetailPanel(jump);
                break;
            case 1:
                GameShop.Booster jump1 = GameShopData.boosters.double_jump_boosters.double_jump_6;
                ShowDetailPanel(jump1);
                break;
            case 2:
                GameShop.Booster jump2 = GameShopData.boosters.double_jump_boosters.double_jump_10;
                ShowDetailPanel(jump2);
                break;
            case 3:
                GameShop.Booster jump3 = GameShopData.boosters.double_jump_boosters.double_jump_999;
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
