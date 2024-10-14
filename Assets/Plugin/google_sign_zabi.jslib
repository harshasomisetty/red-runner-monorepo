mergeInto(LibraryManager.library, {
    signInWithGoogle: function(getclientId, getredirectUri) {
        const GOOGLE_OAUTH_AUTHORIZE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
        const RESPONSE_TYPE = 'code';
        const SCOPE = 'email profile';
        const clientId=getclientId;
        const redirectUri=getredirectUri;
        const authorizeUrl = `${GOOGLE_OAUTH_AUTHORIZE_URL}?redirect_uri=${encodeURIComponent(redirectUri)}&client_id=${clientId}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPE)}`;

        var popup = window.open(authorizeUrl, 'googleLogin', 'width=500,height=600');
    },

    sendAuthCodeIfAvailable: function() {
        var queryParams = new URLSearchParams(window.location.search);
        if (queryParams.has('code')) {
            var authCode = queryParams.get('code');
            Module.sendAuthCodeToUnity(authCode);
            history.pushState(null, '', location.pathname);
        }
    },

    sendAuthCodeToUnity: function(authCode) {
        if (gameInstance) {
            gameInstance.SendMessage('JSCallbackObject', 'OnGoogleSignIn', authCode);
        } else {
            console.error("Unity game instance is not yet initialized.");
        }
    },

    startTwitterAuth: function(clientId, redirectUri) {
        const TWITTER_OAUTH_AUTHORIZE_URL = 'https://twitter.com/i/oauth2/authorize';
        const RESPONSE_TYPE = 'code';
        const SCOPE = 'tweet.read users.read offline.access';
        const STATE = "state";
        const CODE_CHALLENGE = Module.generateCodeChallenge();
        const CODE_CHALLENGE_METHOD = 'S256';

        const authorizeUrl = `${TWITTER_OAUTH_AUTHORIZE_URL}?` +
            `response_type=${encodeURIComponent(RESPONSE_TYPE)}` +
            `&client_id=${encodeURIComponent(clientId)}` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&scope=${encodeURIComponent(SCOPE)}` +
            `&state=${encodeURIComponent(STATE)}` +
            `&code_challenge=${encodeURIComponent(CODE_CHALLENGE)}` +
            `&code_challenge_method=${encodeURIComponent(CODE_CHALLENGE_METHOD)}`;

        console.log('Redirecting to:', authorizeUrl);

        var popuptwitter = window.open(authorizeUrl, "'twitterLogin', 'width=500,height=600'");
    },

    notifyParentAndClose: function() {
        var popupUrl = window.location.href;
        const urlParams = new URLSearchParams(popupUrl);
        const code = urlParams.get('code');
        if (!window.closed && code) {
            localStorage.setItem('oauth_code', code);
            window.close();
        }
    },

    generateRandomState: function() {
        return Math.random().toString(36).substring(2, 15);
    },

    generateCodeChallenge: function() {
        return 'y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8'; 
    },

    sendAuthDataToUnity: function(accessToken) {
        gameInstance.SendMessage('MainMenuCanvas', 'ReceiveTwitterAuthData', accessToken);
    },

    $gameInstance: null,
    $storageEventListener: function(event) {
        if (event.key === 'oauth_code') {
            const newCode = event.newValue;
            console.log('New OAuth code detected:', newCode);
            Module.sendAuthDataToUnity(newCode);
            localStorage.clear();
            window.removeEventListener('storage', Module.storageEventListener);
        }
    },

    UnityReady: function() {
        document.addEventListener('UnityReady', function() {
            console.log(unityGameInstance);
            Module.gameInstance = unityGameInstance;
        });

        window.addEventListener('load', function() {
            console.log("Event Fired", window.closed);
            window.addEventListener('storage', Module.storageEventListener);
            if (!window.closed) {
                Module.notifyParentAndClose();
            }
        });
    }
});
