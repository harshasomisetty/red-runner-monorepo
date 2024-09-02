using UnityEngine;

public class CursorVisibilityHandler : MonoBehaviour
{
    private float lastMouseMoveTime;
    public float cursorHideDelay = 2.0f; // Time in seconds after which the cursor should hide if there's no movement
    public float idleTime = 2.0f; // Time in seconds before the cursor hides
    private Vector3 lastMousePosition;
    private float timer = 0.0f;

    private bool isCursorHidden;
    public bool UseCursorHideFeature = true;

    void Start()
    {
        // Initially, show the cursor
        ShowCursor();
        lastMousePosition = Input.mousePosition;
        lastMouseMoveTime = Time.time;
    }

    void Update()
    {
        if (UseCursorHideFeature)
        {
            if (Input.mousePosition != lastMousePosition)
            {
                lastMouseMoveTime = Time.time;
                ShowCursor();
                timer = 0.0f;
                lastMousePosition = Input.mousePosition;
            }
            else
            {
                timer += Time.deltaTime;
                if (timer >= idleTime)
                {
                    if (!isCursorHidden)
                    {
                        HideCursor();
                    }
                }
            }

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

