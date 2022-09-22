  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
  import { getDatabase, set, ref, update, get, child,  } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
  import { getStorage, ref as sRef, getDownloadURL, } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";
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
    const storage = getStorage(app);
    const auth = getAuth();
    const user = auth.currentUser;
    const showFile = document.getElementById("show_product");
    let ext = 0;
    let name = 0;
    let post_id = 0;
  
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
                const post_id_s = location.hash;
                 post_id = post_id_s.slice(1);
  
                var product_name = document.getElementById("product_name");
                var dt = document.getElementById("date");
                get(child(dbref, 'users/' + user.uid + '/buy_product/' + post_id)).then((snapshot)=>{
                    if(snapshot.exists()){
                        console.log(snapshot.val());
                        dt.value=snapshot.val().buy_date;
                    }})
                get(child(dbref, 'product/' + post_id )).then((snapshot)=>{
                if(snapshot.exists()){
                    console.log(snapshot.val());
                    ext=snapshot.val().ext;
                    name = snapshot.val().product_name;
                    product_name.value = name;
                    const post_uid=snapshot.val().uid;
                    const fileName = `${post_id}.${ext}`;
                    const path = sRef(storage, `file/${fileName}`)
                    show_product.addEventListener('click', ()=>{
                      getDownloadURL(path).then((url)=>{
                          //showFile.setAttribute('href', url);
                          window.open(url);
                          });
                     });
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
  
  
  