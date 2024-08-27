using System;
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

    public static string GetStringForType(this SocketEventsType eventType)
    {
        switch (eventType)
        {
            case SocketEventsType.paymentInitiated:
                return "Payment Initiated";
                break;
            case SocketEventsType.paymentFailed:
                return "Payment Failed";
                break;
            case SocketEventsType.paymentComplete:
                return "Payment Complete";
                break;
            case SocketEventsType.payoutInitiated:
                return "Payout Initiated";
                break;
            case SocketEventsType.payoutFailed:
                return "Payout Failed";
                break;
            case SocketEventsType.payoutComplete:
                return "Payout Complete {0}$";
                break;
            case SocketEventsType.assetMintInitiated:
                return "Asset Mint Initiated";
                break;
            case SocketEventsType.assetMintFailed:
                return "Asset Mint Failed";
                break;
            case SocketEventsType.assetMintComplete:
                return "{0} Minted";
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(eventType), eventType, null);
        }
    }
}
