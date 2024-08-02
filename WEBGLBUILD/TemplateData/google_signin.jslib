// google_signin.js

mergeInto(LibraryManager.library, {
	function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;

  // Pass the id_token to Unity
  SendMessage('JSCallbackObject', 'OnGoogleSignIn', id_token);
}

function initGoogleSignIn(clientId) {
  gapi.load('auth2', function() {
    auth2 = gapi.auth2.init({
      client_id: clientId,
      cookiepolicy: 'single_host_origin',
    });
  });
}

function signIn() {
  auth2.signIn().then(onSignIn);
}
 
});