using RedRunner.UI;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class InventoryCell : MonoBehaviour
{

    public Image BoosterImage;
    public TextMeshProUGUI Name;
    public TextMeshProUGUI Owned;
    public UIButton ShowPanelButton;
    public int DataIndex;
    public GameObject escrowOverlay;


    public void SetValues(int dataIndex, string assetname, Sprite _boosterImage)
    {
        Name.text = assetname;
        if (escrowOverlay.activeSelf)
            Owned.text = "Listed";
        else
            Owned.text = "Owned";
        //if (_boosterImage == null)
        //{
        //    BoosterImage.enabled = false;
        //}
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
