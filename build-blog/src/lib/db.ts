// import { getApp, getApps, initializeApp } from "firebase/app";
// import {
//   browserSessionPersistence,
//   getAuth,
//   onAuthStateChanged,
//   setPersistence,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCed_RIjX4QE3c15p4ZW49vRnhQ26bFB0o",
//   authDomain: "build-blog-e02bd.firebaseapp.com",
//   projectId: "build-blog-e02bd",
//   storageBucket: "build-blog-e02bd.appspot.com",
//   messagingSenderId: "851011778678",
//   appId: "1:851011778678:web:462a79df8cb68e5cc14757",
//   measurementId: "G-X7HZDCGKWW",
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const storage = getStorage(app);

// // const firebaseApp = getApp()
// // const db = getFirestore(app);

// export function uploadFile(refName: string, file: File) {
//   const fileRef = ref(storage, refName);

//   uploadBytes(fileRef, file).then(() => {
//     console.log("uploaded file");
//   });
// }

// export async function downloadFile() {
//   const fileRef = ref(storage, "example/fileRef");
//   try {
//     const url = await getDownloadURL(fileRef);

//     return url;
//   } catch (err) {
//     console.log("could not download file", err);
//   }
//   // getDownloadURL(ref(S))
// }

// export async function loginEmainPassword(email: string, password: string) {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//   } catch (err) {
//     console.log(err);
//   }
// }

// export async function logout() {
//   await signOut(auth).then(() => {
//     console.log("is logged out");
//   });
// }

// export async function persistenceLogin(email: string, password: string) {
//   try {
//     setPersistence(auth, browserSessionPersistence).then(() => {
//       loginEmainPassword(email, password);
//     });
//   } catch (err) {
//     console.log("unable to login persistence", err);
//   }
// }
// export async function monitorAuthState() {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       console.log("User is logged in:");
//       console.log("email:", user.email);
//       console.log("UID:", user.uid);
//     } else {
//       console.log("User is not logged in");
//     }
//   });
// }

// monitorAuthState();
