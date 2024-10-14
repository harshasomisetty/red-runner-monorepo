using UnityEngine;
using TMPro;
using UnityEngine.EventSystems;

public class LinkClickHandler : MonoBehaviour, IPointerClickHandler
{
    // Reference to the TextMeshProUGUI component
    private TextMeshProUGUI textMeshPro;

    void Awake()
    {
        // Get the TextMeshProUGUI component
        textMeshPro = GetComponent<TextMeshProUGUI>();
    }

    // Method to detect when the user clicks on the text
    public void OnPointerClick(PointerEventData eventData)
    {
        // Get the index of the character where the click happened
        int linkIndex = TMP_TextUtilities.FindIntersectingLink(textMeshPro, Input.mousePosition, Camera.main);

        // If a link is clicked
        if (linkIndex != -1)
        {
            // Get the link information
            TMP_LinkInfo linkInfo = textMeshPro.textInfo.linkInfo[linkIndex];

            // Perform actions based on the link ID
            switch (linkInfo.GetLinkID())
            {
                case "Terms_Conditions":
                    OpenTermsAndConditions();
                    break;
                case "privacy_policy":
                    OpenPrivacyPolicy();
                    break;
                case "cookie_policy":
                    OpenCookiePolicy();
                    break;
            }
        }
    }

    // Methods to handle the respective actions
    private void OpenPrivacyPolicy()
    {
        Debug.Log("Privacy Policy link clicked");
        // Add code here to open the Privacy Policy, e.g., open a webpage
        Application.OpenURL("https://app.gameshift.dev/privacy-policy.pdf");
    }

    private void OpenCookiePolicy()
    {
        Debug.Log("Cookie Policy link clicked");
        // Add code here to open the Cookie Policy, e.g., open a webpage
        Application.OpenURL("https://app.gameshift.dev/Gameshift_Cookie_Policy.pdf");
    }
    private void OpenTermsAndConditions()
    {
        Debug.Log("OpenTermsAndConditions link clicked");
        // Add code here to open the Cookie Policy, e.g., open a webpage
        Application.OpenURL("https://app.gameshift.dev/tos_03-23-24.pdf");
    }
}
