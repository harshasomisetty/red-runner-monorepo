using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class InventoryCell : MonoBehaviour
{

    public Image BoosterImage;
    public TextMeshProUGUI Name;
    public Button ShowPanelButton;
    public int DataIndex;


    public void SetValues(int dataIndex,string assetname, Sprite _boosterImage)
    {
        Name.text = assetname;
        if (_boosterImage == null)
        {
            BoosterImage.enabled = false;
        }
        BoosterImage.sprite = _boosterImage;
        DataIndex = dataIndex;
        ShowPanelButton.onClick.RemoveAllListeners();
        ShowPanelButton.onClick.AddListener(delegate {
            GetDataFromMangertoDisplay(dataIndex);
        });
    }
    public void GetDataFromMangertoDisplay(int index)
    {
        InventoryManager.Instance.ShowDetailsPanel(index);
    }
}
