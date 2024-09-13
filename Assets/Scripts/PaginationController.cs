using RedRunner.UI;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

public class PaginationController : MonoBehaviour
{
    public GameObject PaginationPanel;
    public GameObject buttonPrefab;           // The button prefab
    public Transform contentTransform;        // Content transform of the ScrollView
    public int totalPages = 20;               // Total number of pages
    public Button nextButton;                 // Reference to the Next button
    public Button previousButton;             // Reference to the Previous button
    public Material FontMaterial;
    public Sprite nextHighlight, nextNormal, pageNumberHighlight, pageNumberNormal;
    public UnityAction<string,int> OnPageSelected;   // Delegate or event for handling page selection externally
    private const int maxVisiblePages = 3;    // Number of visible pages (excluding ellipses)
    private List<GameObject> pageButtons = new List<GameObject>();
    private int currentPage = 1;              // Current active page
    private string CurrentCollectionID = "";

    private void UpdatePagination()
    {
        ClearOldButtons();
        UpdateNavigationButtons();

        // Add "Previous" button functionality
        previousButton.onClick.AddListener(PreviousPage);

        // Add ellipses and page buttons
        AddPaginationButtons();

        // Add "Next" button functionality
        nextButton.onClick.AddListener(NextPage);
    }

    private void ClearOldButtons()
    {
        foreach (GameObject button in pageButtons)
        {
            Destroy(button);
        }
        pageButtons.Clear();
    }

    private void UpdateNavigationButtons()
    {

        //previousButton.gameObject.SetActive(currentPage > 1);
        //nextButton.gameObject.SetActive(currentPage < totalPages);
        previousButton.GetComponent<Image>().sprite = currentPage > 1 ? nextHighlight : nextNormal;
        nextButton.GetComponent<Image>().sprite = currentPage < totalPages ? nextHighlight : nextNormal;

        previousButton.onClick.RemoveAllListeners();
        nextButton.onClick.RemoveAllListeners();
    }

    private void AddPaginationButtons()
    {
        // If currentPage is greater than 3, add ellipses after the first page
        if (currentPage > 2)
        {
            AddPageButton(1);        // Add the first page button
            AddEllipsis();           // Add ellipses
        }

        // Add the current and nearby pages
        for (int i = Mathf.Max(1, currentPage - 1); i <= Mathf.Min(totalPages, currentPage + 1); i++)
        {
            AddPageButton(i);
        }

        // If currentPage is less than totalPages - 2, add ellipses before the last page
        if (currentPage < totalPages - 2)
        {
            AddEllipsis();           // Add ellipses
            AddPageButton(totalPages);  // Add the last page button
        }
        nextButton.transform.SetAsLastSibling();
        previousButton.transform.SetAsFirstSibling();
    }

    private void AddPageButton(int pageNumber)
    {
        GameObject buttonObj = Instantiate(buttonPrefab, contentTransform);
        UIButton buttonComponent = buttonObj.GetComponent<UIButton>();
        TextMeshProUGUI buttonText = buttonObj.GetComponentInChildren<TextMeshProUGUI>();
        Image buttonIamge = buttonObj.GetComponent<Image>();

        buttonText.text = pageNumber.ToString();
        buttonComponent.interactable = pageNumber != currentPage; // Disable button if it's the current page
        buttonIamge.sprite = buttonComponent.interactable ? pageNumberNormal : pageNumberHighlight;

        buttonComponent.onClick.AddListener(() =>
        {
            currentPage = pageNumber;
            UpdatePagination();
            GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Loading Assets");
            OnPageSelected?.Invoke(CurrentCollectionID, currentPage);
        });

        pageButtons.Add(buttonObj);
    }

    private void AddEllipsis()
    {
        GameObject ellipsisObj = new GameObject("Ellipsis");
        ellipsisObj.transform.SetParent(contentTransform);
        TextMeshProUGUI ellipsisText = ellipsisObj.AddComponent<TextMeshProUGUI>();
        ellipsisText.text = "...";
        ellipsisText.alignment = TextAlignmentOptions.Bottom;
        ellipsisText.fontMaterial = FontMaterial;
        RectTransform rectTransform = ellipsisObj.GetComponent<RectTransform>();
        rectTransform.localScale = Vector3.one;
        rectTransform.sizeDelta = new Vector2(50f, 50f);

        pageButtons.Add(ellipsisObj);
    }

    private void NextPage()
    {
        if (currentPage < totalPages)
        {
            currentPage++;
            UpdatePagination();
            GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Loading Assets");
            OnPageSelected?.Invoke(CurrentCollectionID, currentPage);
        }
    }

    private void PreviousPage()
    {
        if (currentPage > 1)
        {
            currentPage--;
            UpdatePagination();
            GlobalCanvasManager.Instance.LoadingPanel.ShowPopup("Loading Assets");
            OnPageSelected?.Invoke(CurrentCollectionID, currentPage);
        }
    }
    public void SetTotalPages(int total, string collectionID, int _CurrentPage) // Allow setting total pages dynamically
    {
        currentPage = _CurrentPage;
        PaginationPanel.SetActive(true);
        CurrentCollectionID = collectionID;
        totalPages = total;
        UpdatePagination();
    }
    public void SetPagesOff()
    {
        currentPage = 1;
        UpdatePagination();
        ClearOldButtons();
        PaginationPanel.SetActive(false);
    }
}
