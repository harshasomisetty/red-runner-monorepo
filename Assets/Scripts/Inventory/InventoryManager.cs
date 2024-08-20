using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class InventoryManager : MonoBehaviour
{
    public static InventoryManager Instance;


    public GameObject inventoryCellBosster, inventoryCellSkin;
    public Transform speedContainer;
    public Transform doubleJumpContainer;
    public Transform skinsContainer;
    public Transform currencyContainer;
    public List<InventoryCell> cells;
    public List<int> SpeedBoosterIndex;
    public List<int> DoubleJumpIndex;
    public List<int> SkinsIndex;
    public List<int> Currencies;
    public GameObject BackButton;

    [Header("Detail Panel UI")]
    public GameObject DetailPanel;
    public TextMeshProUGUI attribute;
    public TextMeshProUGUI BoosterName;
    public TextMeshProUGUI Description;
    public Image boosterImage;
    public Button MarketPlace;


    public List<InventoryData.Root> m_data;

    int current_page = 1;
    public Dictionary<string, Sprite> spriteDictionary = new Dictionary<string, Sprite>();

    private void Awake()
    {
        if(Instance == null)
        {
            Instance = this;
        }
    }
    private void OnEnable()
    {
        ClearDataToUpdate();
        CheckInventoryDataForMultiplePages();
    }
    private void OnDisable()
    {
        dataFetchCompleted = false;
        current_page = 1;
    }
    public void ClearDataToUpdate()
    {
        foreach (InventoryCell curcell in cells)
        {
            if (curcell != null)
            {
                curcell.gameObject.SetActive(false);
            }
        }
        SpeedBoosterIndex.Clear();
        DoubleJumpIndex.Clear();
        SkinsIndex.Clear();
        Currencies.Clear();
        cells.Clear();
        m_data.Clear();
    }
    bool dataFetchCompleted = false;
    public void CheckInventoryDataForMultiplePages()
    {
        if (m_data.Count == 0 ||m_data[0].meta.totalPages >= current_page)
        {
            API_Manager.instance.GetInvectory(Get_InventoryData, current_page++);
        }
        else
        {
            dataFetchCompleted = true;
            GetInventory_Data(dataFetchCompleted, m_data[0]);
        }
    }
    public void Get_InventoryData(bool success, InventoryData.Root data)
    {
        if (success)
        {
            Debug.Log("Number of Call Backs");
            m_data.Add(data);
            CheckInventoryDataForMultiplePages();
        }
    }
    private InventoryCell GetCell(int index,Transform cellContainer,GameObject inventoryCell)
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
            
            for (int i = 0; i < data.data.Count; i++)
            {
                InventoryCell cell = null;
                if (data.data[i].type.Contains("UniqueAsset"))
                {
                    if (data.data[i].item.collection.id == "0dfe473e-bbb7-453f-8d3f-ba9af79dfc14")
                    {
                        SpeedBoosterIndex.Add(i);
                        cell = GetCell(SpeedBoosterIndex.Count - 1, speedContainer,inventoryCellBosster);
                    }
                    else if(data.data[i].item.collection.id == "0b9d2116-b3a2-4452-affb-03282313ab77")
                    {
                        DoubleJumpIndex.Add(i);
                        cell = GetCell(DoubleJumpIndex.Count - 1, doubleJumpContainer, inventoryCellBosster);
                    }
                    else if (data.data[i].item.collection.id == "36399a18-941c-4c18-bb0d-8cc2aaaa8b06")
                    {
                        SkinsIndex.Add(i);
                        cell = GetCell(SkinsIndex.Count - 1, skinsContainer, inventoryCellSkin);
                    }
                    cell.name = data.data[i].item.name;
                }
                else if (data.data[i].type.Contains("Currency"))
                {
                    Currencies.Add(i);
                    cell = GetCell(Currencies.Count - 1, currencyContainer, inventoryCellBosster);
                }
                string dataSetName = data.data[i].item.name;
                cell.name = dataSetName;
                cells.Add(cell);
                cell.gameObject.SetActive(true);
                GetInventoryItemImage(data.data[i].item.imageUrl, dataSetName, cell, i);
            }
        }
        else
        {
            Debug.Log("Inventory data failed");
        }
    }
    void GetInventoryItemImage(string url, string datasetname, InventoryCell cell, int index)
    {
        if (string.IsNullOrEmpty(url) || string.IsNullOrWhiteSpace(url))
        {
            cell.SetValues(index, datasetname, null);
            return;
        }
        API_Manager.instance.DownloadImage(url, (success, sprite) =>
        {
            if (success)
            {
                Sprite m_sprite = sprite;
                if (spriteDictionary.ContainsKey(datasetname))
                {
                    spriteDictionary[datasetname] = m_sprite;
                }
                else
                {
                    spriteDictionary.Add(datasetname, m_sprite);
                }
            }
            cell.SetValues(index, datasetname, spriteDictionary[datasetname]);
        });
    }
    public void ShowDetailsPanel(int dataindex)
    {
        Description.text = m_data[0].data[dataindex].item.description;
        BoosterName.text = m_data[0].data[dataindex].item.name;
        Debug.Log(m_data[0].data[dataindex].item.status);
        if (spriteDictionary.ContainsKey(m_data[0].data[dataindex].item.name))
        {
            boosterImage.sprite = spriteDictionary[m_data[0].data[dataindex].item.name];
            boosterImage.SetNativeSize();
        }
        DetailPanel.SetActive(true);
    }

    public string getvalueofspeedbooster(int getvalue)
    {
        return m_data[0].data[getvalue].item.attributes[0].value;
    }
    public Sprite getspriteofspeedbooster(int getvalue)
    {
        Sprite sprite = spriteDictionary[m_data[0].data[getvalue].item.name];
        return sprite;
    }
    public string getvalueofdoublejumbbooster(int getvalue)
    {
        return m_data[0].data[getvalue].item.attributes[0].value;
    }
    public Sprite getspriteofdoublejumbbooster(int getvalue)
    {
        Sprite sprite = spriteDictionary[m_data[0].data[getvalue].item.name];
        return sprite;
    }
    public Sprite getspriteofskinbooster(int getvalue)
    {
        Sprite sprite = spriteDictionary[m_data[0].data[getvalue].item.name];
        return sprite;
    }
    public string getskinamebyindex(int getvalue)
    {
        return m_data[0].data[getvalue].item.attributes[0].value;
    }
}