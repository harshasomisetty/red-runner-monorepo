using System.Collections;
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
    public void GetAllScores(bool success, LeaderboarData data)
    {
        if(success)
        {
            for(int i = 0; i < PlayersOnList.Length; i++)
            {
                PlayersOnList[i].GetChild(2).GetComponent<Text>().text = "" + data.data[i].name;
                PlayersOnList[i].GetChild(4).GetComponent<Text>().text = "" + data.data[i].score;
            }
        }
    }
}
