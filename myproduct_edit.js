  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
  import { getDatabase, set, ref, update, get, child,  } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
  import { getStorage, ref as sRef, uploadBytes, getDownloadURL, } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";
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
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            const dbref=ref(database)
            get(child(dbref, 'users/' + uid)).then((snapshot)=>{
                if(snapshot.exists()){
                    console.log(snapshot.val());

                    console.log(location.hash);

                    const post_id_s = location.hash;
                    const post_id = post_id_s.slice(1);

                    var product_name = document.getElementById("product_name");
                    var post_username = document.getElementById("producer");
                    var upload_date = document.getElementById("date");
                    var product_describe = document.getElementById("product_describe");
                    var price = document.getElementById("price");
                    var img = document.getElementById("image");
                    
                    get(child(dbref, 'product/' + post_id )).then((snapshot)=>{
                    if(snapshot.exists()){
                      if (uid != snapshot.val().uid){
                        location.replace("./index.html");
                      }
                        console.log(snapshot.val());
                        product_name.value = snapshot.val().product_name;
                        post_username.value =snapshot.val().post_username;
                        upload_date.value = snapshot.val().upload_date;
                        product_describe.value = snapshot.val().product_describe;
                        price.value = snapshot.val().price;
                        const ext = snapshot.val().ext;
                        if (ext === "pdf"){
                            img.src = "image/pdf.png";
                        } else {
                            img.src = "image/image.png";
                        }


                        btn_primary.addEventListener('click', ()=>{
                          const dt = new Date();
                          update(ref(database, 'product/' + post_id),{
                            product_name: product_name.value,
                            product_describe: product_describe.value,
                            price: price.value,
                            upload_date: dt.toLocaleString(),
                          })
                          update(ref(database, 'users/' + uid + '/myproduct/' + post_id),{
                            product_name: product_name.value,
                          })
                          setTimeout(function(){
                            location.href = ('./myproduct_detail.html#'+post_id);
                            }, 1*1000);
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