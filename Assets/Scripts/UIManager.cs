using UnityEngine;
using UnityEngine.UI;
using TMPro;
using RedRunner.UI;


public class UIManager : MonoBehaviour
{
    public static UIManager Instance;
    private void Awake()
    {
        Instance = this;
    }
    #region MainScreen
    [Header("Main Screen")]
    public GameObject MainScreen;
    public void ToggleMainScreen(bool State)
    {
        MainScreen.SetActive(State);
    }
    #endregion
    #region FeatureScreens
    [Header("Features Screen")]
    public GameObject FeatureScreenBackButton;
    public GameObject FeaturesScreen;
    public GameObject FailureScreen;
    public TextMeshProUGUI FailureScreenText;
    public void ToggleFeaturesScreen(bool State)
    {
        FeaturesScreen.SetActive(State);
        ToggleMainScreen(!State);
        if (State)
        {
            GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Loading Shop Data!", false);
            ShopManager.Instance.FetchShopData();
        }
        else
        {
            CurrentSelectedFeatureButton = -1;
            CurrentSelectedInventoryVertical = -1;
            CurrentSelectedShopVertical = -1;
            FailureScreenText.text = "";
            FailureScreen.SetActive(false);
            for (int i = 0; i < FeatureScreenButtons.Length; i++)
            {
                FeatureScreenButtons[i].gameObject.SetActive(false);
                FeatureScreenButtons[i].GetComponent<Canvas>().overrideSorting = false;
            }
            for (int i = 0; i < FeatureScreenWindows.Length; i++)
            {
                FeatureScreenWindows[i].SetActive(false);
            }
            ShopHeaderBar.SetActive(false);
            FeatureScreenBackButton.SetActive(false);
        }
    }
    [Header("Feature Screen Buttons")]
    public UIButton[] FeatureScreenButtons;
    public Sprite NormalFeatureButtonSprite;
    public Sprite HighlightedFeatureButtonSprite;
    int CurrentSelectedFeatureButton = -1;
    [Header("Feature Screen Windows")]
    public GameObject[] FeatureScreenWindows;
    public void OnClickFeatureButton(int i)
    {
        if (i == CurrentSelectedFeatureButton)
        {
            return;
        }
        else
        {
            ResetTrackingVariables();

            bool LoadInventoryFromOtherFeature = false;
            bool LoadShopFromOtherFeature = false;

            if (CurrentSelectedFeatureButton != 0 && i == 0)
            {
                LoadShopFromOtherFeature = true;
            }
            else if (CurrentSelectedFeatureButton != 1 && i == 1)
            {
                LoadInventoryFromOtherFeature = true;
            }
        
            CurrentSelectedFeatureButton = i;

            for (int j = 0; j < FeatureScreenButtons.Length; j++)
            {
                if(j==i)
                {
                    FeatureScreenButtons[i].GetComponent<Image>().sprite = HighlightedFeatureButtonSprite;
                    FeatureScreenButtons[i].GetComponentInChildren<TextMeshProUGUI>().fontSize = 40;
                    Canvas canvas = FeatureScreenButtons[i].GetComponent<Canvas>();
                    canvas.overrideSorting = true;
                    canvas.enabled = false; 
                    canvas.enabled = true;
                    FeatureScreenButtons[i].GetComponent<Image>().SetNativeSize();
                }
                else 
                {
                    FeatureScreenButtons[j].GetComponent<Image>().sprite = NormalFeatureButtonSprite;
                    FeatureScreenButtons[j].GetComponentInChildren<TextMeshProUGUI>().fontSize = 30;
                    Canvas canvas = FeatureScreenButtons[j].GetComponent<Canvas>();
                    canvas.overrideSorting = false;
                    canvas.enabled = false;  
                    canvas.enabled = true;
                    if (NormalFeatureButtonSprite != null)
                        FeatureScreenButtons[j].GetComponent<Image>().SetNativeSize();
                }
            }

            

            CloseAllFeatureWindows();

            if (LoadInventoryFromOtherFeature)
            {
                FeatureScreenBackButton.SetActive(false);
                ToggleInventory(true);
            }
            else if (LoadShopFromOtherFeature)
            {
                GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Loading Shop Data!", false);
                ShopManager.Instance.FetchShopData();
                LaunchFeatureWindow(i);
            }
            else
            {
                LaunchFeatureWindow(i);
            }
        }
    }
    void ResetTrackingVariables()
    {
        CloseAllInventoryVerticals();
        CloseAllShopVerticals();
        InventoryHeaderBar.SetActive(false);
        ShopHeaderBar.SetActive(false);
        ToggleInventory(false);
        CurrentSelectedInventoryVertical = -1;
        CurrentSelectedShopVertical = -1;
    }
    void CloseAllFeatureWindows()
    {
        for (int i = 0; i < FeatureScreenWindows.Length; i++)
        {
            FeatureScreenWindows[i].SetActive(false);
        }
    }
    void LaunchFeatureWindow(int i)
    {
        FeatureScreenWindows[i].SetActive(true);
    }
    public void SelectDefaultFeatureWindowOption()
    {
        GlobalCanvasManager.Instance.LoadingPanel.HidePopup();
        OnClickFeatureButton(0);
        OnClickShopVerticalButton(0);
        for (int i = 0; i < FeatureScreenButtons.Length; i++)
        {
            FeatureScreenButtons[i].gameObject.SetActive(true);
        }
        ShopHeaderBar.SetActive(true);
        FeatureScreenBackButton.SetActive(true);
    }
    public void ActivateFailureScreen(string Key)
    {
        switch (Key)
        {
            case "Shop":
                FailureScreenText.text = "Failed To Load Shop Data!";
                break;
            case "Inventory":
                FailureScreenText.text = "Failed To Load Inventory Data!";
                break;
        }
        GlobalCanvasManager.Instance.LoadingPanel.HidePopup();
        FailureScreen.SetActive(true);
        FeatureScreenBackButton.SetActive(true);
    }
    #endregion
    #region ShopVerticals
    public GameObject ShopHeaderBar;
    [Header("ShopCategoryButtons")]
    public Button[] ShopCategoryButtons;
    public Sprite NormalShopCategoryButtonSprite;
    public Sprite HighlightedShopCategoryButtonSprite;
    int CurrentSelectedShopVertical = 1;
    [Header("Shop Vertical Windows")]
    public GameObject[] ShopVerticalWindows;
    public void OnClickShopVerticalButton(int i)
    {
        if (i == CurrentSelectedShopVertical)
        {
            return;
        }
        else
        {
            CurrentSelectedShopVertical = i;
            for (int j = 0; j < ShopCategoryButtons.Length; j++)
            {
                if (NormalShopCategoryButtonSprite != null)
                {
                    ShopCategoryButtons[j].GetComponent<Image>().sprite = NormalShopCategoryButtonSprite;
                    ShopCategoryButtons[j].GetComponent<Image>().SetNativeSize();
                    //ShopCategoryButtons[j].GetComponent<RectTransform>().sizeDelta = new Vector2(370 / 1.2f, 97 / 1.2f);
                    ShopCategoryButtons[j].GetComponentInChildren<TextMeshProUGUI>().fontSize = 30;
                }
                else
                {
                    ShopCategoryButtons[j].GetComponent<Image>().sprite = null;
                }
            }
            ShopCategoryButtons[i].GetComponent<Image>().sprite = HighlightedShopCategoryButtonSprite;
            ShopCategoryButtons[i].GetComponent<Image>().SetNativeSize();
            //ShopCategoryButtons[i].GetComponent<RectTransform>().sizeDelta = new Vector2(370 / 1.02f, 97 / 1.02f);
            ShopCategoryButtons[i].GetComponentInChildren<TextMeshProUGUI>().fontSize = 40;

            CloseAllShopVerticals();
            LaunchShopVertical(i);
        }
    }
    void CloseAllShopVerticals()
    {
        for (int i = 0; i < ShopVerticalWindows.Length; i++)
        {
            ShopVerticalWindows[i].SetActive(false);
        }
    }
    void LaunchShopVertical(int i)
    {
        ShopVerticalWindows[i].SetActive(true);
    }
    #endregion
    #region InventoryVerticals
    public GameObject InventoryHeaderBar;
    [Header("Inventory Category Windows")]
    public UIButton[] InventoryCategoryButtons;
    public Sprite NormalInventoryCategoryButtonSprite;
    public Sprite HighlightedInventoryCategoryButtonSprite;
    int CurrentSelectedInventoryVertical = 1;
    [Header("Inventory Vertical Windows")]
    public GameObject[] InventoryVerticalWindows;

