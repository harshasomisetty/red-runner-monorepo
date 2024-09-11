using System;
using System.Collections.Generic;


public struct ApiModels
{

}
[Serializable]
public struct Leaderboard
{
    public string name;
    public string userId;
    public int score;
    public int rank;
    public DateTime createdAt;
    public DateTime updatedAt;
}
[Serializable]
public struct InventoryData
{
    [Serializable]
    public struct Attribute
    {
        public string value;
        public string traitType;
    }
    [Serializable]
    public struct Collection
    {
        public string id;
    }
    [Serializable]
    public struct Datum
    {
        public string type;
        public Item item;
        public string quantity;
    }
    [Serializable]
    public struct Item
    {
        public string id;
        public string mintAddress;
        public string name;
        public string symbol;
        public bool? escrow;
        public Collection collection;
        public long? created;
        public object priceCents;
        public string itemId;
        public List<Attribute> attributes;
        public string description;
        public string environment;
        public string imageUrl;
        public string status;
        public Owner owner;
    }
    [Serializable]
    public struct Owner
    {
        public string address;
        public string referenceId;
    }
    [Serializable]
    public class Root
    {
        public List<Datum> data;
        public Meta meta;
    }
    [Serializable]
    public class Meta
    {
        public int page;
        public int perPage;
        public int totalPages;
        public int totalResults;
    }
}
[Serializable]
public struct MarketPlace
{
    [Serializable]
    public struct Attribute
    {
        public string value ;
        public string traitType;
    }
    [Serializable]
    public struct Collection
    {
        public string id ;
    }
    [Serializable]
    public struct Datum
    {
        public string type ;
        public Item item ;
    }
    [Serializable]
    public struct Item
    {
        public string id ;
        public bool escrow ;
        public Collection collection ;
        public long created ;
        public int priceCents ;
        public string itemId ;
        public List<Attribute> attributes ;
        public string name ;
        public string description ;
        public string environment ;
        public string imageUrl ;
        public string status ;
        public string mintAddress ;
        public Owner owner ;
    }
    [Serializable]
    public struct Meta
    {
        public int page ;
        public int perPage ;
        public int totalPages ;
        public int totalResults ;
    }
    [Serializable]
    public struct Owner
    {
        public string address ;
        public string referenceId ;
    }
    [Serializable]
    public class Root
    {
        public List<Datum> data ;
        public Meta meta ;
    }
}
