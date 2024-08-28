using RedRunner.UI;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;


[ExecuteInEditMode]
public class CustomComponentReplacement : MonoBehaviour
{
    public GameObject[] myoldbutton;

    public bool startChange = false;

    private void Update()
    {
        if (startChange)
        {
            startChange = false;
            for(int i = 0; i < myoldbutton.Length; i++)
            {
                if (myoldbutton[i] != null)
                {
                    Button oldbutton = myoldbutton[i].GetComponent<Button>();

                    DestroyImmediate(myoldbutton[i].GetComponent<Button>());

                    UIButton customButton = myoldbutton[i].AddComponent<UIButton>();

                    customButton.GetComponent<UIButton>().onClick = oldbutton.onClick;
                }
            }
            

        }
    }
    public void onclickevent()
    {

    }
}
