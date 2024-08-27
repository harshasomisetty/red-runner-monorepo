using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class Utils
{
    public static void OpenURLInNewTab(string url)
    {
        if (Application.platform == RuntimePlatform.WebGLPlayer)
        {
            string title = "Game Shift Purchasing"; // The title of the new window

            // Call the JavaScript function from Unity
            Application.ExternalCall("OpenPopupWindow", url, title);
        }
        else
        {
            Application.OpenURL(url);
        }
    }
}
