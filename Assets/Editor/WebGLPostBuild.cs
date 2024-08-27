using UnityEngine;
using UnityEditor;
using UnityEditor.Callbacks;
using System.IO;

public class WebGLPostBuild : MonoBehaviour
{
    [PostProcessBuild]
    public static void OnPostProcessBuild(BuildTarget target, string pathToBuiltProject)
    {
        if (target == BuildTarget.WebGL)
        {
            // Path to the index.html file in the build output
            string pathToIndexHTML = Path.Combine(pathToBuiltProject, "index.html");

            if (File.Exists(pathToIndexHTML))
            {
                // Read the original index.html
                string htmlText = File.ReadAllText(pathToIndexHTML);

                // JavaScript function to be injected
                string jsToInject = @"
<script type='text/javascript'>
    function OpenURLInNewTab(url) {
        window.open(url, '_blank');
    }
</script>";

                // Inject the JavaScript before the closing </head> tag
                htmlText = htmlText.Replace("</head>", jsToInject + "\n</head>");

                // Write the modified HTML back to the file
                File.WriteAllText(pathToIndexHTML, htmlText);

                Debug.Log("Injected JavaScript function into index.html");
            }
            else
            {
                Debug.LogError("index.html not found, couldn't inject JavaScript.");
            }
        }
    }
}