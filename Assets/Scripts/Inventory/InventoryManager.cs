using System;
using System.Collections;
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

    public TextMeshProUGUI SolValue;

    public GameObject inventoryCellBosster, inventoryCellCurrency;
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
    public Button MintButton;

    public List<InventoryData.Root> m_data;

    int current_page = 1;
    public Dictionary<string, Sprite> spriteDictionary = new Dictionary<string, Sprite>();

    void Awake()
    {
        if(Instance == null)
        {
            Instance = this;
        }
        GetSolValue();
    }

    public void FetchInventoryData(bool SequenceCall)
    {
        ClearDataToUpdate();
        CheckInventoryDataForMultiplePages(SequenceCall);
    }
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
    bool _sequenceCall = false;
    public void CheckInventoryDataForMultiplePages(bool SequenceCall)
    {
        _sequenceCall = SequenceCall;
        if (m_data.Count == 0 ||m_data[0].meta.totalPages >= current_page)
        {
            API_Manager.Instance.GetInvectory(Get_InventoryData, current_page++);
        }
        else
        {
            StartCoroutine(senddatatopopulate());
        }
    }
    IEnumerator senddatatopopulate()
    {
        for (int i = 0; i < m_data.Count; i++)
        {
            if (i == m_data.Count - 1)
            {
                dataFetchCompleted = true;
            }
            yield return StartCoroutine(GetInventory_Data(m_data[i], i));
        }
    }
    public void Get_InventoryData(bool success, InventoryData.Root data)
    {
        if (success)
        {
            Debug.Log("Number of Call Backs");
            m_data.Add(data);
            CheckInventoryDataForMultiplePages(_sequenceCall);
        }
        else
        {
            if (!_sequenceCall)
            {
                Debug.Log("Inventory data failed");
                UIManager.Instance.SignalInventoryFailure();
            }
            else
            {
                UIManager.Instance.ToggleGameEquipmentStatus(false);
                UIManager.Instance.SetGameEquipmentStatusText("Assets Failed To Load");
                PlayerPrefs.SetInt("OfflineMode", 1);
                UIManager.Instance.ToggleGameEquipmentStatus(true);
                UIManager.Instance.GameEquipmentBackButton.SetActive(true);
                Debug.Log("Sequence Failure");
            }
            //CODE HERE//
        }
    }
    private InventoryCell GetCell(int index,Transform cellContainer,GameObject _inventoryCell)
    {
        if (index < cellContainer.childCount)
        {
            return cellContainer.GetChild(index).GetComponent<InventoryCell>();
        }
        else
        {
            return Instantiate(_inventoryCell, cellContainer).GetComponent<InventoryCell>();
        }
    }
    IEnumerator GetInventory_Data(InventoryData.Root data, int pageNumber)
    {
        Debug.Log("Inventory Data Success");
        for (int i = 0; i < data.data.Count; i++)
        {
            InventoryCell cell = null;
            DataIndex _data = new DataIndex();
            _data.boosterindex = i;
            _data.pageNumber = pageNumber;
            if (data.data[i].type.Contains("UniqueAsset"))
            {
                if (data.data[i].item.collection.id == "0dfe473e-bbb7-453f-8d3f-ba9af79dfc14")
                {
                    _data.boosterindex = i;
                    SpeedBoosterIndex.Add(_data);
                    cell = GetCell(SpeedBoosterIndex.Count - 1, speedContainer, inventoryCellBosster);
                }
                else if (data.data[i].item.collection.id == "0b9d2116-b3a2-4452-affb-03282313ab77")
                {
                    _data.boosterindex = i;
                    DoubleJumpIndex.Add(_data);
                    cell = GetCell(DoubleJumpIndex.Count - 1, doubleJumpContainer, inventoryCellBosster);
                }
                else if (data.data[i].item.collection.id == "36399a18-941c-4c18-bb0d-8cc2aaaa8b06")
                {
                    _data.boosterindex = i;
                    SkinsIndex.Add(_data);
                    cell = GetCell(SkinsIndex.Count - 1, skinsContainer, inventoryCellBosster);
                }
            }
            else if (data.data[i].type.Contains("Currency"))
            {
                if (data.data[i].item.id.Contains("SOL"))
                {
                    SetSolValue(data.data[i].quantity);
                }
                _data.boosterindex = i;
                Currencies.Add(_data);
                cell = GetCell(Currencies.Count - 1, currencyContainer, inventoryCellCurrency);
            }

            string dataSetName = data.data[i].item.name + "";
            cell.name = dataSetName;
            cells.Add(cell);
            cell.gameObject.SetActive(true);
            yield return StartCoroutine(GetInventoryItemImage(data.data[i].item.imageUrl, dataSetName, cell, _data));
        }
        if (dataFetchCompleted)
        {
            //SUCCESS SCENARIOS//
            if (!_sequenceCall)
                UIManager.Instance.LaunchInventory();
            else
            {
                UIManager.Instance.SetGameEquipmentStatusText("");
                UIManager.Instance.ToggleGameEquipmentStatus(false);
                InGameEquipmentWindow.Instance.SetDefaultSelectedOption();
                UIManager.Instance.ToggleGameEquipmentFeatures(true);
                UIManager.Instance.GameEquipmentBackButton.SetActive(true);
                Debug.Log("Sequence Success");
            }
        }
    }

    IEnumerator GetInventoryItemImage(string url, string datasetname, InventoryCell cell, DataIndex index)
    {
        bool istartchecking = false;

        if (string.IsNullOrEmpty(url) || string.IsNullOrWhiteSpace(url))
        {
            cell.SetValues(index, datasetname, null);
            istartchecking = true;
        }
        else
        {
            API_Manager.Instance.DownloadImage(url, (success, sprite) =>
            {
                istartchecking = true;
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
                    cell.SetValues(index, StaticDataBank.RemoveWordFromString(datasetname), m_sprite);
                }
                else
                {
                    Debug.Log("IMAGE FETCH FAILURE");
                }
            });

        }
        yield return new  WaitUntil(() => istartchecking);
    }


    public void ShowDetailsPanel(int dataindex, int pageNumber)
    {
        Description.text = m_data[pageNumber].data[dataindex].item.description;
        //BoosterName.text = m_data[pageNumber].data[dataindex].item.name;
        BoosterName.text = StaticDataBank.RemoveWordFromString(m_data[pageNumber].data[dataindex].item.name);
        Debug.Log(m_data[pageNumber].data[dataindex].item.status);
        if (spriteDictionary.ContainsKey(m_data[pageNumber].data[dataindex].item.name))
        {
            boosterImage.sprite = spriteDictionary[m_data[pageNumber].data[dataindex].item.name];
            boosterImage.SetNativeSize();
        }
        MintButton.gameObject.SetActive(false);
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
    public string getItemIdOfSpeedBooster(DataIndex _data)
    {
        string SpeedBoosterItemID = m_data[_data.pageNumber].data[_data.boosterindex].item.itemId;
        return SpeedBoosterItemID;
    }
    public string getAssetIdOfSpeedBooster(DataIndex _data)
    {
        string SpeedBoosterAssetID = m_data[_data.pageNumber].data[_data.boosterindex].item.id;
        return SpeedBoosterAssetID;
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
    public string getItemIdOfJumpBooster(DataIndex _data)
    {
        string JumpBoosterItemID = m_data[_data.pageNumber].data[_data.boosterindex].item.itemId;
        return JumpBoosterItemID;
    }
    public string getAssetIdOfJumpBooster(DataIndex _data)
    {
        string JumpBoosterAssetID = m_data[_data.pageNumber].data[_data.boosterindex].item.id;
        return JumpBoosterAssetID;
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
    public void SetSolValue(string solValue)
    {
        Debug.Log("Currency Quantity : " + solValue);
        SolValue.text = "" + solValue;
    }
    public void GetSolValue()
    {
        API_Manager.Instance.GetInvectory((success, _data) =>
        {
            if (success)
            {
                for (int i = 0; i < _data.data.Count; i++)
                {
                    Debug.Log(i + "index ");
                    if (_data.data[i].item.id == "SOL")
                    {
                        SetSolValue(_data.data[i].quantity);
                    }
                }
            }
        }, 1, "Currency");
    }
}