    public void ToggleInventory(bool State)
    {
        if (State)
        {
            GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Loading Inventory Data!",false);
            InventoryManager.Instance.FetchInventoryData(false);
        }
    }
    public void LaunchInventory()
    {
        GlobalCanvasManager.Instance.LoadingPanel.HidePopup();
        InventoryHeaderBar.SetActive(true);
        LaunchFeatureWindow(1);
        OnClickInventoryVerticalButton(1);
        FeatureScreenBackButton.SetActive(true);
    }
    public void SignalInventoryFailure()
    {
        GlobalCanvasManager.Instance.LoadingPanel.HidePopup();
        FailureScreenText.text = "Failed To Load Inventory Data!";
        FailureScreen.SetActive(true);
        FeatureScreenBackButton.SetActive(true);
    }
    public void OnClickInventoryVerticalButton(int i)
    {
        if (i == CurrentSelectedInventoryVertical)
        {
            return;
        }
        else
        {
            CurrentSelectedInventoryVertical = i;
            for (int j = 0; j < InventoryCategoryButtons.Length; j++)
            {
                if (NormalInventoryCategoryButtonSprite != null)
                {
                    InventoryCategoryButtons[j].GetComponent<Image>().sprite = NormalInventoryCategoryButtonSprite;
                    InventoryCategoryButtons[j].GetComponent<Image>().SetNativeSize();
                    //InventoryCategoryButtons[j].GetComponent<RectTransform>().sizeDelta = new Vector2(370 / 1.2f, 97 / 1.2f);
                    InventoryCategoryButtons[j].GetComponentInChildren<TextMeshProUGUI>().fontSize = 30;
                }
                else
                {
                    InventoryCategoryButtons[j].GetComponent<Image>().sprite = null;

                }
            }
            InventoryCategoryButtons[i].GetComponent<Image>().sprite = HighlightedInventoryCategoryButtonSprite;
            InventoryCategoryButtons[i].GetComponent<Image>().SetNativeSize();
            //InventoryCategoryButtons[i].GetComponent<RectTransform>().sizeDelta = new Vector2(370 / 1.02f, 97 / 1.02f);
            InventoryCategoryButtons[i].GetComponentInChildren<TextMeshProUGUI>().fontSize = 40;
            CloseAllInventoryVerticals();
            LaunchInventoryVertical(i);
        }
    }
    void CloseAllInventoryVerticals()
    {
        for (int i = 0; i < InventoryVerticalWindows.Length; i++)
        {
            InventoryVerticalWindows[i].SetActive(false);
        }
    }
    void LaunchInventoryVertical(int i)
    {
        InventoryVerticalWindows[i].SetActive(true);
    }
    #endregion
    #region GameEquipmentWindow

