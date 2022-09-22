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
  
      onAuthStateChanged(auth, (user) => {
      if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          const dbref=ref(database);
          var currentpoint = document.getElementById("Currentpoint");
  
          get(child(dbref, 'users/' + uid)).then((snapshot)=>{
              if(snapshot.exists()){
                  console.log(snapshot.val());
                  currentpoint.value=snapshot.val().userpoint;
                  const currentpoint_num=snapshot.val().userpoint;
                  console.log(location.hash);
                  const post_id_s = location.hash;
                  const post_id = post_id_s.slice(1);
                  var bought=0;
                  get(child(dbref,'users/' + uid +'/buy_product/')).then((snapshot) => {
                        Object.values(snapshot.val()).forEach(item => {
                            if(post_id==item.id){
                              bought=1;
                            }
                        })
                      })
                  console.log(bought);
                  var product_name = document.getElementById("product_name");
                  var product_describe = document.getElementById("product_describe");
                  var price = document.getElementById("price");
                  get(child(dbref, 'product/' + post_id )).then((snapshot)=>{
                  if(snapshot.exists()){
                      console.log(snapshot.val());
                      
                      product_name.value = snapshot.val().product_name;
                      product_describe.value = snapshot.val().product_describe;
                      price.value = snapshot.val().price;
                      const price_num = snapshot.val().price;
                      const post_uid=snapshot.val().uid;
                      const ext=snapshot.val().ext;
                      const fileName = `${post_id}.${ext}`;
                      const path = sRef(storage, `file/${fileName}`);
                      
                      buy.addEventListener('click',(e)=>{
                        if(uid!==post_uid){
                          if(bought==0){
                            if(currentpoint_num >= price_num){
                                const dt = new Date;
                                update(ref(database, 'users/' + user.uid),{
                                userpoint: currentpoint_num - price_num,
                                })
                                getDownloadURL(path).then((url)=>{
                                    //showFile.setAttribute('href', url);
                                    update(ref(database, 'users/' + user.uid + '/buy_product/' + post_id),{
                                    id:post_id,
                                    flag: 0,
                                    product_name: product_name.value,
                                    URL: url, 
                                    buy_date: dt.toLocaleString(),
                                    });
                                });
                                get(child(dbref, 'users/' + post_uid )).then((snapshot)=>{
                                    if(snapshot.exists()){
                                    console.log(snapshot.val())
                                    var post_userpoint = snapshot.val().userpoint;
                                    
                                    update(ref(database,'users/'+post_uid),{
                                    userpoint: post_userpoint + price_num,
                                    })
                                    }})
                                setTimeout(function(){
                                location.replace('./buy_complete.html#'+post_id);
                                }, 3*1000);
                          }
                          else{
                            alert('ポイントが足りません!');
                          }
                          }else{
                            alert('購入済みの商品です!');
                          }
                        }else{
                          alert('自分で投稿した商品です!');
                        }
                          
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
  
  