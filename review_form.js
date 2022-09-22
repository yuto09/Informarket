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
                    const userpoint = snapshot.val().userpoint; 
                    console.log(location.hash);

                    const post_id_s = location.hash;
                    const post_id = post_id_s.slice(1);

                    let elements = document.getElementsByName('rate');
                    let len = elements.length;
                    let checkValue = '';

                    btn_primary.addEventListener('click',(e) => {
                        get(child(dbref, 'users/'+uid+'/buy_product/' + post_id )).then((snapshot)=>{
                            if(snapshot.val().flag!=1){
                                console.log(snapshot.val().flag);
                                for (let i = 0; i < len; i++){
                                    if (elements.item(i).checked){
                                        checkValue = elements.item(i).value;
                                    }
                                }
                                var star_num = parseInt(checkValue);
                                get(child(dbref, 'product/' + post_id )).then((snapshot)=>{
                                    if(snapshot.exists()){
                                        console.log(snapshot.val());
                                        var review_p = snapshot.val().review_p;
                                        var review_n = snapshot.val().review_n;
                                        update(ref(database, 'product/' + post_id),{
                                            review_p: review_p + 1,
                                            review_n: review_n + star_num,
                                        })
                                        update(ref(database, 'users/' + uid + '/buy_product/' + post_id),{
                                            flag: 1,
                                        })
                                        update(ref(database, 'users/' + uid ),{
                                            userpoint: userpoint + 2,
                                        })
                                        setTimeout(function(){
                                            location.href = 'review_complete.html';
                                          }, 1*1000);
                                    }
                                    else{
                                        alert("No data found");
                                    }
                                    })
                                    .catch((error)=>{
                                        alert("unsuccessful, error"+error);
                                    });
                                }else{
                                    alert('レビュー済みの商品です!');
                                }
                        })
                    })
                }else{
                        alert("No data found");
                    }
                    }).catch((error)=>{
                alert("unsuccessful, error"+error);
            });           
        } else {
            // User is signed out
            location.replace("./index.html");
        }})
