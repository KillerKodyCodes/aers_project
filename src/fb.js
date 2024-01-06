// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBSLhA1_lcIUlELXP3vZp5-wVMcOC2QB_E",
//   authDomain: "aersdata.firebaseapp.com",
//   projectId: "aersdata",
//   storageBucket: "aersdata.appspot.com",
//   messagingSenderId: "841349412000",
//   appId: "1:841349412000:web:ba7895cfabac555f7445c5",
//   measurementId: "G-87PYCEXP35"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);

// const readData = async() => {
    
//     try{
//         const pullersCollection = collection(db, 'pullers');
//         const querySnapshot = await getDocs(pullersCollection);

//         querySnapshot.forEach((doc) => {
//             console.log(doc.id, ' => ', doc.data());
//         });

//     }catch(error){
//         console.error('Error reading data: ', error);
//     }
// };

// readData();
