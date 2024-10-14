using System;
using System.Collections.Generic;
using Best.SocketIO;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using UnityEngine;

public class QRSocketController : SingletonBase<QRSocketController>
{
    private SocketManager _manager;
    public delegate void QRCodeReceivedHandler(string qrCodeDataUrl);
    public event QRCodeReceivedHandler OnQRCodeReceived;
    public delegate void QRLoginCompletedHandler(string payload);
    public event QRLoginCompletedHandler OnQRLoginCompleted;
    private Socket myNamespace;

    public void InitiateQRCodeLogin()
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
        };
        Debug.Log("Initiating QR code login" + StaticDataBank.SOCKET_URL);
        _manager = new SocketManager(new Uri(StaticDataBank.SOCKET_URL), options);

        myNamespace = _manager.GetSocket("/qr-signup");
        // myNamespace.On<ConnectResponse>(SocketIOEventTypes.Connect, OnMyNamespaceConnected);


        myNamespace.On(SocketIOEventTypes.Connect, OnConnected);
        myNamespace.On("qrGenerated", OnQRCodeGenerated);
        myNamespace.On("qrLoginCompleted", OnQRLoginCompletedHandler);
        _manager.Open();
        // Emit loginInitiated event
        // return sessionId;
    }

    public void EmitEvent(string eventName, object data)
    {
        Debug.Log($"Emitting event: {eventName} with data: {JsonConvert.SerializeObject(data)}");
        myNamespace.Emit(eventName, data);
    }

    private void OnQRCodeGenerated()
    {
        Debug.Log("in QR Code generated");
        try
        {
            string payload = myNamespace.CurrentPacket.Payload;
            Debug.Log("QR Code generated payload: " + payload);

            // Parse the payload as a JArray since it's an array
            var jArray = JArray.Parse(payload);

            // The second element of the array is the object with the QR code data
            var jObject = jArray[1] as JObject;

            // Extract the qrCodeDataUrl from the JObject
            string qrCodeDataUrl = jObject["qrCodeDataUrl"]?.ToString();

            if (!string.IsNullOrEmpty(qrCodeDataUrl))
            {
                OnQRCodeReceived?.Invoke(qrCodeDataUrl);
                Debug.Log("QR Code received and handler invoked");
            }
            else
            {
                Debug.LogError("qrCodeDataUrl not found in payload or is null");
            }
        }
        catch (Exception e)
        {
            Debug.LogError($"Error processing QR code payload: {e.Message}");
        }
    }


    private void OnQRLoginCompletedHandler()
    {
        Debug.Log("in QR Login completed handler");
        string payload = myNamespace.CurrentPacket.Payload;
        Debug.Log("hander payload " + payload);
        OnQRLoginCompleted?.Invoke(payload);
        Debug.Log("QR Login completed");
    }

    private void OnConnected()
    {
        Debug.Log("On connected handler in qrsocketcontroller");
        string payload = myNamespace.CurrentPacket.Payload;
        // Debug.Log("Connected to QR login socket server! " + payload);
        string sid = JObject.Parse(payload)["sid"]?.ToString();
        EmitEvent("loginInitiated", sid);

    }

    void OnDestroy()
    {
        _manager?.Close();
        _manager = null;
    }

    private void OnApplicationQuit()
    {
        _manager?.Close();
        _manager = null;
    }
}