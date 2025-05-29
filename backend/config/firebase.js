const admin = require('firebase-admin');

const serviceAccount = require('../credentials/vizzuary-backend-firebase-adminsdk-fbsvc-e652e86368.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://PROJECT_ID.firebaseio.com" // só se for usar o Realtime DB
});

const db = admin.firestore();

module.exports = { admin, db };