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
        return eventType switch
        {
            SocketEventsType.paymentInitiated => "Payment Initiated",
            SocketEventsType.paymentFailed => "Payment Failed",
            SocketEventsType.paymentComplete => "Payment Complete",
            SocketEventsType.payoutInitiated => "Payout Initiated",
            SocketEventsType.payoutFailed => "Payout Failed",
            SocketEventsType.payoutComplete => "Payout Complete {0}$",
            SocketEventsType.assetMintInitiated => "Asset Mint Initiated",
            SocketEventsType.assetMintFailed => "Asset Mint Failed",
            SocketEventsType.assetMintComplete => "{0} Minted",
            SocketEventsType.marketAssetListed => "Asset Listed",
            SocketEventsType.marketAssetUnListed => "Asset Unlisted",
            SocketEventsType.marketAssetBought => "Asset Bought",
            _ => "Unknown Event"
        };
    }
}
