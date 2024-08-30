using System;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
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
    public static ShopManager Instance;
    void Awake()
    {
        if(Instance == null)
        {
            Instance = this;
        }
    }

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

    private string _selectedMintId;

    void HidePopUp()
    {
        UIManager.Instance.SelectDefaultFeatureWindowOption();
    }
    void GetAllShopData(bool sucess, GameShop response)
    {
        if (sucess)
        {
            if ((_gameShop!=null)&& _gameShop.boosters.speed_boosters.speed_booster_6.price.SOL == response.boosters.speed_boosters.speed_booster_6.price.SOL &&
                _gameShop.boosters.double_jump_boosters.double_jump_3.price.SOL == response.boosters.double_jump_boosters.double_jump_3.price.SOL &&
                _gameShop.skins.alienSkin.price.SOL == response.skins.alienSkin.price.SOL)
            {
                UIManager.Instance.SelectDefaultFeatureWindowOption();
                return;
            }
            _gameShop = response;
            StaticDataBank.SpeedBoosterCollectionID = _gameShop.boosters.speed_boosters.speed_booster_3.collectionId;
            StaticDataBank.DoubleJumpCollectionID = _gameShop.boosters.double_jump_boosters.double_jump_3.collectionId;
            StaticDataBank.SkinCollectionID = _gameShop.skins.alienSkin.collectionId;
            StartCoroutine(PopulateData());
        }
        else
        {
            UIManager.Instance.ActivateFailureScreen("Shop");
        }
    }
    //Sprite DownloadImage(string imageUrl)
    //{
    //    Sprite get_sprite = null;
    //    API_Manager.Instance.DownloadImage(imageUrl, (success, m_sprite) => {
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
    IEnumerator PopulateData()
    {
        yield return StartCoroutine(DownloadImage(_gameShop.boosters.double_jump_boosters.double_jump_3.imageUrl, _gameShop.boosters.double_jump_boosters.double_jump_3.name, doublejump[0]));
        yield return StartCoroutine(DownloadImage(_gameShop.boosters.double_jump_boosters.double_jump_6.imageUrl, _gameShop.boosters.double_jump_boosters.double_jump_6.name, doublejump[1]));
        yield return StartCoroutine(DownloadImage(_gameShop.boosters.double_jump_boosters.double_jump_10.imageUrl, _gameShop.boosters.double_jump_boosters.double_jump_10.name, doublejump[2]));
        yield return StartCoroutine(DownloadImage(_gameShop.boosters.double_jump_boosters.double_jump_999.imageUrl, _gameShop.boosters.double_jump_boosters.double_jump_999.name, doublejump[3]));
        yield return StartCoroutine(DownloadImage(_gameShop.boosters.speed_boosters.speed_booster_3.imageUrl, _gameShop.boosters.speed_boosters.speed_booster_3.name, speedbooster[0]));
        yield return StartCoroutine(DownloadImage(_gameShop.boosters.speed_boosters.speed_booster_6.imageUrl, _gameShop.boosters.speed_boosters.speed_booster_6.name, speedbooster[1]));
        yield return StartCoroutine(DownloadImage(_gameShop.boosters.speed_boosters.speed_booster_10.imageUrl, _gameShop.boosters.speed_boosters.speed_booster_10.name, speedbooster[2]));
        yield return StartCoroutine(DownloadImage(_gameShop.boosters.speed_boosters.speed_booster_999.imageUrl, _gameShop.boosters.speed_boosters.speed_booster_999.name, speedbooster[3]));
        yield return StartCoroutine(DownloadImage(_gameShop.skins.alienSkin.imageUrl, _gameShop.skins.alienSkin.name, skins[0]));
        yield return StartCoroutine(DownloadImage(_gameShop.skins.christmasSkin.imageUrl, _gameShop.skins.christmasSkin.name, skins[1]));
        yield return StartCoroutine(DownloadImage(_gameShop.skins.halloweenSkin.imageUrl, _gameShop.skins.halloweenSkin.name, skins[2]));
        yield return StartCoroutine(DownloadImage(_gameShop.skins.polkaDotSkin.imageUrl, _gameShop.skins.polkaDotSkin.name, skins[3]));
        yield return StartCoroutine(DownloadImage(_gameShop.skins.robotSkin.imageUrl, _gameShop.skins.robotSkin.name, skins[4]));
        yield return StartCoroutine(DownloadImage(_gameShop.skins.solanaSkin.imageUrl, _gameShop.skins.solanaSkin.name, skins[5]));
        yield return StartCoroutine(DownloadImage(_gameShop.skins.spaceSkin.imageUrl, _gameShop.skins.spaceSkin.name, skins[6]));
        yield return StartCoroutine(DownloadImage(_gameShop.skins.thiefSkin.imageUrl, _gameShop.skins.thiefSkin.name, skins[7]));
        yield return StartCoroutine(DownloadImage(_gameShop.skins.wrestlerSkin.imageUrl, _gameShop.skins.wrestlerSkin.name, skins[8]));
        yield return StartCoroutine(DownloadImage(_gameShop.skins.zombieSkin.imageUrl, _gameShop.skins.zombieSkin.name, skins[9]));
        yield return new WaitForSecondsRealtime(1f);
        UIManager.Instance.SelectDefaultFeatureWindowOption();
    }
    IEnumerator DownloadImage(string imageUrl,string imageName,UIDataConatainer data)
    {
        bool istartchecking = false;
        GlobalFeaturesManager.Instance.ImageCache.DownloadImage(imageUrl, (m_sprite) => {
            
            istartchecking = true;
            
            if (m_sprite != null)
            {
                Sprite tempSprite = Sprite.Create(m_sprite, new Rect(0, 0, m_sprite.width, m_sprite.height), new Vector2(0.5f, 0.5f));
                
                if (spriteDictionary.ContainsKey(imageName))
                {
                    spriteDictionary[imageName] = tempSprite;
                }
                else
                {
                    spriteDictionary.Add(imageName, tempSprite);
                }
                data.boosterNameText.text = StaticDataBank.RemoveWordFromString(imageName);
                data.boosterImage.sprite = tempSprite;
                
                if(imageName.Contains("Skin"))
                    data.boosterImage.SetNativeSize();
            }
            else
            {
                Debug.Log("Failed to fetch image");
            }
        });
        
        yield return new WaitUntil(() => istartchecking);
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
        BoosterName.text = StaticDataBank.RemoveWordFromString(skin.name);
        Description.text = skin.description;
        attribute.text = skin.attributes[0].traitType + ":" + skin.attributes[0].value;
        _selectedMintId = skin.attributes[0].value;
        MintButton.gameObject.SetActive(true);
    }
    public void ShowDetailPanel(GameShop.Booster booster, string mintid)
    {
        if (spriteDictionary.ContainsKey(booster.name))
            boosterImage.sprite = spriteDictionary[booster.name];
        
        boosterImage.SetNativeSize();
        
        //BoosterName.text = StaticDataBank.RemoveWordFromString(booster.name);
        BoosterName.text = booster.name;
        Description.text = booster.description;
        attribute.text = booster.attributes[0].traitType + ":" + booster.attributes[0].value;
        _selectedMintId = mintid;
        MintButton.gameObject.SetActive(true);
    }

    public void DetailsBuyButtonPressed()
    {
        Minting(_selectedMintId);
    }

    public void Minting(string MintID)
    {
        PopupData newPopupData = new PopupData();
        newPopupData.showSecondButton = true;
        newPopupData.titleString = "Buy Asset";
        newPopupData.contentString = "Are you sure you want to buy this ?";
        newPopupData.firstButtonString = "SOL";
        newPopupData.secondButtonString = "USD";
        newPopupData.firstButtonCallBack = () => MintNft(MintID,true);
        newPopupData.secondButtonCallBack = () => MintNft(MintID,false);
        GlobalCanvasManager.Instance.PopUIHandler.ShowPopup(newPopupData);
        GlobalCanvasManager.Instance.PopUIHandler.ToggleSpecialKillButton(true);
        
    }
    public void MintNft(string itemName,bool withSol)
    {
        DetailPanel.SetActive(false);
        GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Processing Payment", true,
    new List<SocketEventsType> { SocketEventsType.paymentComplete });
        
        Debug.Log("Item Name : " + itemName);
        API_Manager.Instance.BuyNft(itemName,withSol, (success, message) =>
        {
            if (success)
            {
                Utils.OpenURLInNewTab(message);
                // Output the URL
                Debug.Log("Checkout URL: " + message);
            }
            else
            {
                Debug.Log(message);
                GlobalCanvasManager.Instance.LoadingPanel.HidePopup();
                
                GlobalCanvasManager.Instance.PopUIHandler.ShowPopup(new PopupData()
                {
                    titleString = "Error",
                    contentString = message,
                    firstButtonString = "OK",
                    firstButtonCallBack = null
                });
            } 
        });
    }

    public void ReactivateDetailPanel()
    {
        DetailPanel.SetActive(true);
    }

    public void FetchShopData()
    {
        API_Manager.Instance.GetShopData(GetAllShopData);
    }
}
