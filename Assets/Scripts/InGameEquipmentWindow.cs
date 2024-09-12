using RedRunner.UI;
using TMPro;
using UnityEngine;
using UnityEngine.UI;


public class InGameEquipmentWindow : MonoBehaviour
{
    public static InGameEquipmentWindow Instance;

    [Header("In Game Equipment Window")]
    public GameObject InGameEquipmentDialog;

    [Header("Current Equiped NFT Holders")]
    public Image CurrentSpeedBoosterHolder;
    public Image CurrentJumpBoosterHolder;
    public Image CurrentSkinHolder;
    public Sprite DefaultHolderSprite;

    [Header("Number of booster Text Field")]
    public TextMeshProUGUI CurrentSpeedBoosterHolderText;
    public TextMeshProUGUI CurrentJumpBoosterHolderText;

    [Header("Game Equipment Sorting Buttons")]
    public Button[] GameEquipmentOptionButtons;
    public Sprite GameEquipmentOptionHighlighterSprite;
    public Sprite GameEquipmentOptionNormalSprite;

    [Header("NFTs Content Bar")]
    public Transform EquipmentBar;

    [Header("NFT_Selector_Unit")]
    public GameObject NFT_Selector_Unit_Boosters;
    public GameObject NFT_Selector_Unit_Skins;

    int CurrentSelectedGameEquipmentOption = -1;
    int CurrentSelectedSpeedBoosterAsset = -1;
    int CurrentSelectedJumpBoosterAsset = -1;
    int CurrentSelectedSkinAsset = -1;

