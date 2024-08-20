using RedRunner.TerrainGeneration;
using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

[Serializable]
public class UIDataConatainer
{
    public string boosterName;
    public TextMeshProUGUI boosterNameText;
    public Image boosterImage;
}


public class ShopManager : MonoBehaviour
{
    [Header("Detail Panel UI")]
    public GameObject DetailPanel;
    public TextMeshProUGUI attribute;
    public TextMeshProUGUI BoosterName;
    public TextMeshProUGUI Description;
    public Image boosterImage;
    public Button MintButton;
    public GameObject Blocker;


    public List<UIDataConatainer> speedbooster;
    public List<UIDataConatainer> doublejump;
    public List<UIDataConatainer> skins;




    public Dictionary<string, Sprite> spriteDictionary = new Dictionary<string, Sprite>();
    public GameShop _gameShop;

    private void OnEnable()
    {
        API_Manager.instance.GetShopData(GetAllShopData);
    }
    void GetAllShopData(bool sucess, GameShop response)
    {
        if (sucess)
        {
            _gameShop = response; 
            Debug.Log("Game Shop Data Fetch");
            DownloadImage(_gameShop.boosters.double_jump_boosters.double_jump_3.imageUrl, _gameShop.boosters.double_jump_boosters.double_jump_3.name, doublejump[0]);
            DownloadImage(_gameShop.boosters.double_jump_boosters.double_jump_6.imageUrl, _gameShop.boosters.double_jump_boosters.double_jump_6.name, doublejump[1]);
            DownloadImage(_gameShop.boosters.double_jump_boosters.double_jump_10.imageUrl, _gameShop.boosters.double_jump_boosters.double_jump_10.name, doublejump[2]);
            DownloadImage(_gameShop.boosters.double_jump_boosters.double_jump_999.imageUrl, _gameShop.boosters.double_jump_boosters.double_jump_999.name, doublejump[3]);
            DownloadImage(_gameShop.boosters.speed_boosters.speed_booster_3.imageUrl, _gameShop.boosters.speed_boosters.speed_booster_3.name, speedbooster[0]);
            DownloadImage(_gameShop.boosters.speed_boosters.speed_booster_6.imageUrl, _gameShop.boosters.speed_boosters.speed_booster_6.name, speedbooster[1]);
            DownloadImage(_gameShop.boosters.speed_boosters.speed_booster_10.imageUrl, _gameShop.boosters.speed_boosters.speed_booster_10.name, speedbooster[2]);
            DownloadImage(_gameShop.boosters.speed_boosters.speed_booster_999.imageUrl, _gameShop.boosters.speed_boosters.speed_booster_999.name, speedbooster[3]);
            DownloadImage(_gameShop.skins.alienSkin.imageUrl, _gameShop.skins.alienSkin.name, skins[0]);
            DownloadImage(_gameShop.skins.christmasSkin.imageUrl, _gameShop.skins.christmasSkin.name, skins[1]);
            DownloadImage(_gameShop.skins.halloweenSkin.imageUrl, _gameShop.skins.halloweenSkin.name, skins[2]);
            DownloadImage(_gameShop.skins.polkaDotSkin.imageUrl, _gameShop.skins.polkaDotSkin.name, skins[3]);
            DownloadImage(_gameShop.skins.robotSkin.imageUrl, _gameShop.skins.robotSkin.name, skins[4]);
            DownloadImage(_gameShop.skins.solanaSkin.imageUrl, _gameShop.skins.solanaSkin.name, skins[5]);
            DownloadImage(_gameShop.skins.spaceSkin.imageUrl, _gameShop.skins.spaceSkin.name, skins[6]);
            DownloadImage(_gameShop.skins.thiefSkin.imageUrl, _gameShop.skins.thiefSkin.name, skins[7]);
            DownloadImage(_gameShop.skins.wrestlerSkin.imageUrl, _gameShop.skins.wrestlerSkin.name, skins[8]);
            DownloadImage(_gameShop.skins.zombieSkin.imageUrl, _gameShop.skins.zombieSkin.name, skins[9]);
        }
        else
        {
            Debug.Log("Data failed");
        }
    }
    //Sprite DownloadImage(string imageUrl)
    //{
    //    Sprite get_sprite = null;
    //    API_Manager.instance.DownloadImage(imageUrl, (success, m_sprite) => {
    //        if (success)
    //        {
    //            m_sprite = get_sprite;
    //        }
    //        else
    //        {
    //            Debug.Log("Failed to fetch image");
    //        }
    //    });
    //    return get_sprite;
    //}
    void DownloadImage(string imageUrl,string imageName,UIDataConatainer data)
    {
        API_Manager.instance.DownloadImage(imageUrl, (success, m_sprite) => {
            if (success)
            {
                if (spriteDictionary.ContainsKey(imageName))
                {
                    spriteDictionary[imageName] = m_sprite;
                }
                else
                {
                    spriteDictionary.Add(imageName, m_sprite);
                }
                data.boosterNameText.text = imageName;
                data.boosterImage.sprite = m_sprite;
            }
            else
            {
                Debug.Log("Failed to fetch image");
            }
        });
    }
    public void GetSkinsDetails(int index)
    {
        DetailPanel.SetActive(true);
        switch (index)
        {
            case 0:
                GameShop.Skin alienSkin = _gameShop.skins.alienSkin;
                ShowDetailPanel(alienSkin);
                break;
            case 1:
                GameShop.Skin christmasSkin = _gameShop.skins.christmasSkin;
                ShowDetailPanel(christmasSkin);
                break;
            case 2:
                GameShop.Skin halloweenSkin = _gameShop.skins.halloweenSkin;
                ShowDetailPanel(halloweenSkin);
                break;
            case 3:
                GameShop.Skin polkaDotSkin = _gameShop.skins.polkaDotSkin;
                ShowDetailPanel(polkaDotSkin);
                break;
            case 4:
                GameShop.Skin robotSkin = _gameShop.skins.robotSkin;
                ShowDetailPanel(robotSkin);
                break;
            case 5:
                GameShop.Skin solanaSkin = _gameShop.skins.solanaSkin;
                ShowDetailPanel(solanaSkin);
                break;
            case 6:
                GameShop.Skin spaceSkin = _gameShop.skins.spaceSkin;
                ShowDetailPanel(spaceSkin);
                break;
            case 7:
                GameShop.Skin thiefSkin = _gameShop.skins.thiefSkin;
                ShowDetailPanel(thiefSkin);
                break;
            case 8:
                GameShop.Skin wrestlerSkin = _gameShop.skins.wrestlerSkin;
                ShowDetailPanel(wrestlerSkin);
                break;
            case 9:
                GameShop.Skin zombieSkin = _gameShop.skins.zombieSkin;
                ShowDetailPanel(zombieSkin);
                break;
        }
    }
    
