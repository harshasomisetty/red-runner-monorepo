using UnityEngine;

public class CursorVisibilityHandler : MonoBehaviour
{
    public float idleTime = 2.0f; // Time in seconds before the cursor hides
    private Vector3 lastMousePosition;
    private float timer = 0.0f;


    void Start()
    {
        lastMousePosition = Input.mousePosition;
        Cursor.visible = true; // Initially show the cursor
    }

    void Update()
    {
        // Check if the mouse has moved
        if (Input.mousePosition != lastMousePosition)
        {
            Cursor.visible = true; // Show the cursor if the mouse moved
            timer = 0.0f; // Reset the timer
            lastMousePosition = Input.mousePosition; // Update the last known mouse position
        }
        else
        {
            // Increment the timer if the mouse hasn't moved
            timer += Time.deltaTime;

            // Hide the cursor if the idle time has passed
            if (timer >= idleTime)
            {
                Cursor.visible = false;
            }
        }
    }
}
