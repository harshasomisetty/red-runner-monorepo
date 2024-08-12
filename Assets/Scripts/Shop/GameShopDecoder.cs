using Newtonsoft.Json;
using UnityEngine;
using UnityEngine.Purchasing.MiniJSON;


public class GameShopDecoder : MonoBehaviour
{
    public static GameShopDecoder Instance;
    public GameShop GameShop;
    //Public for debugging//
    public string DataString;


    private void Awake()
    {
        Instance = this;
    }
    void Start()
    {
        API_Manager.instance.GetShopData(GetAllShopData);
    }
    
    void GetAllShopData(bool sucess, string response)
    {
        if(sucess)
        {
            PopulateDataString(response);
            GameShop _gameShop  = JsonUtility.FromJson<GameShop>(DataString);
            GameShop = _gameShop;
        }
        else
        {
            Debug.Log("Data failed");
        }
    }
    void PopulateDataString(string Str)
    {
        DataString = Str;
    }
}