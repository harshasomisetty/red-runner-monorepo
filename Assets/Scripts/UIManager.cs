using UnityEngine;
using UnityEngine.UI;
using TMPro;


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
    public GameObject LoadingScreen;
    public GameObject FailureScreen;
    public TextMeshProUGUI LoadingScreenText;
    public TextMeshProUGUI FailureScreenText;
    public void ToggleFeaturesScreen(bool State)
    {
        FeaturesScreen.SetActive(State);
        ToggleMainScreen(!State);
        if (State)
        {
            LoadingScreen.SetActive(true);
            LoadingScreenText.text = "Loading Shop Data!";
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
    public UnityEngine.UI.Button[] FeatureScreenButtons;
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
                if (NormalFeatureButtonSprite != null)
                    FeatureScreenButtons[j].GetComponent<Image>().sprite = NormalFeatureButtonSprite;
                else
                    FeatureScreenButtons[j].GetComponent<Image>().sprite = NormalFeatureButtonSprite;
            }

            FeatureScreenButtons[i].GetComponent<Image>().sprite = HighlightedFeatureButtonSprite;

            CloseAllFeatureWindows();

            if (LoadInventoryFromOtherFeature)
            {
                FeatureScreenBackButton.SetActive(false);
                ToggleInventory(true);
            }
            else if (LoadShopFromOtherFeature)
            {
                LoadingScreen.SetActive(true);
                LoadingScreenText.text = "Loading Shop Data!";
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
        LoadingScreen.SetActive(false);
        LoadingScreenText.text = "";
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
        LoadingScreenText.text = "";
        LoadingScreen.SetActive(false);
        FailureScreen.SetActive(true);
        FeatureScreenBackButton.SetActive(true);
    }
    #endregion
    #region ShopVerticals
    public GameObject ShopHeaderBar;
    [Header("ShopCategoryButtons")]
    public UnityEngine.UI.Button[] ShopCategoryButtons;
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
                    ShopCategoryButtons[j].GetComponent<Image>().sprite = NormalShopCategoryButtonSprite;
                else
                    ShopCategoryButtons[j].GetComponent<Image>().sprite = null;
            }
            ShopCategoryButtons[i].GetComponent<Image>().sprite = HighlightedShopCategoryButtonSprite;
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
    public UnityEngine.UI.Button[] InventoryCategoryButtons;
    public Sprite NormalInventoryCategoryButtonSprite;
    public Sprite HighlightedInventoryCategoryButtonSprite;
    int CurrentSelectedInventoryVertical = 1;
    [Header("Inventory Vertical Windows")]
    public GameObject[] InventoryVerticalWindows;

    public void ToggleInventory(bool State)
    {
        if (State)
        {
            LoadingScreenText.text = "Loading Inventory Data!";
            LoadingScreen.SetActive(true);
            InventoryManager.Instance.FetchInventoryData();
        }
        //else
        //{
        //    InventoryManager.Instance.OnResetInventory();
        //}
    }
    public void LaunchInventory()
    {
        LoadingScreenText.text = "";
        LoadingScreen.SetActive(false);
        InventoryHeaderBar.SetActive(true);
        LaunchFeatureWindow(1);
        OnClickInventoryVerticalButton(0);
        FeatureScreenBackButton.SetActive(true);
    }
    public void SignalInventoryFailure()
    {
        LoadingScreenText.text = "";
        LoadingScreen.SetActive(false);
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
                    InventoryCategoryButtons[j].GetComponent<Image>().sprite = NormalInventoryCategoryButtonSprite;
                else
                    InventoryCategoryButtons[j].GetComponent<Image>().sprite = null;
            }
            InventoryCategoryButtons[i].GetComponent<Image>().sprite = HighlightedInventoryCategoryButtonSprite;
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

}