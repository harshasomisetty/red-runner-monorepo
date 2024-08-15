using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class UIManager : MonoBehaviour
{
    public static UIManager Instance;

    #region FeatureScreens
    [Header("Detail Panel UI")]
    public GameObject DetailPanel;
    public TextMeshProUGUI attribute;
    public TextMeshProUGUI BoosterName;
    public TextMeshProUGUI Description;
    public Image boosterImage;

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
    int CurrentSelectedFeatureButton = 1;

    [Header("Feature Screen Windows")]
    public GameObject[] FeatureScreenWindows;

    public void OnClickFeatureButton (int i)
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
    [Header ("ShopCategoryButtons")]
    public UnityEngine.UI.Button[] ShopCategoryButtons;
    public Sprite NormalShopCateogyButtonSprite;
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
                if (NormalShopCateogyButtonSprite != null)
                    ShopCategoryButtons[j].GetComponent<Image>().sprite = NormalFeatureButtonSprite;
                else
                    ShopCategoryButtons[j].GetComponent<Image>().sprite = HighlightedShopCategoryButtonSprite;
            }
            ShopCategoryButtons[i].GetComponent<Image>().sprite = HighlightedShopCategoryButtonSprite;
            CloseAllShopVerticals();
            LaunchShopVertical(i);
        }
    }
    void CloseAllShopVerticals ()
    {
        for (int i = 0; i <  ShopVerticalWindows.Length; i++) 
        {
            ShopVerticalWindows[i].SetActive(false);
        }
    }
    void LaunchShopVertical(int i)
    {
        ShopVerticalWindows[i].SetActive(true);
    }
    #endregion
}
