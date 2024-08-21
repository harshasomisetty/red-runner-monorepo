using System;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;



[Serializable]
public class DataIndex
{
    public int pageNumber = 0;
    public int boosterindex = 0;
}

public class InventoryManager : MonoBehaviour
{
    public static InventoryManager Instance;


    public GameObject inventoryCellBosster, inventoryCellSkin;
    public Transform speedContainer;
    public Transform doubleJumpContainer;
    public Transform skinsContainer;
    public Transform currencyContainer;
    public List<InventoryCell> cells;
    public List<DataIndex> SpeedBoosterIndex;
    public List<DataIndex> DoubleJumpIndex;
    public List<DataIndex> SkinsIndex;
    public List<DataIndex> Currencies;
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

    public void FetchInventoryData()
    {
        ClearDataToUpdate();
        CheckInventoryDataForMultiplePages();
    }
    //public void OnResetInventory()
    //{
        
    //}
    public void ClearDataToUpdate()
    {
        dataFetchCompleted = false;
        current_page = 1;
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
            for(int i= 0; i < m_data.Count; i++)
            {
                GetInventory_Data(dataFetchCompleted, m_data[i], i);
            }
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
        else
        {
            Debug.Log("Inventory data failed");
            UIManager.Instance.SignalInventoryFailure();
            //CODE HERE//
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
    public void GetInventory_Data(bool success, InventoryData.Root data, int pageNumber)
    {
        if (success)
        {
            Debug.Log("Inventory Data Success");
            
            for (int i = 0; i < data.data.Count; i++)
            {
                InventoryCell cell = null;
                DataIndex _data =new DataIndex();
                _data.boosterindex = i;
                _data.pageNumber = pageNumber;
                Debug.Log("Iteration : " + i + " : " + data.data[i].type + " : type");
                if (data.data[i].type.Contains("UniqueAsset"))
                {
                    if (data.data[i].item.collection.id == "0dfe473e-bbb7-453f-8d3f-ba9af79dfc14")
                    {
                        _data.boosterindex = i;
                        SpeedBoosterIndex.Add(_data);
                        cell = GetCell(SpeedBoosterIndex.Count - 1, speedContainer,inventoryCellBosster);
                    }
                    else if(data.data[i].item.collection.id == "0b9d2116-b3a2-4452-affb-03282313ab77")
                    {
                        _data.boosterindex = i;
                        DoubleJumpIndex.Add(_data);
                        cell = GetCell(DoubleJumpIndex.Count - 1, doubleJumpContainer, inventoryCellBosster);
                    }
                    else if (data.data[i].item.collection.id == "36399a18-941c-4c18-bb0d-8cc2aaaa8b06")
                    {
                        _data.boosterindex = i;
                        SkinsIndex.Add(_data);
                        cell = GetCell(SkinsIndex.Count - 1, skinsContainer, inventoryCellSkin);
                    }
                    //cell.name = data.data[i].item.name;
                }
                else if (data.data[i].type.Contains("Currency"))
                {
                    _data.boosterindex = i;
                    Currencies.Add(_data);
                    cell = GetCell(Currencies.Count - 1, currencyContainer, inventoryCellBosster);
                }

                string dataSetName = data.data[i].item.name + "";
                cell.name = dataSetName;
                cells.Add(cell);
                cell.gameObject.SetActive(true);
                GetInventoryItemImage(data.data[i].item.imageUrl, dataSetName, cell, i);
            }
            UIManager.Instance.LaunchInventory();
            //CODE HERE//
        }
        else
        {
            Debug.Log("Inventory data failed");
            UIManager.Instance.SignalInventoryFailure();
            //CODE HERE//
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

    public string getvalueofspeedbooster(DataIndex _data)
    {
        return m_data[_data.pageNumber].data[_data.boosterindex].item.attributes[0].value;
    }
    public Sprite getspriteofspeedbooster(DataIndex _data)
    {
        Sprite sprite = spriteDictionary[m_data[_data.pageNumber].data[_data.boosterindex].item.name];
        return sprite;
    }
    public string getvalueofdoublejumbbooster(DataIndex _data)
    {
        return m_data[_data.pageNumber].data[_data.boosterindex].item.attributes[0].value;
    }
    public Sprite getspriteofdoublejumbbooster(DataIndex _data)
    {
        Sprite sprite = spriteDictionary[m_data[_data.pageNumber].data[_data.boosterindex].item.name];
        return sprite;
    }
    public Sprite getspriteofskinbooster(DataIndex _data)
    {
        Sprite sprite = spriteDictionary[m_data[_data.pageNumber].data[_data.boosterindex].item.name];
        return sprite;
    }
    public string getskinamebyindex(DataIndex _data)
    {
        return m_data[_data.pageNumber].data[_data.boosterindex].item.attributes[0].value;
    }
}