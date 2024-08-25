using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GlobalCanvasManager : SingletonBase<GlobalCanvasManager>
{
     [SerializeField] 
     private SockerPrompterUIHandler socketPrompter;
     public SockerPrompterUIHandler SocketPrompter => socketPrompter;
     
     [SerializeField] 
     private LoadingPanelUIHandler loadingPanel;
     public LoadingPanelUIHandler LoadingPanel => loadingPanel;
}
