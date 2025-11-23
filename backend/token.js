import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

// Load service account from .env
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// CHANGE EMAIL BELOW
const testEmail = "test1@gmail.com";

async function generateToken() {
  try {
    // Get the user by email
    const user = await admin.auth().getUserByEmail(testEmail);

    // Create a custom token
    const token = await admin.auth().createCustomToken(user.uid);

    console.log("Generated Firebase Token:");
    console.log(token);
  } catch (err) {
    console.error("Error:", err);
  }
}

generateToken();
