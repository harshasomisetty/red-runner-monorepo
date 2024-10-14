using RedRunner.UI;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class MarketplaceCell : MonoBehaviour
{
    public Image BoosterImage;
    public TextMeshProUGUI Name;
    public TextMeshProUGUI USDC_Price;
    public TextMeshProUGUI UsesLeftText;
    public GameObject UsesLeft;
    public UIButton ShowPanelButton;
    public int DataIndex;


    public void SetValues(int dataIndex, string assetname, int _usdc, string usesLeft, string traitortype, Sprite _boosterImage)
    {
        Name.text = assetname;
        BoosterImage.sprite = _boosterImage;
        DataIndex = dataIndex;
        int priceUSDC = _usdc / 100;
        USDC_Price.text = priceUSDC.ToString();
        if (traitortype == "UsesLeft")
            UsesLeftText.text = usesLeft;
        else
            UsesLeft.SetActive(false);
        ShowPanelButton.onClick.RemoveAllListeners();
        ShowPanelButton.onClick.AddListener(delegate {
            Buy(DataIndex);
        });
    }
    public void Buy(int index)
    {
        MarketPlaceManager.Instance.ShowConfirmPanel(index);
    }
    public void SetButtonText(bool GetValue)
    {
        ShowPanelButton.GetComponentInChildren<TextMeshProUGUI>().text = GetValue ? "Owned" : "Buy";
    }
}
