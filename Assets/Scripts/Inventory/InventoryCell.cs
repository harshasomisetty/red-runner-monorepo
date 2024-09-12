using RedRunner.UI;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class InventoryCell : MonoBehaviour
{

    public Image BoosterImage;
    public TextMeshProUGUI Name;
    public TextMeshProUGUI Owned;
    public TextMeshProUGUI UsesLeftText;
    public GameObject UsesLeft;
    public UIButton ShowPanelButton;
    public int DataIndex;
    public GameObject escrowOverlay;


    public void SetValues(int dataIndex, string assetname, string _usesLeft, string _traitorType, Sprite _boosterImage)
    {
        Name.text = assetname;

        if (escrowOverlay.activeSelf)
            Owned.text = "Listed";
        else
            Owned.text = "Owned";

        if (_traitorType == "UsesLeft")
            UsesLeftText.text = _usesLeft;
        else
            UsesLeft.SetActive(false);

        BoosterImage.sprite = _boosterImage;
        DataIndex = dataIndex;
        ShowPanelButton.onClick.RemoveAllListeners();
        ShowPanelButton.onClick.AddListener(delegate {
            GetDataFromMangertoDisplay(DataIndex);
        });
    }
    public void GetDataFromMangertoDisplay(int index)
    {
        InventoryManager.Instance.ShowDetailsPanel(index);
    }
}
