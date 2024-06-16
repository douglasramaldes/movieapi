const { initializeApp, getApps, getApp } = require("firebase/app");
const admin = require("firebase-admin");
const { getAuth } = require("firebase/auth");

const firebaseAppConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const firebaseConfig = {
  type: "service_account",
  project_id: process.env.FIREBASE_ADM_PROJECT_ID,
  private_key_id: process.env.FIREBASE_ADM_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_ADM_PRIVATE_KEY,
  client_email: process.env.FIREBASE_ADM_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_ADM_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x2eol%40movieapp-27e7d.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseAppConfig);
const auth = getAuth(app);

module.exports = { admin, auth, app };
