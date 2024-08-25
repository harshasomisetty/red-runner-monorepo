using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.Networking;

public class ImageCache : MonoBehaviour
{
    private string cacheDirectory;
    private Dictionary<string, string> urlToPathMap = new Dictionary<string, string>();
    private string cacheFilePath;

    void Start()
    {
        cacheDirectory = Path.Combine(Application.persistentDataPath, "ImageCache");
        cacheFilePath = Path.Combine(cacheDirectory, "cache.json");
        
        // Create cache directory if it doesn't exist
        if (!Directory.Exists(cacheDirectory))
        {
            Directory.CreateDirectory(cacheDirectory);
        }

        // Load cache from file
        LoadCache();

        // Validate cache entries
        ValidateCache();
    }

    public void DownloadImage(string imageUrl, Action<Texture2D> onComplete)
    {
        if (urlToPathMap.ContainsKey(imageUrl))
        {
            string localPath = urlToPathMap[imageUrl];
            if (File.Exists(localPath))
            {
                StartCoroutine(LoadImageFromLocal(localPath, onComplete));
                return;
            }
            else
            {
                urlToPathMap.Remove(imageUrl);
            }
        }

        StartCoroutine(DownloadImageCoroutine(imageUrl, onComplete));
    }

    private IEnumerator DownloadImageCoroutine(string imageUrl, Action<Texture2D> onComplete)
    {
        using (UnityWebRequest request = UnityWebRequestTexture.GetTexture(imageUrl))
        {
            yield return request.SendWebRequest();

            if (request.result == UnityWebRequest.Result.Success)
            {
                Texture2D texture = DownloadHandlerTexture.GetContent(request);
                string fileName = Guid.NewGuid().ToString() + ".png";
                string localPath = Path.Combine(cacheDirectory, fileName);

                File.WriteAllBytes(localPath, texture.EncodeToPNG());

                urlToPathMap[imageUrl] = localPath;
                SaveCache();

                onComplete?.Invoke(texture);
            }
            else
            {
                Debug.LogError($"Failed to download image from {imageUrl}: {request.error}");
                onComplete?.Invoke(null);
            }
        }
    }

    private IEnumerator LoadImageFromLocal(string localPath, Action<Texture2D> onComplete)
    {
        string url = "file://" + localPath;

        using (UnityWebRequest request = UnityWebRequestTexture.GetTexture(url))
        {
            yield return request.SendWebRequest();

            if (request.result == UnityWebRequest.Result.Success)
            {
                Texture2D texture = DownloadHandlerTexture.GetContent(request);
                onComplete?.Invoke(texture);
            }
            else
            {
                Debug.LogError($"Failed to load image from {localPath}: {request.error}");
                onComplete?.Invoke(null);
            }
        }
    }

    private void LoadCache()
    {
        if (File.Exists(cacheFilePath))
        {
            string json = File.ReadAllText(cacheFilePath);
            urlToPathMap = JsonUtility.FromJson<SerializableDictionary>(json).ToDictionary();
        }
    }

    private void SaveCache()
    {
        SerializableDictionary serializableMap = new SerializableDictionary(urlToPathMap);
        string json = JsonUtility.ToJson(serializableMap, true);
        File.WriteAllText(cacheFilePath, json);
    }

    private void ValidateCache()
    {
        List<string> keysToRemove = new List<string>();

        foreach (var pair in urlToPathMap)
        {
            if (!File.Exists(pair.Value))
            {
                keysToRemove.Add(pair.Key);
            }
        }

        foreach (var key in keysToRemove)
        {
            urlToPathMap.Remove(key);
        }

        if (keysToRemove.Count > 0)
        {
            SaveCache();
        }
    }
}

[Serializable]
public class SerializableDictionary
{
    public List<string> keys;
    public List<string> values;

    public SerializableDictionary(Dictionary<string, string> dictionary)
    {
        keys = new List<string>(dictionary.Keys);
        values = new List<string>(dictionary.Values);
    }

    public Dictionary<string, string> ToDictionary()
    {
        Dictionary<string, string> dictionary = new Dictionary<string, string>();

        for (int i = 0; i < keys.Count; i++)
        {
            dictionary[keys[i]] = values[i];
        }

        return dictionary;
    }
}
