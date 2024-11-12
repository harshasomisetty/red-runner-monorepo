const admin = require('firebase-admin');
const { CONFLICT, FORBIDDEN } = require('http-status');
const ApiError = require('../utils/ApiError');

admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

/**
 * Create a user
 * @returns {Promise<User>}
 * @param userId
 * @param idToken
 */

const verifyFirebaseToken = async (userId, idToken) => {
  try {
    const fid = await admin.auth().verifyIdToken(idToken);

    if (userId !== fid.uid) throw new ApiError(FORBIDDEN, 'Firebase token does not match with userId');
  } catch (e) {
    throw e;
  }
};

exports.verifyFirebaseToken = verifyFirebaseToken;
