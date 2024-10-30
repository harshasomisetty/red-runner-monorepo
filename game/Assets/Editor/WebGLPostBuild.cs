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

      if (!indexContent.Contains("function OpenPopupWindow"))
      {
        string jsToAdd = @"
    <script type='text/javascript'>
        function OpenPopupWindow(url, title) {
            var width = 960;
            var height = 540;
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

        string closingHeadTag = "</head>";
        indexContent = indexContent.Replace(closingHeadTag, jsToAdd + "\n" + closingHeadTag);
      }


      // Only add the OAuth.js script once if it doesn't already exist
      string oauthScript = "<script src=\"OAuth.js\"></script>";
      if (!indexContent.Contains(oauthScript))
      {
        string openingBodyTag = "<body>";
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

      // ModifyCanvasSettings(target, pathToBuiltProject);

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

  [PostProcessBuild]
  private static void ModifyCanvasSettings(BuildTarget target, string pathToBuiltProject)
  {
    if (target == BuildTarget.WebGL)
    {
      string indexPath = Path.Combine(pathToBuiltProject, "index.html");
      string indexContent = File.ReadAllText(indexPath);

      // Find and replace the if/else block with just the mobile style code
      string oldCode = @"if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Mobile device style: fill the whole browser client area with the game canvas:

        var meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
        document.getElementsByTagName('head')[0].appendChild(meta);
        container.className = ""unity-mobile"";
        canvas.className = ""unity-mobile"";

        // To lower canvas resolution on mobile devices to gain some
        // performance, uncomment the following line:
        // config.devicePixelRatio = 1;


      } else {
        // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:

        canvas.style.width = ""900px"";
        canvas.style.height = ""600px"";
      }";

      string newCode = @"// Fill the whole browser client area with the game canvas
        var meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
        document.getElementsByTagName('head')[0].appendChild(meta);
        container.className = ""unity-mobile"";
        canvas.className = ""unity-mobile"";";

      indexContent = indexContent.Replace(oldCode, newCode);
      File.WriteAllText(indexPath, indexContent);

      Debug.Log("Canvas settings modified to always use fullscreen style!");
    }
  }
}
