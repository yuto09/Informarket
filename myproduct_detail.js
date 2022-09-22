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

                    var star_rate = 0;
                    
                    get(child(dbref, 'product/' + post_id )).then((snapshot)=>{
                    if(snapshot.exists()){
                        console.log(snapshot.val());
                        product_name.value = snapshot.val().product_name;
                        post_username.value =snapshot.val().post_username;
                        upload_date.value = snapshot.val().upload_date;
                        product_describe.value = snapshot.val().product_describe;
                        price.value = snapshot.val().price;
                        star_rate = snapshot.val().review_n / snapshot.val().review_p;
                        const ext = snapshot.val().ext;
                        if (ext === "pdf"){
                            img.src = "image/pdf.png";
                        } else {
                            img.src = "image/image.png";
                        }
                        const rate = document.getElementById("rate_number");
                        rate.value = star_rate.toFixed(1);
                        const star = [
                            document.getElementsByClassName("s1")[0],
                            document.getElementsByClassName("s2")[0],
                            document.getElementsByClassName("s3")[0],
                            document.getElementsByClassName("s4")[0],
                            document.getElementsByClassName("s5")[0],
                    ]
                        for (let i = 0; i < Math.round(star_rate); i++){
                            star[i].style.color = "#ffcc00";
                        }

                        const storageRef = sRef(storage, `file/${post_id}.${ext}`);

                        console.log(`file/${post_id}.${ext}`);
                        btn_primary.addEventListener('click',(e) => {
                          getDownloadURL(storageRef).then((url)=>{
                            window.open(url);
                          })
                        })

                        btn_primary2.addEventListener('click', ()=>{
                          location.href = "./myproduct_edit.html#"+ snapshot.val().id;
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
