using UnityEngine;
using UnityEngine.UI;

public class ScrollWithMouseWheel : MonoBehaviour
{
    private ScrollRect scrollRect; // Assign the ScrollRect via the inspector
    public float scrollSpeed = 100f; // Adjust the scroll speed factor


    private void Start()
    {
        scrollRect = GetComponent<ScrollRect>();
    }

    void Update()
    {
        // Get the scroll wheel input
        float scrollInput = Input.GetAxis("Mouse ScrollWheel");

        // Scroll vertically by adjusting the verticalNormalizedPosition
        if (scrollInput != 0)
        {
            scrollRect.verticalNormalizedPosition += scrollInput * scrollSpeed * Time.deltaTime;
            // Clamping to ensure the value stays between 0 and 1
            scrollRect.verticalNormalizedPosition = Mathf.Clamp01(scrollRect.verticalNormalizedPosition);
        }
    }
}
