  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
  import { getDatabase, set, ref, update, get, child,  } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
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

  let cookies = document.cookie;
  let cookiesArray = cookies.split(';');
  let product_id = 0;
  let product_name = 0;
      const user = auth.currentUser;
      onAuthStateChanged(auth, (user) => {
      if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          const dbref=ref(database);
          get(child(dbref, 'users/' + uid)).then((snapshot)=>{
              if(snapshot.exists()){
                  console.log(snapshot.val());
                  console.log(location.hash);
                  const userpoint = snapshot.val().userpoint;
                  update(ref(database, 'users/' + user.uid),{
                    userpoint: userpoint + 3,
                  });//投稿者にポイント付与
                  
                  for (let c of cookiesArray){
                  var cArray = c.split('=');
                  if (cArray[0].trim(' ') === 'id') {
                    product_id = decodeURIComponent(cArray[1]);
                  }else if (cArray[0].trim(' ') === 'itemName') {
                    product_name = decodeURIComponent(cArray[1]);
                  }else {
                    console.log('だめで〜す'+cArray[1]);
                  }
                }

                  get(child(dbref, 'product/' + product_id )).then((snapshot)=>{
                  if(snapshot.exists()){
                      console.log(snapshot.val());
                      document.getElementById("product_name").textContent += product_name;
                      document.getElementById("id").textContent += product_id;
                      
                      btn_primary.addEventListener('click',(e) => {
                        location.href=('./product_detail.html#'+product_id);
                      })
                  }else{
                          alert("No data found");
                      }
                  })
                  .catch((error)=>{
                      alert("unsuccessful, error"+error);
                  });
              }else{
                  alert("No data found");
              }
          })
          .catch((error)=>{
              alert("unsuccessful, error"+error);
          });

      } else {
          // User is signed out
          location.replace("./index.html");
      }
      });
