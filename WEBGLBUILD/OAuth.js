var gameInstance = null;
// Function to open the Google OAuth sign-in window
function signInWithGoogle(myclientId, myredirectUri) {
    console.log("This is working");
    const GOOGLE_OAUTH_AUTHORIZE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
    const RESPONSE_TYPE = 'code';
    const SCOPE = 'email profile';
    const clientId=myclientId;
    const redirectUri=myredirectUri;
    const authorizeUrl = `${GOOGLE_OAUTH_AUTHORIZE_URL}?redirect_uri=${encodeURIComponent(redirectUri)}&client_id=${clientId}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPE)}`;
    // Open a new popup window for the Google login
    var popup = window.open(authorizeUrl, 'googleLogin', 'width=500,height=600');

    // Function to monitor the popup state
    var interval = setInterval(function() {
        try {
            // Check if the popup was closed
            if (popup.closed) {
                clearInterval(interval);
                alert('Authentication popup closed by user');
                return;
            }

            // Try to access the popup's URL
            var popupUrl = popup.location.href;

            // Check if the popup URL is the redirect URI
            if (popupUrl.indexOf(redirectUri) === 0) {
                clearInterval(interval);
                var code = new URL(popupUrl).searchParams.get('code');
                if (code) {
                    console.log('Authorization code:', code);

                    // fetch token and then profile using firebase rest api 

                    // You can now close the popup and use the authorization code in the main window
                    popup.close();
                  //  authenticateWithGoogleToken(code);
                    // Example: Call a function to handle the authorization code
                    sendAuthCodeToUnity(code);
                }
            }
        } catch (e) {
            // Error handling, typically for cross-origin requests
        }
    }, 100);
}

// Function to be called from Unity to start the OAuth flow
function startGoogleAuth(clientId, redirectUri) {
    signInWithGoogle(clientId, redirectUri);
}
// This function can be called anytime to send the auth code to Unity, if available
function sendAuthCodeIfAvailable() {
    var queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('code')) {
        var authCode = queryParams.get('code');
        sendAuthCodeToUnity(authCode);
        // Clear the code from the URL to avoid re-sending it
        history.pushState(null, '', location.pathname);
    }
}
document.addEventListener('UnityReady', function() {
    // Now you can safely use unityGameInstance
    console.log(unityGameInstance); // Example usage
    gameInstance = unityGameInstance;
    // Additional code that depends on unityGameInstance
});
// Function to pass the authorization code to Unity
function sendAuthCodeToUnity(authCode) {
    // Assuming you have a Unity object named 'gameInstance'
    if (gameInstance) {
        gameInstance.SendMessage('GoogleAndFirebaseAuth', 'OnGoogleSignIn', authCode);
    }else {
        console.error("Unity game instance is not yet initialized.");
      }
}

function startTwitterAuth(clientId, redirectUri) {
    const TWITTER_OAUTH_AUTHORIZE_URL = 'https://twitter.com/i/oauth2/authorize';
    const RESPONSE_TYPE = 'code';
    const SCOPE = 'tweet.read users.read offline.access'; // Include other scopes you might need
    const STATE = "state"; // You should generate a random string for state
    const CODE_CHALLENGE = generateCodeChallenge(); // Generate your code challenge here
    const CODE_CHALLENGE_METHOD = 'S256'; // Assuming you're using SHA-256

    // Construct the full authorization URL
    const authorizeUrl = `${TWITTER_OAUTH_AUTHORIZE_URL}?` +
        `response_type=${encodeURIComponent(RESPONSE_TYPE)}` +
        `&client_id=${encodeURIComponent(clientId)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=${encodeURIComponent(SCOPE)}` +
        `&state=${encodeURIComponent(STATE)}` +
        `&code_challenge=${encodeURIComponent(CODE_CHALLENGE)}` +
        `&code_challenge_method=${encodeURIComponent(CODE_CHALLENGE_METHOD)}`;

    console.log('Redirecting to:', authorizeUrl);

    var popup = window.open(authorizeUrl, 'twitterLogin', 'width=500,height=600');

    // Function to monitor the popup state
    var interval = setInterval(function() {
        try {
		var popupUrl = popup.location.href;
		console.log("popupUrl",popupUrl);
            // Check if the popup was closed
            if (popup.closed) {
                clearInterval(interval);
                alert('Authentication popup closed by user');
                return;
            }

            

            // Check if the popup URL is the redirect URI
            if (popupUrl.indexOf(redirectUri) === 0) {
                clearInterval(interval);
                var code = new URL(popupUrl).searchParams.get('code');
                if (code) {
                    console.log('Authorization code:', code);
                    // You can now close the popup and use the authorization code in the main window
                    popup.close();

                    // Example: Call a function to handle the authorization code
                    sendAuthDataToUnity(code);
                }
            }
        } catch (e) {
            // Error handling, typically for cross-origin requests
        }
    }, 100);
}

function generateRandomState() {
    // Simple example of state generation
    return Math.random().toString(36).substring(2, 15);
}
function generateCodeChallenge() {
    // Implement your code challenge generation logic here (PKCE)
    return 'y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8'; // Replace this with the actual code challenge
}
// Call this function from the server-side once Twitter redirects to your callback URL
// and after you've exchanged the code for an access token
function sendAuthDataToUnity(accessToken) {
    // Assuming you have a Unity object named 'gameInstance'
    gameInstance.SendMessage('GoogleAndFirebaseAuth', 'OnGoogleSignIn', accessToken);
}