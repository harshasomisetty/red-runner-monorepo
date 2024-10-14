using RedRunner.UI;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using TMPro;
using UnityEngine;
using UnityEngine.UI;



[Serializable]
public class DataContainer
{
    public Sprite m_sprite;
    public string boosterValue;
    public bool isListed = false;
}
[Serializable]
public class EquipedAssets
{
    public string Id;
    public string collectionId;
}
public class InventoryManager : MonoBehaviour
{
    public static InventoryManager Instance;

    public TextMeshProUGUI SolValue;
    public TextMeshProUGUI RRValue;

    public GameObject inventoryCellBosster, inventoryCellCurrency;
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
    public GameObject Confirmpanel;
    public UIButton ListButton;
    public TextMeshProUGUI ListButtonText;
    public TextMeshProUGUI ConfirmText;
    public TextMeshProUGUI attribute;
    public TextMeshProUGUI BoosterName;
    public TextMeshProUGUI Description;
    public Image boosterImage;
    public TMP_InputField enteredAmount;
    public PaginationController paginationController;
    public List<InventoryData.Root> m_data;

    int current_page = 1;
    string CollectionID = "";

    public Dictionary<string, Sprite> spriteDictionary = new Dictionary<string, Sprite>();

    void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }
        CollectionID = StaticDataBank.GetCollectionId(0);
        InvokeRepeating(nameof(GetSolValue), 1f, 30f);
    }
    //bool dataFetchCompleted = false;
    public void ClearDataToUpdate()
    {
        //dataFetchCompleted = false;
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

    public void FetchInventoryData(string collectionId, int PageNumber = 1)
    {
        ClearDataToUpdate();
        current_page = PageNumber;
        CollectionID = collectionId;
        API_Manager.Instance.GetInvectory(Get_InventoryData, PageNumber, collectionId);
        //if (/*!dataFetchCompleted ||*/ SequenceCall)
        //{
        //CheckInventoryDataForMultiplePages(SequenceCall);
        //}
        //else
        //{
        //    CheckSuccesScreen(SequenceCall);
        //}
    }
    //public void CheckInventoryDataForMultiplePages(bool SequenceCall,int pageNumber)
    //{
    //    _sequenceCall = SequenceCall;
    //    if (m_data.Count == 0 || m_data[0].meta.totalPages >= current_page)
    //    {
    //    }
    //    else
    //    {
    //        StartCoroutine(PopulateDataSequence());
    //    }
    //}
    //IEnumerator PopulateDataSequence()
    //{
    //    for (int i = 0; i < m_data.Count; i++)
    //    {
    //        //if (i == m_data.Count - 1)
    //        //{
    //        //    dataFetchCompleted = true;
    //        //}
    //        yield return StartCoroutine(GetInventory_Data(m_data[i], i));
    //    }
    //}
    public void Get_InventoryData(bool success, InventoryData.Root data)
    {
        if (success)
        {
            Debug.Log("Number of Call Backs");
            m_data.Add(data);
            if (m_data[0].data.Count == 0)
            {
                UIManager.Instance.LaunchInventory();
                return;
            }
            paginationController.SetTotalPages(m_data[0].meta.totalPages, m_data[0].data[0].item.collection.id, data.meta.page);
            paginationController.OnPageSelected = FetchInventoryData;
            //CheckInventoryDataForMultiplePages(_sequenceCall);
            //StartCoroutine(PopulateDataSequence());
            StartCoroutine(GetInventory_Data(m_data[0]));
        }
        else
        {
            UIManager.Instance.SignalInventoryFailure();
        }
    }
    private InventoryCell GetCell(int index, Transform cellContainer, GameObject _inventoryCell)
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
    IEnumerator GetInventory_Data(InventoryData.Root data)
    {
        Debug.Log("Inventory Data Success");
        for (int i = 0; i < data.data.Count; i++)
        {
            InventoryCell cell = null;
            //DataIndex _data = new DataIndex();
            //_data.boosterindex = i;
            //_data.pageNumber = pageNumber;
            if (data.data[i].type.Contains("UniqueAsset"))
            {

                if (data.data[i].item.collection.id == StaticDataBank.GetCollectionId(0))
                {
                    //_data.boosterindex = i;
                    SpeedBoosterIndex.Add(i);
                    cell = GetCell(SpeedBoosterIndex.Count - 1, speedContainer, inventoryCellBosster);
                }
                else if (data.data[i].item.collection.id == StaticDataBank.GetCollectionId(1))
                {
                    //_data.boosterindex = i;
                    DoubleJumpIndex.Add(i);
                    cell = GetCell(DoubleJumpIndex.Count - 1, doubleJumpContainer, inventoryCellBosster);
                }
                else if (data.data[i].item.collection.id == StaticDataBank.GetCollectionId(2))
                {
                    //_data.boosterindex = i;
                    SkinsIndex.Add(i);
                    cell = GetCell(SkinsIndex.Count - 1, skinsContainer, inventoryCellBosster);
                }
            }
            else if (data.data[i].type.Contains("Currency"))
            {
                if (data.data[i].item.id.Contains("SOL"))
                {
                    SetSolValue(data.data[i].quantity);
                }
                //_data.boosterindex = i;
                Currencies.Add(i);
                cell = GetCell(Currencies.Count - 1, currencyContainer, inventoryCellCurrency);
            }

            string dataSetName = data.data[i].item.name + "";
            cell.name = dataSetName;
            cells.Add(cell);
            cell.gameObject.SetActive(true);
            cell.escrowOverlay.SetActive(data.data[i].item.escrow.Value);
            yield return StartCoroutine(GetInventoryItemImage(dataSetName, cell, i));
        }
        //CheckSuccesScreen(_sequenceCall);
        UIManager.Instance.LaunchInventory();
    }

    IEnumerator GetInventoryItemImage(string datasetname, InventoryCell cell, int index)
    {
        bool istartchecking = false;
        string url = m_data[0].data[index].item.imageUrl;
        if (string.IsNullOrEmpty(url) || string.IsNullOrWhiteSpace(url))
        {
            cell.SetValues(index, datasetname, m_data[0].data[index].item.attributes[0].value, m_data[0].data[index].item.attributes[0].traitType, null);
            istartchecking = true;
        }
        else
        {
            GlobalFeaturesManager.Instance.ImageCache.DownloadImage(url, m_data[0].data[index].item.name,(sprite) =>
            {
                istartchecking = true;
                if (sprite != null)
                {
                    Sprite m_sprite = Sprite.Create(sprite, new Rect(0, 0, sprite.width, sprite.height), new Vector2(0.5f, 0.5f));

                    if (spriteDictionary.ContainsKey(datasetname))
                    {
                        spriteDictionary[datasetname] = m_sprite;
                    }
                    else
                    {
                        spriteDictionary.Add(datasetname, m_sprite);
                    }
                    cell.SetValues(index, StaticDataBank.RemoveWordFromString(datasetname), m_data[0].data[index].item.attributes[0].value, m_data[0].data[index].item.attributes[0].traitType, m_sprite);
                }
                else
                {
                    Debug.Log("IMAGE FETCH FAILURE");
                }
            });

        }
        yield return new WaitUntil(() => istartchecking);
    }

    int currentItemIndexToList = -1;
    public void ShowDetailsPanel(int dataindex)
    {
        ListButtonText.text = m_data[0].data[dataindex].item.escrow.Value ? "UnList" : "List";
        ConfirmText.text = "Are you Sure You want to " + ListButtonText.text + " On Marketplace";
        currentItemIndexToList = dataindex;
        Description.text = m_data[0].data[dataindex].item.description;
        //BoosterName.text = m_data[pageNumber].data[dataindex].item.name;
        BoosterName.text = StaticDataBank.RemoveWordFromString(m_data[0].data[dataindex].item.name);
        Debug.Log(m_data[0].data[dataindex].item.status);
        attribute.text = m_data[0].data[dataindex].item.attributes[0].value;
        if (spriteDictionary.ContainsKey(m_data[0].data[dataindex].item.name))
        {
            boosterImage.sprite = spriteDictionary[m_data[0].data[dataindex].item.name];
            boosterImage.SetNativeSize();
        }
        //MintButton.SetActive(false);
        //ListButton.gameObject.SetActive(true);
        ListButton.interactable = m_data[0].data[dataindex].item.escrow.Value;
        enteredAmount.interactable = !m_data[0].data[dataindex].item.escrow.Value;
        DetailPanel.SetActive(true);
        if (!ListButton.interactable)
            GlobalCanvasManager.Instance.SocketPrompter.ShowPopup("Enter Price To list");
    }

    public DataContainer GetDataOfBoosters(int index)
    {
        DataContainer _data = new DataContainer();
        _data.boosterValue = m_data[0].data[index].item.attributes[0].value;
        _data.m_sprite = spriteDictionary[m_data[0].data[index].item.name];
        _data.isListed = m_data[0].data[index].item.escrow.Value;
        return _data;
    }
    //public List<DataContainer> GetListofBoostersData()
    //{
    //    List<DataContainer> boostersdatalist = new List<DataContainer>();
    //    for(int i=0;i < cells.Count; i++)
    //    {
    //        DataContainer _data = new DataContainer();
    //        _data.boosterValue = m_data[0].data[i].item.attributes[0].value;
    //        _data.m_sprite = spriteDictionary[m_data[0].data[i].item.name];
    //        _data.isListed = m_data[0].data[i].item.escrow.Value;
    //        boostersdatalist.Add(_data);
    //    }
    //    return boostersdatalist;
    //}
    public EquipedAssets GetEquipedAssetDetails(int index)
    {
        EquipedAssets _quiped = new EquipedAssets();
        _quiped.Id = m_data[0].data[index].item.itemId;
        _quiped.collectionId = m_data[0].data[index].item.id;
        return _quiped;
    }
    public void ListOnMarketplace()
    {
        string assetId = m_data[0].data[currentItemIndexToList].item.id;
        Debug.Log("Assett Id : " + assetId);
        if (m_data[0].data[currentItemIndexToList].item.escrow.Value)
        {
            GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Unlisting Asset");
            API_Manager.Instance.UnListOnSale(assetId, (success, message) => {
                if (success)
                {
                    Confirmpanel.SetActive(false);
                    DetailPanel.transform.GetChild(0).gameObject.SetActive(true);
                    DetailPanel.SetActive(false);
                    enteredAmount.text = "";
                    GlobalCanvasManager.Instance.LoadingPanel.HidePopup();
                    Debug.Log(message);
                    Utils.OpenURLInNewTab(message);
                }
                else
                {
                    GlobalCanvasManager.Instance.LoadingPanel.HidePopup();

                    GlobalCanvasManager.Instance.PopUIHandler.ShowPopup(new PopupData()
                    {
                        titleString = "Error",
                        contentString = message,
                        firstButtonString = "OK",
                        firstButtonCallBack = null
                    });
                    Debug.Log(message);
                }
            });
        }
        else
        {
            if (!StaticDataBank.CheckInputField(enteredAmount.text) || enteredAmount.text.Length <= 0)
            {
                return;
            }
            string amount = enteredAmount.text.ToString();
            float _amount = float.Parse(amount);
            if (_amount <= 0)
                return;
            try
            {

                GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Listing Asset");
                API_Manager.Instance.ListOnSale(assetId, _amount, (success, message) =>
                {
                    if (success)
                    {
                        GlobalCanvasManager.Instance.LoadingPanel.HidePopup();
                        Confirmpanel.SetActive(false);
                        DetailPanel.transform.GetChild(0).gameObject.SetActive(true);
                        DetailPanel.SetActive(false);
                        enteredAmount.text = "";
                        Debug.Log(message);
                        Utils.OpenURLInNewTab(message);
                    }
                    else
                    {
                        Debug.Log(message);
                        GlobalCanvasManager.Instance.LoadingPanel.HidePopup();

                        GlobalCanvasManager.Instance.PopUIHandler.ShowPopup(new PopupData()
                        {
                            titleString = "Error",
                            contentString = message,
                            firstButtonString = "OK",
                            firstButtonCallBack = null
                        });
                    }
                });
            }
            catch (Exception ex)
            {
                Debug.Log("Enter Only in Digits");
            }
        }
    }
    public void OnInputValueChange(TMP_InputField tMP_Input)
    {
        if (!m_data[0].data[currentItemIndexToList].item.escrow.Value)
        {
            ListButton.interactable = StaticDataBank.CheckInputField(tMP_Input.text) && tMP_Input.text.Length > 0;
        }
    }
    
    public void SetSolValue(string solValue)
    {
        SolValue.text = "" + solValue;
    }
    public void SetRRValue(string solValue)
    {
        RRValue.text = "" + solValue;
    }
    public void GetSolValue()
    {
        Debug.Log("Repeating");
        API_Manager.Instance.Getcurrency((success, _data) =>
        {
            if (success)
            {
                for (int i = 0; i < _data.data.Count; i++)
                {
                    if (_data.data[i].item.id == "SOL")
                    {
                        SetSolValue(_data.data[i].quantity);
                    }
                    if (_data.data[i].item.id == "97653f2a-d058-47bd-9f0f-ff6c254c88f3")
                    {
                        SetRRValue(_data.data[i].quantity);
                    }
                }
            }
        });
    }
}