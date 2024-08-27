using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class Utils
{
    public static void OpenURLInNewTab(string url)
    {
        if (Application.platform == RuntimePlatform.WebGLPlayer)
        {
            Application.ExternalCall("window.open", url, "_blank");
        }
        else
        {
            Application.OpenURL(url);
        }
    }
}
