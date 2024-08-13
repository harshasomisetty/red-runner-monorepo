using System.Collections.Generic;
using UnityEngine;

public class LeaderboardManager : MonoBehaviour
{
    public Transform cellContainer;
    public GameObject LeaderBoardCell;
    public Sprite[] Medals, Gifts;
    public List<Cell> cells;
    public GameObject BackButton;
    private void OnEnable()
    {
        BackButton.SetActive(false);
        API_Manager.instance.Leadboard_GetAll(GetAllScores);
    }
    private Cell GetCell(int index)
    {
        if (index < cellContainer.childCount)
        {
            return cellContainer.GetChild(index).GetComponent<Cell>();
        }
        else
        {
            return Instantiate(LeaderBoardCell, cellContainer).GetComponent<Cell>();
        }
    }
    public void GetAllScores(bool success, List<Leaderboard> data)
    {
        BackButton.SetActive(true);
        if (success)
        {
            Debug.Log("Leaderboard Data Success");
            if (data.Count == cells.Count)
            {
                Debug.Log("Same data as previous");
                return;
            }
            foreach(Cell curcell in cells)
            {
                if (curcell != null)
                {
                    curcell.gameObject.SetActive(false);
                }
            }
            cells.Clear();
            for (int i = 0; i < data.Count; i++)
            {
                Cell cell = GetCell(i);
                cell.name = i.ToString();
                cell.SetValues(i, Medals, data[i].name, data[i].score, Gifts);
                cells.Add(cell);
                cell.gameObject.SetActive(true);
            }
        }
        else
        {
            Debug.Log("Leaderboard data failed");
        }    
    }
}
