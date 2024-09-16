using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MarketPlaceManager : MonoBehaviour
{
    public PaginationController paginationController;
    [Header("UI Data Reference")]
    public GameObject ConfirmPanel;
    public GameObject MarketplaceCell;
    public Transform speedContainer;
    public Transform doubleJumpContainer;
    public Transform skinsContainer;
    public List<MarketplaceCell> cells;
    public MarketPlace.Root data;
    public Dictionary<string, Sprite> spriteDictionary = new Dictionary<string, Sprite>();
    public static MarketPlaceManager Instance;
    int current_Page = 1;
    string CollectionID = "";
    private void Awake()
    {
        if(Instance == null)
        {
            Instance = this;
        }
    }
    public void ClearDataToUpdate()
    {
        foreach (MarketplaceCell curcell in cells)
        {
            if (curcell != null)
            {
                curcell.gameObject.SetActive(false);
            }
        }
        cells.Clear();
    }
    public void RefreshMarketPlaceData()
    {
        if (UIManager.Instance.GetActiveScreenState(2))
        {
            FetchMarketPlaceData(CollectionID, current_Page);
        }
    }
    public void FetchMarketPlaceData(string collectionId, int PageNumber = 1)
    {
        current_Page = PageNumber;
        CollectionID = collectionId;
        ClearDataToUpdate();
        API_Manager.Instance.GetMarketPlace(collectionId, PageNumber, GetMarketPlaceData);
    }
    public void GetMarketPlaceData(bool success, MarketPlace.Root _data)
    {
        if(success)
        {
            data = _data;
            //Debug.Log(data.data[0].item.id);
            if (data.data.Count == 0)
            {
                UIManager.Instance.LaunchMarketplace();
                return;
            }
            paginationController.SetTotalPages(data.meta.totalPages, data.data[0].item.collection.id, data.meta.page);
            paginationController.OnPageSelected = FetchMarketPlaceData;
            StartCoroutine(PopulateData());
        }
        else
        {
            UIManager.Instance.ActivateFailureScreen("Marketplace");
        }
    }
    IEnumerator PopulateData()
    {
        yield return new WaitForSecondsRealtime(1f);
        for (int i = 0; i < data.data.Count; i++)
        {
            MarketplaceCell cell = null;
            if (data.data[i].type.Contains("UniqueAsset"))
            {

                if (data.data[i].item.collection.id == StaticDataBank.GetCollectionId(0))
                {
                    cell = GetCell(i, speedContainer, MarketplaceCell);
                }
                else if (data.data[i].item.collection.id == StaticDataBank.GetCollectionId(1))
                {
                    cell = GetCell(i, doubleJumpContainer, MarketplaceCell);
                }
                else if (data.data[i].item.collection.id == StaticDataBank.GetCollectionId(2))
                {
                    cell = GetCell(i, skinsContainer, MarketplaceCell);
                }
            }
            string dataSetName = data.data[i].item.name + "";
            cell.name = dataSetName;
            cells.Add(cell);
            cell.gameObject.SetActive(true);
            yield return StartCoroutine(GetInventoryItemImage(dataSetName, cell, i));
        }
        UIManager.Instance.LaunchMarketplace();
    }
    private MarketplaceCell GetCell(int index, Transform cellContainer, GameObject _inventoryCell)
    {
        if (index < cellContainer.childCount)
        {
            return cellContainer.GetChild(index).GetComponent<MarketplaceCell>();
        }
        else
        {
            return Instantiate(_inventoryCell, cellContainer).GetComponent<MarketplaceCell>();
        }
    }
    IEnumerator GetInventoryItemImage(string datasetname, MarketplaceCell cell, int index)
    {
        bool istartchecking = false;
        bool CheckOwned = data.data[index].item.owner.address == StaticDataBank.walletAddress;
        string url = data.data[index].item.imageUrl;
        if (string.IsNullOrEmpty(url) || string.IsNullOrWhiteSpace(url))
        {
            cell.SetValues(index, datasetname, data.data[index].item.priceCents, data.data[index].item.attributes[0].value, data.data[index].item.attributes[0].traitType, null);
            cell.SetButtonText(CheckOwned);
            istartchecking = true;
        }
        else
        {
            GlobalFeaturesManager.Instance.ImageCache.DownloadImage(url, data.data[index].item.name, (sprite) =>
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
                    cell.SetValues(index, StaticDataBank.RemoveWordFromString(datasetname), data.data[index].item.priceCents, data.data[index].item.attributes[0].value, data.data[index].item.attributes[0].traitType, m_sprite);
                    cell.SetButtonText(CheckOwned);
                }
                else
                {
                    Debug.Log("IMAGE FETCH FAILURE");
                }
            });

        }
        yield return new WaitUntil(() => istartchecking);
    }
    int CurrentitemIndexForBuy;
    public void ShowConfirmPanel(int index)
    {
        CurrentitemIndexForBuy = index;
        if(data.data[CurrentitemIndexForBuy].item.owner.address == StaticDataBank.walletAddress)
        {
            //GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Its Your Own Asset", 0.8f);
            return;
        }
        ConfirmPanel.SetActive(true);
    }

    public void BuyItem()
    {
        GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Buy From Market");
        API_Manager.Instance.BuyFromMarket(data.data[CurrentitemIndexForBuy].item.id, (Success, Message) => {
            if(Success)
            {
                GlobalCanvasManager.Instance.LoadingPanel.HidePopup();
                Debug.Log(Message);
                Utils.OpenURLInNewTab(Message);
            }
            else
            {
                GlobalCanvasManager.Instance.LoadingPanel.HidePopup();

                GlobalCanvasManager.Instance.PopUIHandler.ShowPopup(new PopupData()
                {
                    titleString = "Error",
                    contentString = Message,
                    firstButtonString = "OK",
                    firstButtonCallBack = null
                });
                Debug.Log(Message);
            }
        });
    }
}
