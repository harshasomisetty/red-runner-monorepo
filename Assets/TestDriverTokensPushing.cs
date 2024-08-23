using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TestDriverTokensPushing : MonoBehaviour
{
    // Start is called before the first frame update
    void OnEnable()
    {
        GlobalFeaturesManager.Instance.SetTokensToPushQty(5);
    }

}
