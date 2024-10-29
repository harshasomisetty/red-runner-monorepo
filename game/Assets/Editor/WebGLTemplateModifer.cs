using UnityEngine;
using UnityEditor;
using UnityEditor.Callbacks;
using System.IO;
using System.Text.RegularExpressions;

public class WebGLTemplateModifier : EditorWindow
{
    [PostProcessBuild(1)]
    public static void OnPostprocessBuild(BuildTarget target, string pathToBuiltProject)
    {
        if (target != BuildTarget.WebGL)
            return;

        string indexPath = Path.Combine(pathToBuiltProject, "index.html");
        if (!File.Exists(indexPath))
            return;

        string content = File.ReadAllText(indexPath);

        // Remove the webgl-logo and build-title divs
        content = Regex.Replace(content, @"<div id=""unity-webgl-logo""></div>\s*", "");
        content = Regex.Replace(content, @"<div id=""unity-build-title"">.*?</div>\s*", "");

        File.WriteAllText(indexPath, content);
        Debug.Log("WebGL template modified: Removed logo and build title");
    }
}