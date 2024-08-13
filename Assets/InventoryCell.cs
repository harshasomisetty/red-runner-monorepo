using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class InventoryCell : MonoBehaviour
{

    public Image BoosterImage;
    public TextMeshProUGUI Name;
    public TextMeshProUGUI Description;
    public TextMeshProUGUI Type;
    public TextMeshProUGUI Price;
    public void SetValues(InventoryData.Item items, Sprite _boosterImage)
    {
        Name.text = items.name;
        Description.text = items.description;
        Type.text=items.collection.name;
        BoosterImage.sprite = _boosterImage;
    }
}