    public void GetSpeedBoostersDetails(int index)
    {
        DetailPanel.SetActive(true);
        switch (index)
        {
            case 0:
                GameShop.Booster speed = _gameShop.boosters.speed_boosters.speed_booster_3;
                ShowDetailPanel(speed, "speed_booster_3");
                break;
            case 1:
                GameShop.Booster speed1 = _gameShop.boosters.speed_boosters.speed_booster_6;
                ShowDetailPanel(speed1, "speed_booster_6");
                break;
            case 2:
                GameShop.Booster speed2 = _gameShop.boosters.speed_boosters.speed_booster_10;
                ShowDetailPanel(speed2, "speed_booster_10");
                break;
            case 3:
                GameShop.Booster speed3 = _gameShop.boosters.speed_boosters.speed_booster_999;
                ShowDetailPanel(speed3, "speed_booster_999");
                break;

        }
    }
    public void GetJumpBoostersDetails(int index)
    {
        DetailPanel.SetActive(true);
        switch (index)
        {
            case 0:
                GameShop.Booster jump = _gameShop.boosters.double_jump_boosters.double_jump_3;
                ShowDetailPanel(jump, "double_jump_3");
                break;
            case 1:
                GameShop.Booster jump1 = _gameShop.boosters.double_jump_boosters.double_jump_6;
                ShowDetailPanel(jump1, "double_jump_6");
                break;
            case 2:
                GameShop.Booster jump2 = _gameShop.boosters.double_jump_boosters.double_jump_10;
                ShowDetailPanel(jump2, "double_jump_10");
                break;
            case 3:
                GameShop.Booster jump3 = _gameShop.boosters.double_jump_boosters.double_jump_999;
                ShowDetailPanel(jump3, "double_jump_999");
                break;

        }
    }

    public void ShowDetailPanel(GameShop.Skin skin)
    {
        if (spriteDictionary.ContainsKey(skin.name))
            boosterImage.sprite = spriteDictionary[skin.name];
        boosterImage.SetNativeSize();
        BoosterName.text = skin.name;
        Description.text = skin.description;
        attribute.text = skin.attributes[0].traitType + ":" + skin.attributes[0].value;
        Minting(skin.attributes[0].value);
    }
    public void ShowDetailPanel(GameShop.Booster booster, string mintid)
    {
        if (spriteDictionary.ContainsKey(booster.name))
            boosterImage.sprite = spriteDictionary[booster.name];
        boosterImage.SetNativeSize();
        BoosterName.text = booster.name;
        Description.text = booster.description;
        attribute.text = booster.attributes[0].traitType + ":" + booster.attributes[0].value;
        Minting(mintid);
    }
    public void Minting(string MintID)
    {
        MintButton.gameObject.SetActive(true);
        MintButton.onClick.RemoveAllListeners();
        MintButton.onClick.AddListener(delegate
        {
            MintNFT(MintID);
        });
    }
    public void MintNFT(string itemName)
    {
        Blocker.SetActive(true);
        API_Manager.instance.MintNft(itemName, (success, message) =>
        {
            Blocker.SetActive(false);
            if (success)
            {
                Debug.Log("NFT  : " + message);
            }
        });
    }
}
