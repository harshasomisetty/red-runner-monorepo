using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class LeaderboardCell : MonoBehaviour
{
    public int CellNumber = 0;
    public TextMeshProUGUI rank;
    public Image userRank;
    public TextMeshProUGUI userName;
    public Image userGift;
    public TextMeshProUGUI score;

    public void SetValues(int ranknum,Sprite[] ranksprite,string name,int getscore,Sprite[] getgift)
    {
        CellNumber = ranknum;
        if (ranknum < 3)
        {
            userRank.sprite = ranksprite[ranknum];
            userName.text = name;
            rank.gameObject.SetActive(false);
            userGift.sprite = getgift[ranknum];
            userGift.enabled = false;
            score.text = getscore+" m";
            userGift.SetNativeSize();
        }
        else
        {
            userRank.enabled = false;
            rank.text = (ranknum + 1) + "";
            userName.text = name;
            userGift.enabled = false;
            score.text = getscore + " m";
        }
    }
}
