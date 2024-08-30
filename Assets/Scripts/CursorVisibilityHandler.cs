using UnityEngine;

public class CursorVisibilityHandler : MonoBehaviour
{
    private float lastMouseMoveTime;
    public float cursorHideDelay = 2.0f; // Time in seconds after which the cursor should hide if there's no movement

    private bool isCursorHidden;
    public bool UseCursorHideFeature = true;

    void Start()
    {
        // Initially, show the cursor
        ShowCursor();
    }

    void Update()
    {
        if (UseCursorHideFeature)
        {
            // Check for mouse movement
            if (Input.GetAxis("Mouse X") != 0 || Input.GetAxis("Mouse Y") != 0)
            {
                lastMouseMoveTime = Time.time;

                if (isCursorHidden)
                {
                    ShowCursor();
                }
            }

            // Hide cursor if the delay time has passed without movement
            if (Time.time - lastMouseMoveTime > cursorHideDelay)
            {
                if (!isCursorHidden)
                {
                    HideCursor();
                }
            }

            // Check for mouse click to hide the cursor immediately
            if (Input.GetMouseButtonDown(0))
            {
                HideCursor();
            }
        }
    }

    public void ShowCursor()
    {
        Cursor.visible = true;
        Cursor.lockState = CursorLockMode.None;
        isCursorHidden = false;
    }

    public void HideCursor()
    {
        Cursor.visible = false;
        Cursor.lockState = CursorLockMode.Locked;
        isCursorHidden = true;
    }
}
