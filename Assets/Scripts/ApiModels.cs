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
        public Collection collection;
        public long? created;
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
    public struct Root
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
