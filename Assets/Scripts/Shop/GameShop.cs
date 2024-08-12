using System;
using System.Collections.Generic;
using static GameShop.Boosters;

[Serializable]
public class GameShop
{
    public Boosters boosters;
    public Skins skins;

    [Serializable]
    public struct Boosters
    {
        public SpeedBoosters speed_boosters;
        public DoubleJumpBoosters double_jump_boosters;

        [Serializable]
        public struct SpeedBoosters
        {
            public Booster speed_booster_3;
            public Booster speed_booster_6;
            public Booster speed_booster_10;
            public Booster speed_booster_999;
        }
        [Serializable]
        public struct DoubleJumpBoosters
        {
            public Booster double_jump_3;
            public Booster double_jump_6;
            public Booster double_jump_10;
            public Booster double_jump_999;
        }
    }
    [Serializable]
    public struct Skins
    {
        public Skin alienSkin;
        public Skin robotSkin;
        public Skin christmasSkin;
        public Skin halloweenSkin;
        public Skin polkaDotSkin;
        public Skin solanaSkin;
        public Skin spaceSkin;
        public Skin thiefSkin;
        public Skin wrestlerSkin;
        public Skin zombieSkin;
    }
    [Serializable]
    public struct Booster
    {
        public List<Attribute> attributes;
        public string collectionId;
        public string description;
        public string imageUrl;
        public string name;
        public List<Price> price;
    }
    [Serializable]
    public struct Skin
    {
        public List<Attribute> attributes;
        public string collectionId;
        public string description;
        public string imageUrl;
        public string name;
        public List<Price> price;
    }
    [Serializable]
    public struct Attribute
    {
        public string traitType;
        public string value;
    }
    [Serializable]
    public struct Price
    {
        public string currencyId;
        public string price;
    }
}
namespace GameShopData
{
    [Serializable]
    public class GameShopData
    {
        [Serializable]
        public class GameShopAssets
        {
            public List<Booster> SpeedBoosters;
            public List<Booster> DoubleJumpBoosters;
            public List<Skin> Skins;
        }

        [Serializable]
        public class Booster
        {
            public List<Attribute> Attributes;
            public string CollectionId;
            public string Description;
            public string ImageUrl;
            public string Name;
            public string BoosterType;
            public int BoosterMultiplier;
            public List<Price> Price;
        }

        [Serializable]
        public class Skin
        {
            public List<Attribute> Attributes;
            public string CollectionId;
            public string Description;
            public string ImageUrl;
            public string Name;
            public string SkinType;
            public List<Price> Price;
        }

        [Serializable]
        public class Attribute
        {
            public string TraitType;
            public string Value;
        }

        [Serializable]
        public class Price
        {
            public string CurrencyId;
            public string price;
        }
    }
}