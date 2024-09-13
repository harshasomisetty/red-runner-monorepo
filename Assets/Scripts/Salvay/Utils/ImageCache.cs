using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.Networking;

public class ImageCache : MonoBehaviour
{
    private string jsonKey = "image_references"; // Key for storing image references in local storage


    public void DownloadImage(string imageUrl, string _name, Action<Texture2D> onComplete)
    {
        StartCoroutine(LoadImage(imageUrl, _name, onComplete));
    }




    // Check if the image is available locally, otherwise download it
    public IEnumerator LoadImage(string url, string imageName, Action<Texture2D> _onComplete)
    {
        // Check if image reference exists in local storage
        Dictionary<string, string> imageReferences = LoadImageReferences();
        if (imageReferences.ContainsKey(imageName))
        {
            // Image exists in local storage, load it from there
            string base64Image = PlayerPrefs.GetString(url);
            byte[] imageData = Convert.FromBase64String(base64Image);

            // Create texture from byte array
            Texture2D texture = new Texture2D(2, 2);
            texture.LoadImage(imageData);
            _onComplete?.Invoke(texture);
            // Apply the texture (You can add this texture to a sprite or an object)
            Debug.Log("Image loaded from local storage: " + imageName);
        }
        else
        {
            // Image not found, download it
            yield return StartCoroutine(DownloadNewImage(url, imageName, _onComplete));
        }
    }

    // Download image and store it in local storage
    private IEnumerator DownloadNewImage(string url, string imageName, Action<Texture2D> _onComplete)
    {
        using (UnityWebRequest webRequest = UnityWebRequestTexture.GetTexture(url))
        {
            yield return webRequest.SendWebRequest();

            if (webRequest.result == UnityWebRequest.Result.Success)
            {
                Texture2D texture = ((DownloadHandlerTexture)webRequest.downloadHandler).texture;
                byte[] imageData = texture.EncodeToPNG();

                // Convert image to base64 and store it in PlayerPrefs
                string base64Image = Convert.ToBase64String(imageData);
                PlayerPrefs.SetString(url, base64Image);

                // Save image reference in JSON file
                Dictionary<string, string> imageReferences = LoadImageReferences();
                imageReferences[imageName] = url;
                SaveImageReferences(imageReferences);
                _onComplete?.Invoke(texture);
                Debug.Log("Image downloaded and saved: " + imageName);
            }
            else
            {
                Debug.LogError("Failed to download image: " + webRequest.error);
            }
        }
    }

    // Load image references from JSON
    private Dictionary<string, string> LoadImageReferences()
    {
        string json = PlayerPrefs.GetString(jsonKey, "{}");
        return JsonUtility.FromJson<SerializableDictionary<string, string>>(json).ToDictionary();
    }

    // Save image references to JSON
    private void SaveImageReferences(Dictionary<string, string> imageReferences)
    {
        string json = JsonUtility.ToJson(new SerializableDictionary<string, string>(imageReferences));
        Debug.Log(json);
        PlayerPrefs.SetString(jsonKey, json);
    }
}
// Serializable dictionary to handle JSON conversions
[System.Serializable]
public class SerializableDictionary<TKey, TValue>
{
    public List<TKey> keys = new List<TKey>();
    public List<TValue> values = new List<TValue>();

    public SerializableDictionary(Dictionary<TKey, TValue> dict)
    {
        keys = new List<TKey>(dict.Keys);
        values = new List<TValue>(dict.Values);
    }

    public Dictionary<TKey, TValue> ToDictionary()
    {
        Dictionary<TKey, TValue> dict = new Dictionary<TKey, TValue>();
        for (int i = 0; i < keys.Count; i++)
        {
            dict[keys[i]] = values[i];
        }
        return dict;
    }
}
