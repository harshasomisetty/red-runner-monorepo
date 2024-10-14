const admin = require('firebase-admin');
const { CONFLICT, FORBIDDEN } = require('http-status');
const ApiError = require('../utils/ApiError');

admin.initializeApp({
  // Or use a service account key file:
  credential: admin.credential.cert(require('../../firebase-service-account.json')),
});

/**
 * Create a user
 * @returns {Promise<User>}
 * @param userId
 * @param idToken
 */

const verifyFirebaseToken = async (userId,idToken) => {
  try {
    const fid = await admin.auth().verifyIdToken(idToken);

    if(userId !== fid.uid)
      throw new ApiError(FORBIDDEN, 'Firebase token does not match with userId');
  } catch (e) {
    throw e;
  }
}

exports.verifyFirebaseToken = verifyFirebaseToken;


