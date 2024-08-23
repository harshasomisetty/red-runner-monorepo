using System.Collections;
using System.Collections.Generic;
using RedRunner.TerrainGeneration;
using UnityEditor.VersionControl;
using UnityEngine;

public class GlobalFeaturesManager : SingletonBase<GlobalFeaturesManager>
{
    #region TokensPushingFeature
    [SerializeField]
    int NumberOfTokensToPush = 0;
    [SerializeField]
    string AssetIdToPush = "";
    [SerializeField]
    string ItemIdToUpdate = "";
    [SerializeField]
    int ItemValueToUpdate = -1;

    public void SetTokensToPushQty(int _NumberOfTokensToPush)
    {
        NumberOfTokensToPush = _NumberOfTokensToPush;
        Debug.Log ("Number Of Tokens Being Pushed To Server Are " + _NumberOfTokensToPush);
        PushTokens();
    }
    void PushEarnedTokensToServer(int _NumberOfTokens)
    {
        API_Manager.instance.PushTokens(_NumberOfTokens, (success, message) =>
        {
            if (success)
            {
                Debug.Log(_NumberOfTokens + " Tokens Pushed To Server");
                Debug.Log("Success In Pushing Tokens :" + message);
                NumberOfTokensToPush = 0;
                Debug.Log("Resetting Local Tokens Value - Success");
            }
            else
            {

                Debug.Log("Failure To Push Tokens :" + message);
                NumberOfTokensToPush = 0;
                Debug.Log("Resetting Local Tokens Value - Failure");
            }
        });
    }
    void PushTokens()
    {
        PushEarnedTokensToServer(NumberOfTokensToPush);
    }
    #endregion
    #region InventoryUpdateFeature
    void UpdateInventoryItemToServer(string _ItemID, string _AssetID, int _UseLeftValue)
    {
        API_Manager.instance.UpdateInventoryItem(_ItemID, _AssetID, _UseLeftValue, (success, message) =>
        {
            if (success)
            {
                Debug.Log(_AssetID + "With Id Is Updated");
                Debug.Log("Success In Updating Item:" + message);
            }
            else
            {

                Debug.Log("Failure To Update Item :" + message);
            }
        });
    }
    #endregion

    #region InGameAssetConsumption
    //SpeedBoosters
    [SerializeField]
    string SelectedSpeedBoosterItemID;
    [SerializeField]
    string SelectedSpeedBoosterAssetID;
    [SerializeField]
    int SelectedSpeedBoosterUsesLeftValue;

    //JumpBoosters
    [SerializeField]
    string SelectedJumpBoosterItemID;
    [SerializeField]
    string SelectedJumpBoosterAssetID;
    [SerializeField]
    int SelectedJumpBoosterUsesLeftValue;

    public void SelectJumpBoosterNft(string ItemID, string AssetID, int UsesLeft)
    {
        SelectedJumpBoosterItemID = ItemID;
        SelectedJumpBoosterAssetID = AssetID;
        SelectedJumpBoosterUsesLeftValue = UsesLeft;
    }

    public int GetJumpBoosterUses()
    {
        return SelectedJumpBoosterUsesLeftValue;
    }
    public void UpdateJumpBoosterValue(int NewValue)
    {
        SelectedJumpBoosterUsesLeftValue = NewValue;
        UpdateInventoryItemToServer(SelectedJumpBoosterItemID, SelectedJumpBoosterAssetID, NewValue);
    }



    public void SelectSpeedBoosterNft (string ItemID, string AssetID, int UsesLeft)
    {
        SelectedSpeedBoosterItemID = ItemID;
        SelectedSpeedBoosterAssetID = AssetID;
        SelectedSpeedBoosterUsesLeftValue = UsesLeft;
    }
    public int GetSpeedBoosterUses()
    {
        return SelectedSpeedBoosterUsesLeftValue;
    }
    public void UpdateSpeedBoosterValue(int NewValue)
    {
        SelectedSpeedBoosterUsesLeftValue = NewValue;
        UpdateInventoryItemToServer(SelectedSpeedBoosterItemID, SelectedSpeedBoosterAssetID, NewValue);
    }

    public void ClearEquippedItemDetails()
    {
        SelectedSpeedBoosterItemID = "";
        SelectedSpeedBoosterAssetID = "";
        SelectedSpeedBoosterUsesLeftValue = 0;

        SelectedJumpBoosterItemID = "";
        SelectedJumpBoosterAssetID = "";
        SelectedJumpBoosterUsesLeftValue = 0;
    }
    #endregion
}
