// GoogleSignIn.jslib

mergeInto(LibraryManager.library, {
  initGoogleSignIn: function(clientId) {
    window.auth2 = {};
    gapi.load('auth2', function() {
      //const byteArray = new TextEncoder().encode(clientId);
        //const str = utf8ToString(byteArray);

      window.auth2 = gapi.auth2.init({
        client_id: clientId,
        cookiepolicy: 'single_host_origin',
      }).then(function() {
        console.log('Google Auth initialized.');
      }, function(error) {
        console.error('Error initializing Google Auth:', error);
      });
    });
  },
  signIn: function() {
    if (window.auth2) {
      window.auth2.signIn().then(function(googleUser) {
        var id_token = googleUser.getAuthResponse().id_token;
        // Call Unity function to pass the ID token
        SendMessage('JSCallbackObject', 'OnGoogleSignIn', id_token);
      }).catch(function(error) {
        console.error('Error during sign-in:', error);
      });
    } else {
      console.error('Google Auth is not initialized');
    }
  }
});