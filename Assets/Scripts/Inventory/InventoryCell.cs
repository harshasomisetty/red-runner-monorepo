using RedRunner.UI;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class InventoryCell : MonoBehaviour
{

    public Image BoosterImage;
    public TextMeshProUGUI Name;
    public UIButton ShowPanelButton;
    public int DataIndex;
    public int pageNumber;


    public void SetValues(DataIndex dataIndex,string assetname, Sprite _boosterImage)
    {
        Name.text = assetname;
        //if (_boosterImage == null)
        //{
        //    BoosterImage.enabled = false;
        //}
        BoosterImage.sprite = _boosterImage;
        DataIndex = dataIndex.boosterindex;
        pageNumber = dataIndex.pageNumber;
        ShowPanelButton.onClick.RemoveAllListeners();
        ShowPanelButton.onClick.AddListener(delegate {
            GetDataFromMangertoDisplay(DataIndex, pageNumber);
        });
    }
    public void GetDataFromMangertoDisplay(int index,int _pageNumber)
    {
        InventoryManager.Instance.ShowDetailsPanel(index, _pageNumber);
    }
}
