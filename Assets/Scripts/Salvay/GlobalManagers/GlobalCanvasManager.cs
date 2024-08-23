using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GlobalCanvasManager : SingletonBase<GlobalCanvasManager>
{
     [SerializeField]
     private GameObject spinner;

     public void ShowHideSpinner(bool state)
     {
         spinner.SetActive(state); 
     }
}
