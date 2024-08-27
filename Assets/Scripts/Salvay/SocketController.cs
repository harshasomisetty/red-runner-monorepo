using System;
using System.Collections.Generic;
using Best.SocketIO;
using Best.SocketIO.Events;
using Newtonsoft.Json.Linq;
using UnityEngine;


public interface SocketEventListener
{
    public void OnSocketMessageReceived(string messageHeader);
    public void RemoveListener();
}

public class SocketController : SingletonBase<SocketController>
{
    private SocketManager _manager;
    private const string SOCKET_URL = "https://gameshift.clvtechnologies.com";
    // private const string SOCKET_URL = "http://127.0.0.1:3000";
    private List<SocketEventListener> _listeners = new List<SocketEventListener>();
    
    public void AddListener(SocketEventListener listener)
    {
        _listeners.Add(listener);
    }
    
    public void RemoveListener(SocketEventListener listener)
    {
        _listeners.Remove(listener);
    }
    private void BroadcastToAllListeners(string message)
    {
        foreach (var listener in _listeners)
        {
            listener?.OnSocketMessageReceived(message);
        }
    }

    // Unity Start event
    
    public void ConnectSocketWithUserId(string userId)
    {
        if (_manager != null)
        {
            _manager.Close();
            _manager = null;
        }

        SocketOptions options = new SocketOptions
        {
            AutoConnect = false,
            Reconnection = true,
            QueryParamsOnlyForHandshake = true,
            // Create and setup SocketManager
            AdditionalQueryParams = new PlatformSupport.Collections.ObjectModel.ObservableDictionary<string, string> { { "userId", userId } }
        };

        _manager = new SocketManager(new Uri(SOCKET_URL), options);
        
        // Set subscriptions
        _manager.Socket.On<ConnectResponse>(SocketIOEventTypes.Connect, OnConnected);
        
        _manager.Socket.On("assetMinted",OnAssetMinted);
        _manager.Socket.On("payoutReceived",OnPayoutReceived);
        
        // Start connecting to the server
        _manager.Open();
    }

    private void OnPayoutReceived()
    {
        Debug.Log(_manager.Socket.CurrentPacket.Payload);
        BroadcastToAllListeners("Payout Received " + GetAmountStringFromPayload(_manager.Socket.CurrentPacket.Payload) + " SOL");
    }

    private float GetAmountStringFromPayload(string jsonString)
    {
        JArray jsonArray = JArray.Parse(jsonString);

        // Access the second element, which is the JSON object containing the amount
        JObject jsonObject = (JObject)jsonArray[1];

        // Get the value of the "amount" key
        return (jsonObject["amount"] ?? 0f).Value<float>();
    }

    private void OnAssetMinted()
    {
        Debug.Log(_manager.Socket.CurrentPacket.Payload);
        BroadcastToAllListeners("Asset Minted");
    }

    // Connected event handler implementation
    void OnConnected(ConnectResponse resp)
    {
        Debug.Log("Connected!");
    }

    // Unity OnDestroy event
    void OnDestroy()
    {
        this._manager?.Close();
        this._manager = null;
    }
    
    private void OnApplicationQuit()
    {
        _manager?.Close();
        _manager = null;
    }
}