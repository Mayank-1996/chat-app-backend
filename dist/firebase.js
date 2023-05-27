"use strict";
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCLFNtftzmWnzVyi_eB9vq5N4_46wne1Gc",
//   authDomain: "fir-push-chat-app.firebaseapp.com",
//   projectId: "fir-push-chat-app",
//   storageBucket: "fir-push-chat-app.appspot.com",
//   messagingSenderId: "16397956711",
//   appId: "1:16397956711:web:6661ea70a4fdab9a0a86c2",
//   measurementId: "G-M18R9XG01Y",
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging();
exports.admin = require("firebase-admin");
let serviceAccount = require("./secrets/serviceAccountKey.json");
exports.admin.initializeApp({
    credential: exports.admin.credential.cert(serviceAccount)
});
