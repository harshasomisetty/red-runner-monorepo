using System.Collections.Generic;
using UnityEngine;

public class LeaderboardManager : MonoBehaviour
{
    public LeaderboardCell UserPositionCell;
    public Transform cellContainer;
    public GameObject LeaderBoardCell;
    public Sprite[] Medals, Gifts;
    public List<LeaderboardCell> cells;

    [Header("Leaderboard Windows")]
    public GameObject LeaderboardWindow;

    [Header("Leaderboard Scenario")]
    public GameObject LeaderBoardLoading;
    public GameObject LeaderboardFailure;
    public GameObject BackButton;

    private LeaderboardCell GetCell(int index)
    {
        if (index < cellContainer.childCount)
        {
            return cellContainer.GetChild(index).GetComponent<LeaderboardCell>();
        }
        else
        {
            return Instantiate(LeaderBoardCell, cellContainer).GetComponent<LeaderboardCell>();
        }
    }
    public void GetAllScores(bool success, List<Leaderboard> data)
    {
        if (success)
        {
            Debug.Log("Leaderboard Data Success");
            if (data.Count == 0)
            {
                ToggleLeaderBoardFailurePrompt(true);
                return;
            }
            cells.Clear();
            for (int i = 0; i < data.Count; i++)
            {
                if (StaticDataBank.playerlocalid == data[i].userId)
                {
                    LeaderboardCell cell = UserPositionCell;
                    cell.name = i.ToString();
                    cell.SetValues(i, Medals, data[i].name, data[i].score, Gifts);
                    cells.Add(cell);
                    cell.gameObject.SetActive(true);
                }
                else
                {
                    LeaderboardCell cell = GetCell(i);
                    cell.name = i.ToString();
                    cell.SetValues(i, Medals, data[i].name, data[i].score, Gifts);
                    cells.Add(cell);
                    cell.gameObject.SetActive(true);
                }
            }
            ToggleLeaderBoardFailurePrompt(false);
        }
        else
        {
            ToggleLeaderBoardFailurePrompt(true);
            Debug.Log("Leaderboard data failed");
        }    
    }
    public void ToggleLeaderBoardFailurePrompt(bool State)
    {
        LeaderboardFailure.SetActive(State);
        LeaderBoardLoading.SetActive(false);
        BackButton.SetActive(true);
    }
    public void ToggleLeaderboardWindow(bool State)
    {
        LeaderboardWindow.SetActive(State);
        LeaderBoardLoading.SetActive(State);
        BackButton.SetActive(!State);
        if (State == false)
        {
            ResetActiveCells(State);
            LeaderboardFailure.SetActive(State);
        }
        if (State)
        {
            API_Manager.Instance.Leadboard_GetAll(GetAllScores);
        }
        UIManager.Instance.ToggleMainScreen(!State);
    }
    void ResetActiveCells(bool state)
    {
        foreach (LeaderboardCell curcell in cells)
        {
            if (curcell != null)
            {
                curcell.gameObject.SetActive(state);
            }
        }
    }
}
