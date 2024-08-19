using UnityEngine;
using UnityEngine.UI;


public class InGameEquipmentWindow : MonoBehaviour
{
    [Header("In Game Equipment Window")]
    public GameObject InGameEquipmentDialog;

    [Header ("Current Equiped NFT Holders")]
    public Image CurrentSpeedBoosterHolder;
    public Image CurrentJumpBoosterHolder;
    public Image CurrentSkinHolder;

    [Header("Game Equipment Sorting Buttons")]
    public Button[] GameEquipmentOptionButtons;
    public Sprite GameEquipmentOptionHighlighterSprite;
    public Sprite GameEquipmentOptionNormalSprite;

    [Header ("NFTs Content Bar")]
    public Transform EquipmentBar;

    [Header("NFT_Selector_Unit")]
    public GameObject NFT_Selector_Unit_Boosters;
    public GameObject NFT_Selector_Unit_Skins;

    int CurrentSelectedGameEquipmentOption = -1;
    int CurrentSelectedSpeedBoosterAsset = -1;
    int CurrentSelectedJumpBoosterAsset = -1;
    int CurrentSelectedSkinAsset = -1;

    void Start ()
    {
        SetDefaultValues();
    }
    public void ChangeGameEquipmentOption (int selectedGameEquipmentOption)
    {
        if (selectedGameEquipmentOption == CurrentSelectedGameEquipmentOption)
        {
            return;
        }
        else
        {
            CurrentSelectedGameEquipmentOption = selectedGameEquipmentOption;
            HighlightGameEquipmentOptionButton(CurrentSelectedGameEquipmentOption);
            ClearEquipmentBar();
            switch (CurrentSelectedGameEquipmentOption)
            {
                case 0:
                    FetchSpeedBoostersFromInventory();
                    break;
                case 1:
                    FetchJumpBoostersFromInventory();
                    break;
                case 2:
                    FetchSkinsFromInventory();
                    break;
            }
        }
    }
    void HighlightGameEquipmentOptionButton (int i)
    {
        ClearAllHighlightedGameEquipmentOptionButtons();
        GameEquipmentOptionButtons[i].image.sprite = GameEquipmentOptionHighlighterSprite;
    }
    void ClearAllHighlightedGameEquipmentOptionButtons()
    {
        for (int i = 0; i < GameEquipmentOptionButtons.Length; i++)
        {
            if (GameEquipmentOptionNormalSprite == null)
                GameEquipmentOptionButtons[i].image.sprite = null;
            else
                GameEquipmentOptionButtons[i].image.sprite = GameEquipmentOptionNormalSprite;
        }
    }
    void ClearEquipmentBar ()
    {
        for (int i = EquipmentBar.childCount; i > 0; i--)
        {
            Destroy(EquipmentBar.GetChild(i - 1).gameObject);
        }
    }
    void FetchSpeedBoostersFromInventory()
    {
        Debug.Log("FETCHING SPEED BOOSTERS FROM INVENTORY");
        CreateNFT_SelectorUnits(CurrentSelectedGameEquipmentOption);
    }
    void FetchJumpBoostersFromInventory ()
    {
        Debug.Log("FETCHING JUMP BOOSTERS FROM INVENTORY");
        CreateNFT_SelectorUnits(CurrentSelectedGameEquipmentOption);
    }
    void FetchSkinsFromInventory ()
    {
        Debug.Log("FETCHING JUMP BOOSTERS FROM INVENTORY");
        CreateNFT_SelectorUnits(CurrentSelectedGameEquipmentOption);
    }
    public void ToggleInGameEquipmentWindow(bool State )
    {
        if (State)
        {
            SetDefaultSelectedOption();
        }
        else
        {
            CurrentSelectedSpeedBoosterAsset = -1;
            CurrentSelectedJumpBoosterAsset = -1;
            CurrentSelectedSkinAsset = -1;
            PlayerPrefs.SetInt("SpeedBoostersEquipped", 0);
            PlayerPrefs.SetInt("JumpBoostersEquipped", 0);
            ClearPlaceHolders();
        }
        InGameEquipmentDialog.SetActive(State);
    }
    void CreateNFT_SelectorUnits (int Variation)
    {
        switch (Variation)
        {
            case 0:
                Debug.Log("CreateNFT_Units Speed Boosters");

                for (int i = 0;i< InventoryManager.Instance.SpeedBoosterIndex.Count; i++)
                {
                    GameObject temp = Instantiate(NFT_Selector_Unit_Boosters, EquipmentBar) as GameObject;
                    Sprite sprite = InventoryManager.Instance.getspriteofspeedbooster(InventoryManager.Instance.SpeedBoosterIndex[i]);
                    string boostervalue = InventoryManager.Instance.getvalueofspeedbooster(InventoryManager.Instance.SpeedBoosterIndex[i]);
                    temp.GetComponent<BoosterInGame>().PopulateBooster(sprite, boostervalue);
                    int index = i;
                    Debug.Log(" index is : " + index);
                    temp.GetComponent<Button>().onClick.AddListener(delegate {

                        SelectSpeedBoosterAsset(index, sprite, int.Parse(boostervalue));
                    });
                }
                break;
            case 1:
                for (int i = 0; i < InventoryManager.Instance.DoubleJumpIndex.Count; i++)
                {
                    GameObject temp = Instantiate(NFT_Selector_Unit_Boosters, EquipmentBar) as GameObject;
                    Sprite sprite = InventoryManager.Instance.getspriteofdoublejumbbooster(InventoryManager.Instance.DoubleJumpIndex[i]);
                    string boostervalue = InventoryManager.Instance.getvalueofdoublejumbbooster(InventoryManager.Instance.DoubleJumpIndex[i]);
                    temp.GetComponent<BoosterInGame>().PopulateBooster(sprite, boostervalue);
                    int index = i;
                    Debug.Log(" index is : " + index);
                    temp.GetComponent<Button>().onClick.AddListener(delegate {

                        SelectJumpBoosterAsset(index, sprite, int.Parse(boostervalue));
                    });
                }
                Debug.Log("CreateNFT_Units Jump Boosters");
                break;
            case 2:
                for (int i = 0; i < InventoryManager.Instance.SkinsIndex.Count; i++)
                {
                    GameObject temp = Instantiate(NFT_Selector_Unit_Skins, EquipmentBar) as GameObject;
                    Sprite sprite = InventoryManager.Instance.getspriteofskinbooster(InventoryManager.Instance.SkinsIndex[i]);
                    string skinID = InventoryManager.Instance.getskinamebyindex(InventoryManager.Instance.SkinsIndex[i]);
                    temp.GetComponent<BoosterInGame>().PopulateBooster(sprite, "");
                    int index = i;
                    Debug.Log(" index is : " + index);
                    temp.GetComponent<Button>().onClick.AddListener(delegate {

                        SelectSkinAsset(index, sprite, skinID);
                    });
                }
                Debug.Log("CreateNFT_Units  Skins");
                break;
        }
    }
    void SetDefaultSelectedOption()
    {
        ChangeGameEquipmentOption(0);
    }
    public void SelectSpeedBoosterAsset(int SelectIndex, Sprite sprite,int boostervalue)
    {
        Debug.Log("SelectSpeedBoosterAsset : " + SelectIndex);
        if (SelectIndex == CurrentSelectedSpeedBoosterAsset)
        {
            return;
        }
        else
        {
            CurrentSelectedSpeedBoosterAsset = SelectIndex;
            CurrentSpeedBoosterHolder.sprite = sprite;
            EquipSpeedBooster(boostervalue);
        }
    }
    public void SelectJumpBoosterAsset (int SelectIndex, Sprite sprite,int boostervalue)
    {
        Debug.Log("SelectJumpBoosterAsset : " + SelectIndex );
        if (SelectIndex == CurrentSelectedJumpBoosterAsset)
        {
            return;
        }
        else
        {
            CurrentSelectedJumpBoosterAsset = SelectIndex;
            CurrentJumpBoosterHolder.sprite = sprite;
            EquipJumpBooster(boostervalue);
        }
    }
    public void SelectSkinAsset(int SelectIndex, Sprite sprite,string skinid)
    {
        Debug.Log("Selectskin asset : "+SelectIndex);
        if (SelectIndex == CurrentSelectedSkinAsset)
        {
            return;
        }
        else
        {
            CurrentSelectedSkinAsset = SelectIndex;
            CurrentSkinHolder.sprite = sprite;
            EquipSkin(skinid);
        }
    }
    void ClearPlaceHolders()
    {
       CurrentSpeedBoosterHolder.sprite = null;
       CurrentJumpBoosterHolder.sprite = null;
       CurrentSkinHolder.sprite = null;
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
    }
}
