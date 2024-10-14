using UnityEngine;
using UnityEngine.UI;

public class CustomScrollView : MonoBehaviour
{
    public ScrollRect scrollRect;  // Drag and drop your ScrollRect component here in the Inspector
    public float mouseWheelSensitivity = 40.0f;  // Sensitivity for mouse wheel scrolling
    public float trackpadSensitivity = 2.1f;    // Sensitivity for trackpad scrolling
    public float detectionThreshold = 0.08f;    // Threshold to detect mouse wheel input

    void Start()
    {
        if (scrollRect == null)
        {
            scrollRect = GetComponent<ScrollRect>();
        }
    }

    void Update()
    {
        // Capture the scroll input (vertical only)
        float scrollInput = Input.mouseScrollDelta.y;

        // Detect trackpad vs. mouse wheel based on scroll magnitude
        if (Mathf.Abs(scrollInput) < detectionThreshold)
        {
            // Likely mouse wheel - use higher sensitivity
            AdjustScrollSpeed(scrollInput * mouseWheelSensitivity);
        }
        else if (Mathf.Abs(scrollInput) >= detectionThreshold)
        {
            // Likely trackpad - use lower sensitivity
            AdjustScrollSpeed(scrollInput * trackpadSensitivity);
        }
    }

    // Function to adjust the scroll speed of the ScrollRect
    void AdjustScrollSpeed(float scrollDelta)
    {
        // Scroll vertically (you can adjust this if you're scrolling horizontally)
        scrollRect.verticalNormalizedPosition += scrollDelta;
    }
}