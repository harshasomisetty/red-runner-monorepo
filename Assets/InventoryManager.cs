using System.Collections.Generic;
using UnityEditor.VersionControl;
using UnityEngine;

public class InventoryManager : MonoBehaviour
{
    public GameObject inventoryCell;
    public Transform cellContainer;
    public List<InventoryCell> cells;
    public GameObject BackButton;
    private void OnEnable()
    {
        API_Manager.instance.GetInvectory(GetInventory_Data);
    }
    private InventoryCell GetCell(int index)
    {
        if (index < cellContainer.childCount)
        {
            return cellContainer.GetChild(index).GetComponent<InventoryCell>();
        }
        else
        {
            return Instantiate(inventoryCell, cellContainer).GetComponent<InventoryCell>();
        }
    }
    public void GetInventory_Data(bool success, InventoryData.Root data)
    {
        if (success)
        {
            Debug.Log("Inventory Data Success");
            if (data.data.Count == cells.Count)
            {
                Debug.Log("Same data as previous");
                return;
            }
            foreach (InventoryCell curcell in cells)
            {
                if (curcell != null)
                {
                    curcell.gameObject.SetActive(false);
                }
            }
            cells.Clear();
            for (int i = 0; i < data.data.Count; i++)
            {
                InventoryCell cell = GetCell(i);
                cell.name = i.ToString();
                cell.SetValues(data.data[i].item, GetInventoryItemImage(data.data[i].item.imageUrl));
                cells.Add(cell);
                cell.gameObject.SetActive(true);
            }
        }
        else
        {
            Debug.Log("Inventory data failed");
        }
    }
    Sprite GetInventoryItemImage(string url)
    {
        Sprite sprit = null;
        API_Manager.instance.DownloadImage(url, (success, sprite) =>
        {
            if (success)
            {
                sprit = sprite;
            }
        });
        return sprit;
    }
}