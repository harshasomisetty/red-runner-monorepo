using UnityEngine;
using UnityEngine.UI;
using TMPro;
using RedRunner.UI;
using UnityEngine.Events;


public class UIManager : MonoBehaviour
{

    public Sprite NormalButtonSprite;
    public Sprite HighlightedButtonSprite;

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
            ResetParentButtons();
            GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Loading Shop Data!", false);
            ShopManager.Instance.FetchShopData();
        }
        else
        {
            CurrentSelectedFeatureButton = -1;
            CurrentSelectedInventoryVertical = -1;
            CurrentSelectedShopVertical = -1;
            ResetTrackingVariables();
            FailureScreenText.text = "";
            FailureScreen.SetActive(false);
            ResetParentButtons();
            for (int i = 0; i < FeatureScreenWindows.Length; i++)
            {
                FeatureScreenWindows[i].SetActive(false);
            }
            ShopHeaderBar.SetActive(false);
            FeatureScreenBackButton.SetActive(false);
        }
    }
    void ResetParentButtons()
    {
        for (int i = 0; i < FeatureScreenButtons.Length; i++)
        {
            FeatureScreenButtons[i].gameObject.SetActive(true);
            Canvas _Canvas = FeatureScreenButtons[i].GetComponent<Canvas>();
            _Canvas.overrideSorting = false;
            _Canvas.enabled = false;
            _Canvas.enabled = true;
            FeatureScreenButtons[i].gameObject.SetActive(false);
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
            bool LoadMarketPlaceFromOtherFeature = false;

            if (CurrentSelectedFeatureButton != 0 && i == 0)
            {
                LoadShopFromOtherFeature = true;
            }
            else if (CurrentSelectedFeatureButton != 1 && i == 1)
            {
                LoadInventoryFromOtherFeature = true;
            }
            else if (CurrentSelectedFeatureButton != 2 && i == 2)
            {
                LoadMarketPlaceFromOtherFeature = true;
            }

            CurrentSelectedFeatureButton = i;
            for (int j = 0; j < FeatureScreenButtons.Length; j++)
            {
                bool state = FeatureScreenButtons[i].gameObject.activeSelf;
                FeatureScreenButtons[i].gameObject.SetActive(true);
                if (j==i)
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
                FeatureScreenButtons[i].gameObject.SetActive(state);
            }
            InventoryManager.Instance.paginationController.SetPagesOff();
            

            CloseAllFeatureWindows();

            if (LoadInventoryFromOtherFeature)
            {
                FeatureScreenBackButton.SetActive(false);
                ToggleInventory(true);
            }
            else if (LoadShopFromOtherFeature)
            {
                InventoryManager.Instance.paginationController.SetPagesOff();
                GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Loading Shop Data!", false);
                ShopManager.Instance.FetchShopData();
                LaunchFeatureWindow(i);
            }
            else if (LoadMarketPlaceFromOtherFeature)
            {
                //GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Loading Marketplace  Data!", false);
                ToggleMarketplace(true);
            }
            else
            {
                LaunchFeatureWindow(i);
            }
        }
    }
    void ResetTrackingVariables()
    {
        InventoryManager.Instance.paginationController.SetPagesOff();
        CloseAllInventoryVerticals();
        CloseAllShopVerticals();
        CloseAllMarketplaceVerticals();
        InventoryHeaderBar.SetActive(false);
        ShopHeaderBar.SetActive(false);
        MarketplaceHeaderBar.SetActive(false);
        ToggleInventory(false);
        ToggleMarketplace(false);
        CurrentSelectedInventoryVertical = -1;
        CurrentSelectedShopVertical = -1;
        CurrentSelectedMarketplaceVertical = -1;
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
            case "Marketplace":
                FailureScreenText.text = "Failed To Load Marketplace Data!";
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
    public UIButton[] ShopCategoryButtons;
    int CurrentSelectedShopVertical = -1;
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
            UpdateButtonAppearance(ShopCategoryButtons, CurrentSelectedShopVertical, 45, 35);
            //for (int j = 0; j < ShopCategoryButtons.Length; j++)
            //{
            //    if (NormalButtonSprite != null)
            //    {
            //        ShopCategoryButtons[j].GetComponent<Image>().sprite = NormalButtonSprite;
            //        ShopCategoryButtons[j].GetComponent<Image>().SetNativeSize();
            //        ShopCategoryButtons[j].GetComponentInChildren<TextMeshProUGUI>().fontSize = 30;
            //    }
            //    else
            //    {
            //        ShopCategoryButtons[j].GetComponent<Image>().sprite = null;
            //    }
            //}
            //ShopCategoryButtons[i].GetComponent<Image>().sprite = HighlightedButtonSprite;
            //ShopCategoryButtons[i].GetComponent<Image>().SetNativeSize();
            //ShopCategoryButtons[i].GetComponentInChildren<TextMeshProUGUI>().fontSize = 40;

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
    int CurrentSelectedInventoryVertical = -1;
    [Header("Inventory Vertical Windows")]
    public GameObject[] InventoryVerticalWindows;

    public void ToggleInventory(bool State)
    {
        if (State)
        {
            //GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Loading Inventory Data!",false);
            //InventoryManager.Instance.FetchInventoryData(StaticDataBank.GetCollectionId(0));
            _sequenceCall = false;
            OnClickInventoryVerticalButton(0);
            LaunchInventory();
        }
    }
    public bool _sequenceCall = false;
    public void LaunchInventory()
    {
        if (!_sequenceCall)
        {
            GlobalCanvasManager.Instance.LoadingPanel.HidePopup();
            InventoryHeaderBar.SetActive(true);
            LaunchFeatureWindow(1);
            //OnClickInventoryVerticalButton(CurrentSelectedInventoryVertical);
            FeatureScreenBackButton.SetActive(true);
        }
        else
        {
            InGameEquipmentWindow.Instance.SetDefaultSelectedOption();
            ToggleGameEquipmentFeatures(true);
            GameEquipmentBackButton.SetActive(true);
            GlobalCanvasManager.Instance.LoadingPanel.HidePopup();

            Debug.Log("Sequence Success");
        }
        
    }
    public void SignalInventoryFailure()
    {
        if (!_sequenceCall)
        {
            Debug.Log("Inventory data failed");
            GlobalCanvasManager.Instance.LoadingPanel.HidePopup();
            FailureScreenText.text = "Failed To Load Inventory Data!";
            FailureScreen.SetActive(true);
            FeatureScreenBackButton.SetActive(true);
        }
        else
        {
            PlayerPrefs.SetInt("OfflineMode", 1);
            GameEquipmentBackButton.SetActive(true);
            Debug.Log("Sequence Failure");
        }
        
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
            UpdateButtonAppearance(InventoryCategoryButtons, CurrentSelectedInventoryVertical, 45, 35, delegate {
                _sequenceCall = false;
                GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Loading Inventory Data!", false);
                InventoryManager.Instance.FetchInventoryData(StaticDataBank.GetCollectionId(i));
            });
            //for (int j = 0; j < InventoryCategoryButtons.Length; j++)
            //{
            //    if (j == i) 
            //    {
            //        InventoryCategoryButtons[i].GetComponent<Image>().sprite = HighlightedButtonSprite;
            //        InventoryCategoryButtons[i].GetComponent<Image>().SetNativeSize();
            //        InventoryCategoryButtons[i].GetComponentInChildren<TextMeshProUGUI>().fontSize = 40;
                    
            //    }
            //    else if (NormalButtonSprite != null)
            //    {
            //        InventoryCategoryButtons[j].GetComponent<Image>().sprite = NormalButtonSprite;
            //        InventoryCategoryButtons[j].GetComponent<Image>().SetNativeSize();
            //        InventoryCategoryButtons[j].GetComponentInChildren<TextMeshProUGUI>().fontSize = 30;
            //    }
            //    else
            //    {
            //        InventoryCategoryButtons[j].GetComponent<Image>().sprite = null;

            //    }
            //}
            
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




    #region Marketplace
    [Space(40)]
    public GameObject MarketplaceHeaderBar;
    [Header("Inventory Category Windows")]
    public UIButton[] MarketplaceCategoryButtons;
    int CurrentSelectedMarketplaceVertical = -1;
    [Header("Inventory Vertical Windows")]
    public GameObject[] MarketplaceVerticalWindows;



    public void ToggleMarketplace(bool State)
    {
        if (State)
        {
            //GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Loading Marketplace Data!", false);
            //MarketPlaceManager.Instance.FetchMarketPlaceData(StaticDataBank.GetCollectionId(0));
            OnClickMarketplaceVerticalButton(0);
            LaunchMarketplace();
        }
    }
    public void LaunchMarketplace()
    {
        GlobalCanvasManager.Instance.LoadingPanel.HidePopup();
        MarketplaceHeaderBar.SetActive(true);
        LaunchFeatureWindow(2);
        //OnClickMarketplaceVerticalButton(CurrentSelectedMarketplaceVertical);
        FeatureScreenBackButton.SetActive(true);
    }
    public void SignalMarketplaceFailure()
    {
        GlobalCanvasManager.Instance.LoadingPanel.HidePopup();
        FailureScreenText.text = "Failed To Load Marketplace Data!";
        FailureScreen.SetActive(true);
        FeatureScreenBackButton.SetActive(true);
    }
    public void OnClickMarketplaceVerticalButton(int i)
    {
        if (i == CurrentSelectedMarketplaceVertical)
        {
            return;
        }
        else
        {
            CurrentSelectedMarketplaceVertical = i;
            UpdateButtonAppearance(MarketplaceCategoryButtons, CurrentSelectedMarketplaceVertical, 45, 35, delegate {
                GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Loading Marketplace Data!", false);
                MarketPlaceManager.Instance.FetchMarketPlaceData(StaticDataBank.GetCollectionId(CurrentSelectedMarketplaceVertical));
            });

            CloseAllMarketplaceVerticals();
            LaunchMarketplaceVertical(i);
        }
    }
    void CloseAllMarketplaceVerticals()
    {
        for (int i = 0; i < MarketplaceVerticalWindows.Length; i++)
        {
            MarketplaceVerticalWindows[i].SetActive(false);
        }
    }
    void LaunchMarketplaceVertical(int i)
    {
        MarketplaceVerticalWindows[i].SetActive(true);
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

    private void UpdateButtonAppearance(UIButton[] buttons, int selectedIndex, int highlightedFontSize, int normalFontSize, UnityAction call = null)
    {
        for (int i = 0; i < buttons.Length; i++)
        {
            var button = buttons[i].GetComponent<Image>();
            var text = buttons[i].GetComponentInChildren<TextMeshProUGUI>();

            if (i == selectedIndex)
            {
                button.sprite = HighlightedButtonSprite;
                text.fontSize = highlightedFontSize;
                call?.Invoke();
            }
            else
            {
                button.sprite = NormalButtonSprite;
                text.fontSize = normalFontSize;
            }

            button.SetNativeSize();
        }
    }

    private void ResetButtons(UIButton[] buttons, Sprite sprite, int fontSize)
    {
        foreach (var button in buttons)
        {
            var image = button.GetComponent<Image>();
            var text = button.GetComponentInChildren<TextMeshProUGUI>();

            image.sprite = sprite;
            text.fontSize = fontSize;
            image.SetNativeSize();
        }
    }


}