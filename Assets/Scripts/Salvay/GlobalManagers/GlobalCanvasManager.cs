using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GlobalCanvasManager : SingletonBase<GlobalCanvasManager>
{
     [SerializeField]
     private GameObject spinner;

     [SerializeField] 
     private SockerPrompterUIHandler socketPrompter;
     
     [SerializeField] 
     private LoadingPanelUIHandler loadingPanel;
     
     public LoadingPanelUIHandler LoadingPanel => loadingPanel;

     public void ShowHideSpinner(bool state)
     {
         spinner.SetActive(state); 
     }
}
