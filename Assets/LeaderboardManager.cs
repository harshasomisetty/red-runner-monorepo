using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LeaderboardManager : MonoBehaviour
{
    public Transform[] PlayersOnList;
    private void OnEnable()
    {
        GoogleAndFirebaseAuth.instance.Leadboard_GetAll(GetAllScores);
    }
    public void GetAllScores(bool success, List<Root> data)
    {
        if(success)
        {
            for(int i = 0; i < PlayersOnList.Length; i++)
            {
                if (i < data.Count)
                {
                    PlayersOnList[i].gameObject.SetActive(true);
                    PlayersOnList[i].GetChild(2).GetComponent<Text>().text = "" + data[i].name;
                    PlayersOnList[i].GetChild(4).GetComponent<Text>().text = "" + data[i].score;
                }
                else
                {
                    PlayersOnList[i].gameObject.SetActive(false);
                }
            }
        }
    }
}