    [Header("Game Equipment")]
    public GameObject GameEquipmentFeatures;
    public GameObject GameEquipmentBackButton;
    
    public void ToggleGameEquipmentFeatures(bool State)
    {
        GameEquipmentFeatures.SetActive(State);
    }
    
    #endregion
    #region Minting
    [Header ("Minting")]
    public GameObject MintingDialogPanel;
    public TextMeshProUGUI MintingStatusText;
    public GameObject MintingPanelSuccessCloseButton;
    public GameObject MintingPanelFailureCloseButton;

    public void ToggleMintingDialog(bool State)
    {
        MintingDialogPanel.SetActive(State);
    }
    public void SetMintingStatusText(string Msg)
    {
        MintingStatusText.text = Msg;
    }
    public void ToggleMintingPanelCloseButton(bool State, bool Failure)
    {
        if (State == false)
        {
            MintingPanelSuccessCloseButton.SetActive(State);
            MintingPanelFailureCloseButton.SetActive(State);
        }
        else
        {
            if (Failure)
            {
                MintingPanelFailureCloseButton.SetActive(State);
            }
            else
            {
                MintingPanelSuccessCloseButton.SetActive(State);
            }
        }
    }
    public void CloseMintingPanelWithDetails()
    {
        ToggleMintingDialog(false);
    }
    public void CloseMintingPanelKeepDetails()
    {
        ShopManager.Instance.ReactivateDetailPanel();
        ToggleMintingDialog(false);
    }
    #endregion


}