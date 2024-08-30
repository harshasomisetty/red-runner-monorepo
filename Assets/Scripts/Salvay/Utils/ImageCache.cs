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
        if (Application.platform != RuntimePlatform.WebGLPlayer)
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
            else
            {
                StartCoroutine(DownloadImageCoroutine(imageUrl, onComplete));
            }
        }
        else 
        {
            StartCoroutine(DownloadImageCoroutine(imageUrl, onComplete));
            
        }
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


#if UNITY_WEBGL && !UNITY_EDITOR
                SaveImage(localPath, texture);
#else
                File.WriteAllBytes(localPath, texture.EncodeToPNG());
#endif

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
        // In WebGL, we just use the path directly without file://
#if UNITY_WEBGL && !UNITY_EDITOR
        //string url = localPath;
        yield return new WaitForSecondsRealtime(1f);
        Texture2D myTexture = LoadImageFromBase64(localPath);
        onComplete?.Invoke(myTexture);

#else
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
#endif
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

    public string ConvertImageToBase64(Texture2D texture)
    {
        byte[] imageData = texture.EncodeToPNG();
        return Convert.ToBase64String(imageData);
    }

    // Load an image from Base64 string
    public Texture2D LoadImageFromBase64(string base64Data)
    {
        byte[] imageData = Convert.FromBase64String(base64Data);
        Texture2D texture = new Texture2D(2, 2);
        texture.LoadImage(imageData);
        return texture;
    }
    public void SaveImage(string key, Texture2D texture)
    {
        string base64Data = ConvertImageToBase64(texture);
        Application.ExternalCall("SaveImageToIndexedDB", key, base64Data);
    }
    private Action<string> onImageLoaded;
    public void LoadImage(string key)
    {
        onImageLoaded = OnImageLoaded;
        Application.ExternalCall("LoadImageFromIndexedDB", key, onImageLoaded);
    }

    private void OnImageLoaded(string base64Data)
    {
        if (!string.IsNullOrEmpty(base64Data))
        {
            Texture2D texture = LoadImageFromBase64(base64Data);
            // Now you can use this texture in your application, e.g., apply it to a UI element or a GameObject
            Debug.Log("Image loaded successfully!");
        }
        else
        {
            Debug.Log("No image found for the given key.");
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
