using UnityEngine;
using UnityEngine.UI;


public class UIManager : MonoBehaviour
{
    public static UIManager Instance;
    #region FeatureScreens
    [Header("Features Screen")]
    public GameObject FeaturesScreen;
    public void ToggleFeaturesScreen(bool State)
    {
        FeaturesScreen.SetActive(State);
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
            LaunchFeatureWindow(i);
        }
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
    #endregion
    #region ShopVerticals
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
    [Header("Inventory Category Windows")]
    public UnityEngine.UI.Button[] InventoryCategoryButtons;
    public Sprite NormalInventoryCategoryButtonSprite;
    public Sprite HighlightedInventoryCategoryButtonSprite;
    int CurrentSelectedInventoryVertical = 1;
    [Header("Inventory Vertical Windows")]
    public GameObject[] InventoryVerticalWindows;
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