using System.Collections;
using System.Collections.Generic;
using UnityEngine;


[CreateAssetMenu(fileName = "CharacterSkins", menuName = "ScriptableObjects/CharacterSkinsScriptableObject", order = 1)]
public class CharacterSkins : ScriptableObject
{
    public RunnerSkeleton[] Skins;
}
[System.Serializable]
public class RunnerSkeleton
{
    public string RunnerName;
    public Sprite Body;
    public Sprite Eye;
    public Sprite LeftArm;
    public Sprite LeftHand;
    public Sprite LeftFoot;
    public Sprite RightArm;
    public Sprite RightHand;
    public Sprite RightFoot;

}