using UnityEngine;
using UnityEditor;
using UnityEditor.Callbacks;
using System.IO;

public class WebGLPostProcessBuild
{
    [PostProcessBuild]
    public static void OnPostprocessBuild(BuildTarget target, string pathToBuiltProject)
    {
        if (target == BuildTarget.WebGL)
        {
            // Path to the index.html file in the WebGL build folder
            string indexPath = Path.Combine(pathToBuiltProject, "index.html");

            // Read the existing index.html content
            string indexContent = File.ReadAllText(indexPath);

            // JavaScript function to add with improved options for a pop-up window
            string jsToAdd = @"
    <script type='text/javascript'>
        function OpenPopupWindow(url, title) {
            var width = screen.width / 4;
            var height = screen.height / 4;
            var left = (screen.width - width) / 2;
            var top = (screen.height - height) / 2;
            var options = 'width=' + width + ', height=' + height + 
                          ', top=' + top + ', left=' + left + 
                          ', resizable=yes, scrollbars=yes, toolbar=no, menubar=no, location=no, directories=no, status=no';

            var newWindow = window.open(url, title, options);

            if (newWindow) {
                newWindow.focus();
            } else {
                alert('Popup blocked! Please allow popups for this website.');
            }
        }
    </script>";

            // Insert the JavaScript just before the closing </head> tag
            string closingHeadTag = "</head>";
            if (indexContent.Contains(closingHeadTag))
            {
                indexContent = indexContent.Replace(closingHeadTag, jsToAdd + "\n" + closingHeadTag);
            }

            // Adding the OAuth.js script to the body
            string oauthScript = "<script src=\"OAuth.js\"></script>";
            string openingBodyTag = "<body>";
            if (indexContent.Contains(openingBodyTag))
            {
                indexContent = indexContent.Replace(openingBodyTag, openingBodyTag + "\n" + oauthScript);
            }

            // Replace the specific block in the body script
            string originalScriptBlock = @"
      var script = document.createElement(""script"");
      script.src = loaderUrl;
      script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
          progressBarFull.style.width = 100 * progress + ""%"";
              }).then((unityInstance) => {
                loadingBar.style.display = ""none"";
                fullscreenButton.onclick = () => {
                  unityInstance.SetFullscreen(1);
                };
              }).catch((message) => {
                alert(message);
              });
            };

      document.body.appendChild(script);";

            string replacementScriptBlock = @"
      var script = document.createElement(""script"");
      script.src = loaderUrl;
      script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
          progressBarFull.style.width = 100 * progress + ""%"";
              }).then((unityInstance) => {
                  unityGameInstance = unityInstance;
                loadingBar.style.display = ""none"";
                fullscreenButton.onclick = () => {
                  unityInstance.SetFullscreen(1);
                };
                document.dispatchEvent(new Event('UnityReady'));
              }).catch((message) => {
                alert(message);
              });
            };

      document.body.appendChild(script);";

            if (indexContent.Contains(originalScriptBlock))
            {
                indexContent = indexContent.Replace(originalScriptBlock, replacementScriptBlock);
            }

            // Write the modified content back to index.html
            File.WriteAllText(indexPath, indexContent);

            Debug.Log("Custom JavaScript and OAuth script added to index.html");
            
            PutOauthFile(target, pathToBuiltProject);
        }
    }

    [PostProcessBuild]
    private static void PutOauthFile(BuildTarget target, string pathToBuiltProject)
    {
        if (target == BuildTarget.WebGL)
        {
            // Path to the WebGL build folder
            string buildPath = pathToBuiltProject;

            // Your desired file's path in the Unity project
            string sourceFilePath = Path.Combine(Application.dataPath, "Files/OAuth.js"); // Replace with your file's path

            // Destination path - where the index.html is located
            string destinationPath = Path.Combine(buildPath, "OAuth.js"); // The same filename as the source

            // Copy the file
            File.Copy(sourceFilePath, destinationPath, true);

            Debug.Log("File moved to WebGL build folder successfully!");
        }
    }
}
