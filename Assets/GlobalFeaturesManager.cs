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
    public void SetItemIdsForUpdate (string ItemID, string AssetID, int UseLeftValue)
    {
        ItemIdToUpdate = ItemID;
        AssetIdToPush = AssetID;
        ItemValueToUpdate = UseLeftValue;
        PushUpdatedItemToInventory();
    }
    void UpdateInventoryItemToServer(string _ItemID, string _AssetID, int _UseLeftValue)
    {
        API_Manager.instance.UpdateInventoryItem(_ItemID, _AssetID, _UseLeftValue, (success, message) =>
        {
            if (success)
            {
                Debug.Log(_ItemID + "With Id Is Updated");
                Debug.Log("Success In Updating Item:" + message);
                ItemIdToUpdate = "";
                AssetIdToPush = "";
                ItemValueToUpdate = -1;
                Debug.Log("Resetting Local Values In Item Update - Success");
            }
            else
            {

                Debug.Log("Failure To Push Tokens :" + message);
                ItemIdToUpdate = "";
                AssetIdToPush = "";
                ItemValueToUpdate = -1;
                Debug.Log("Resetting Local Tokens Value - Failure");
            }
        });
    }
    void PushUpdatedItemToInventory()
    {
        UpdateInventoryItemToServer(ItemIdToUpdate, AssetIdToPush, ItemValueToUpdate);
    }
    #endregion
}