    private void Awake()
    {
        Instance = this;
    }
    void Start()
    {
        SetDefaultValues();
    }
    public void ChangeGameEquipmentOption(int selectedGameEquipmentOption)
    {
        if (selectedGameEquipmentOption == CurrentSelectedGameEquipmentOption)
        {
            return;
        }
        else
        {
            CurrentSelectedGameEquipmentOption = selectedGameEquipmentOption;
            UIManager.Instance._sequenceCall = true;
            GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Refreshing Inventory...");
            InventoryManager.Instance.FetchInventoryData(StaticDataBank.GetCollectionId(CurrentSelectedGameEquipmentOption));
            HighlightedGameEquipmentOptionButtons(CurrentSelectedGameEquipmentOption);
            ClearEquipmentBar();
            
            //switch (CurrentSelectedGameEquipmentOption)
            //{
            //    case 0:
            //        FetchSpeedBoostersFromInventory();
            //        break;
            //    case 1:
            //        FetchJumpBoostersFromInventory();
            //        break;
            //    case 2:
            //        FetchSkinsFromInventory();
            //        break;
            //}
        }
    }
    void HighlightGameEquipmentOptionButton(int i)
    {
        //ClearAllHighlightedGameEquipmentOptionButtons();
        GameEquipmentOptionButtons[i].image.sprite = GameEquipmentOptionHighlighterSprite;
        GameEquipmentOptionButtons[i].image.SetNativeSize();
        GameEquipmentOptionButtons[i].GetComponent<RectTransform>().sizeDelta = new Vector2(370 / 1.02f, 97 / 1.02f);
        GameEquipmentOptionButtons[i].GetComponentInChildren<TextMeshProUGUI>().fontSize = 40;
    }
    void HighlightedGameEquipmentOptionButtons(int j)
    {
        for (int i = 0; i < GameEquipmentOptionButtons.Length; i++)
        {
            if (j == i)
            {
                GameEquipmentOptionButtons[i].image.sprite = GameEquipmentOptionHighlighterSprite;
                GameEquipmentOptionButtons[i].image.SetNativeSize();
                GameEquipmentOptionButtons[i].GetComponent<RectTransform>().sizeDelta = new Vector2(370 / 1.02f, 97 / 1.02f);
                GameEquipmentOptionButtons[i].GetComponentInChildren<TextMeshProUGUI>().fontSize = 40;
            }
            else if(GameEquipmentOptionNormalSprite == null)
            {
                GameEquipmentOptionButtons[i].image.sprite = null;
            }
            else
            {
                GameEquipmentOptionButtons[i].image.sprite = GameEquipmentOptionNormalSprite;
                //GameEquipmentOptionButtons[i].image.SetNativeSize();
                GameEquipmentOptionButtons[i].GetComponent<RectTransform>().sizeDelta = new Vector2(370 / 1.2f, 97 / 1.2f);
                GameEquipmentOptionButtons[i].GetComponentInChildren<TextMeshProUGUI>().fontSize = 30;
            }
        }
    }
    void ClearEquipmentBar()
    {
        for (int i = EquipmentBar.childCount; i > 0; i--)
        {
            Destroy(EquipmentBar.GetChild(i - 1).gameObject);
        }
    }
    //void FetchSpeedBoostersFromInventory()
    //{
    //    Debug.Log("FETCHING SPEED BOOSTERS FROM INVENTORY");
    //    CreateNFT_SelectorUnits(CurrentSelectedGameEquipmentOption);
    //}
    //void FetchJumpBoostersFromInventory()
    //{
    //    Debug.Log("FETCHING JUMP BOOSTERS FROM INVENTORY");
    //    CreateNFT_SelectorUnits(CurrentSelectedGameEquipmentOption);
    //}
    //void FetchSkinsFromInventory()
    //{
    //    Debug.Log("FETCHING JUMP BOOSTERS FROM INVENTORY");
    //    CreateNFT_SelectorUnits(CurrentSelectedGameEquipmentOption);
    //}
    public void ToggleInGameEquipmentWindow(bool State)
    {
        if (State)
        {
            GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Refreshing Inventory...");
            UIManager.Instance.GameEquipmentBackButton.SetActive(false);
            UIManager.Instance._sequenceCall = true;
            ChangeGameEquipmentOption(0);
            //InventoryManager.Instance.FetchInventoryData(StaticDataBank.GetCollectionId(0));
        }
        else
        {
            CurrentSelectedSpeedBoosterAsset = -1;
            CurrentSelectedJumpBoosterAsset = -1;
            CurrentSelectedSkinAsset = -1;
            PlayerPrefs.SetInt("SpeedBoostersEquipped", 0);
            PlayerPrefs.SetInt("JumpBoostersEquipped", 0);
            UIManager.Instance.ToggleGameEquipmentFeatures(false);
            ClearPlaceHolders();
            SetDefaultValues();
        }
        InGameEquipmentDialog.SetActive(State);
        UIManager.Instance.ToggleMainScreen(!State);
    }
    void CreateNFT_SelectorUnits(int Variation)
    {
        switch (Variation)
        {
            case 0:

                Debug.Log("CreateNFT_Units Speed Boosters"+ InventoryManager.Instance.SpeedBoosterIndex.Count);
                for (int i = 0; i < InventoryManager.Instance.SpeedBoosterIndex.Count; i++)
                {
                    DataContainer _data = InventoryManager.Instance.GetDataOfBoosters(InventoryManager.Instance.SpeedBoosterIndex[i]);
                    GameObject temp = Instantiate(NFT_Selector_Unit_Boosters, EquipmentBar);
                    temp.GetComponent<BoosterInGame>().PopulateBooster(_data);
                    int index = i;
                    Debug.Log(temp.name);
                    UIButton uIButton = temp.GetComponent<UIButton>();
                    uIButton.interactable = !_data.isListed;
                    uIButton.onClick.AddListener(delegate {

                        SelectSpeedBoosterAsset(index, _data);
                    });
                }
                break;
            case 1:
                Debug.Log("CreateNFT_Units Jump Boosters"+ InventoryManager.Instance.DoubleJumpIndex.Count);
                for (int i = 0; i < InventoryManager.Instance.DoubleJumpIndex.Count; i++)
                {
                    DataContainer _data = InventoryManager.Instance.GetDataOfBoosters(InventoryManager.Instance.DoubleJumpIndex[i]);
                    GameObject temp = Instantiate(NFT_Selector_Unit_Boosters, EquipmentBar);
                    temp.GetComponent<BoosterInGame>().PopulateBooster(_data);
                    int index = i;
                    UIButton uIButton = temp.GetComponent<UIButton>();
                    uIButton.interactable = !_data.isListed;
                    uIButton.onClick.AddListener(delegate {

                        SelectJumpBoosterAsset(index, _data);
                    });
                }
                break;
            case 2:
                for (int i = 0; i < InventoryManager.Instance.SkinsIndex.Count; i++)
                {
                    DataContainer _data = InventoryManager.Instance.GetDataOfBoosters(InventoryManager.Instance.SkinsIndex[i]);
                    GameObject temp = Instantiate(NFT_Selector_Unit_Skins, EquipmentBar);
                    temp.transform.GetChild(0).GetChild(0).GetComponent<RectTransform>().localPosition = new Vector3(0f, -44, 0f);
                    temp.GetComponent<BoosterInGame>().PopulateBooster(_data);
                    int index = i;
                    UIButton uIButton = temp.GetComponent<UIButton>();
                    uIButton.interactable = !_data.isListed;
                    uIButton.onClick.AddListener(delegate {

                        SelectSkinAsset(index, _data);
                    });
                }
                Debug.Log("CreateNFT_Units  Skins");
                break;
        }
    }
    public void SetDefaultSelectedOption()
    {
        //ChangeGameEquipmentOption(0);
        CreateNFT_SelectorUnits(CurrentSelectedGameEquipmentOption);
    }
    public void SelectSpeedBoosterAsset(int SelectIndex, DataContainer data)
    {
        if (SelectIndex == CurrentSelectedSpeedBoosterAsset)
        {
            return;
        }
        else
        {
            CurrentSelectedSpeedBoosterAsset = SelectIndex;
            CurrentSpeedBoosterHolder.sprite = data.m_sprite;
            EquipedAssets _itemdetails = InventoryManager.Instance.GetEquipedAssetDetails(InventoryManager.Instance.SpeedBoosterIndex[SelectIndex]);
            //string _AssetID = InventoryManager.Instance.getAssetIdOfSpeedBooster(InventoryManager.Instance.SpeedBoosterIndex[SelectIndex]);
            //CurrentSpeedBoosterHolder.GetComponent<CanvasGroup>().alpha = 1.0f;
            CurrentSpeedBoosterHolderText.text = "x" + data.boosterValue;
            int boostervalue = int.Parse(data.boosterValue);
            EquipSpeedBooster(boostervalue);
            GlobalFeaturesManager.Instance.SelectSpeedBoosterNft(_itemdetails.Id, _itemdetails.collectionId, boostervalue);

        }
    }
    public void SelectJumpBoosterAsset(int SelectIndex, DataContainer data)
    {
        if (SelectIndex == CurrentSelectedJumpBoosterAsset)
        {
            return;
        }
        else
        {
            CurrentSelectedJumpBoosterAsset = SelectIndex;
            CurrentJumpBoosterHolder.sprite = data.m_sprite;
            EquipedAssets _itemdetails = InventoryManager.Instance.GetEquipedAssetDetails(InventoryManager.Instance.DoubleJumpIndex[SelectIndex]);
            //string _AssetID = InventoryManager.Instance.getAssetIdOfJumpBooster(InventoryManager.Instance.DoubleJumpIndex[SelectIndex]);
            //CurrentJumpBoosterHolder.GetComponent<CanvasGroup>().alpha = 1.0f;
            CurrentJumpBoosterHolderText.text = "x" + data.boosterValue;
            int boostervalue = int.Parse(data.boosterValue);
            EquipJumpBooster(boostervalue);
            GlobalFeaturesManager.Instance.SelectJumpBoosterNft(_itemdetails.Id, _itemdetails.collectionId, boostervalue);
        }
    }
    public void SelectSkinAsset(int SelectIndex, DataContainer data)
    {
        if (SelectIndex == CurrentSelectedSkinAsset)
        {
            return;
        }
        else
        {
            CurrentSelectedSkinAsset = SelectIndex;
            CurrentSkinHolder.sprite = data.m_sprite;
            //CurrentSkinHolder.GetComponent<CanvasGroup>().alpha = 1.0f;
            EquipSkin(data.boosterValue);
        }
    }
    void ClearPlaceHolders()
    {
        CurrentSpeedBoosterHolder.sprite = DefaultHolderSprite;
        CurrentSpeedBoosterHolderText.text = "x0";
        //CurrentSpeedBoosterHolder.GetComponent<CanvasGroup>().alpha = 0.0f;
        CurrentJumpBoosterHolder.sprite = DefaultHolderSprite;
        CurrentJumpBoosterHolderText.text = "x0";
        //CurrentJumpBoosterHolder.GetComponent<CanvasGroup>().alpha = 0.0f;
        CurrentSkinHolder.sprite = DefaultHolderSprite;
        //CurrentSkinHolder.GetComponent<CanvasGroup>().alpha = 0.0f;
    }
    public void EquipSpeedBooster(int BoosterValue = 0)
    {
        PlayerPrefs.SetInt("SpeedBoostersEquipped", BoosterValue);
    }
    public void EquipJumpBooster(int BoosterValue = 0)
    {
        PlayerPrefs.SetInt("JumpBoostersEquipped", BoosterValue);
    }
    public void EquipSkin(string equipvalue = "Default")
    {
        PlayerPrefs.SetString("SkinEquipped", equipvalue);
    }
    void SetDefaultValues()
    {
        PlayerPrefs.SetInt("SpeedBoostersEquipped", 0);
        PlayerPrefs.SetInt("JumpBoostersEquipped", 0);
        PlayerPrefs.SetString("SkinEquipped", "Default");
        GlobalFeaturesManager.Instance.ClearEquippedItemDetails();
    }
}
