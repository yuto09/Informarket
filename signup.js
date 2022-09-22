// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKV9myWvVsqSP_z6zD6ipY1YtvUN3_Dqc",
  authDomain: "myfirebase-54d4c.firebaseapp.com",
  databaseURL: "https://myfirebase-54d4c-default-rtdb.firebaseio.com",
  projectId: "myfirebase-54d4c",
  storageBucket: "myfirebase-54d4c.appspot.com",
  messagingSenderId: "774352724222",
  appId: "1:774352724222:web:0b40ee42cf9314d934c5af",
  measurementId: "G-3DZ6JKED7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

signUp.addEventListener('click',(e) => {

var email = document.getElementById('email').value;
var password = document.getElementById('password').value;
var username = document.getElementById('username').value;
var userpoint = 100;
var  dt = new Date();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
   // Signed in
    const user = userCredential.user;
    set(ref(database, 'users/' + user.uid),{
        username: username,
        email: email,
        last_login: dt.toLocaleString(),
        userpoint: userpoint
    })

    setTimeout(function(){
      location.href = './homepage.html';
    }, 1*1000);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage);
  // ..
  });

});