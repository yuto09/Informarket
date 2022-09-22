
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getDatabase, set, ref as dRef, update, get, child, onValue } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

import { getStorage, ref as sRef, uploadBytes, } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth();

const user = auth.currentUser;
//------------------------------
const file = document.getElementById("upload");
const item = document.getElementById("product_name");
const intro = document.getElementById("product_describe");
const sell = document.getElementById("price");
const tagName = document.getElementById("tag");
var fileContent = 0;
var productName = "";
var productDescribe = "";
var pricePoint = "";
var tagKind = "";
var name = "";
var ext = "";
var url = "";
var price_num = 0;
var storageRef = 0;

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const dbref=dRef(database)
    get(child(dbref, 'users/' + uid)).then((snapshot)=>{
        if(snapshot.exists()){
            console.log(snapshot.val());
            var username=snapshot.val().username;
            btn_primary.addEventListener('click', ()=>{
              if (file.files.length == 0) {
                alert("空です");
              } else {
              fileContent = file.files[0];
              url = URL.createObjectURL(fileContent);
              name = fileContent.name;
              ext = name.split('.').pop();
              productName = item.value;
              productDescribe = intro.value;
              pricePoint = sell.value;
              tagKind = tagName.value;
              const img = document.getElementById("image");
              if(ext==='pdf'){
                img.src="image/noimage.png";
              }else{
                img.src = url;
              }
              document.getElementById("postform").classList.remove('active');
              document.getElementById("post_check").classList.add('active');
              document.getElementById("product_name2").textContent += productName;
              document.getElementById("product_describe2").textContent += productDescribe;
              document.getElementById("price2").textContent += pricePoint;
              document.getElementById("tag2").textContent += tagKind;
              console.log(productName);
        }
            });
            var id=1;
            onValue(dRef(database, 'product/'), (snapshot) => {
              Object.values(snapshot.val()).forEach(item => {
                if(id==item.id){
                  id=id+1;
                }console.log(id);
              })
            })
            

            comp.addEventListener('click', ()=>{
            document.cookie = "id="+id;
            document.cookie = "itemName="+encodeURI(productName);
            storageRef = sRef(storage, `file/${id}.${ext}`);
            console.log(`file/${id}.${ext}`);
            console.log(storageRef);
            console.log(fileContent);
            const dt = new Date();
            const base = 'https://myfirebase-54d4c.web.app/';
            const url = new URL('product_detail.html', base );
            url.hash = id;
            price_num = parseInt(pricePoint);
          update(dRef(database, 'product/' + id),{
            uid: uid,
            id: id,
            URL: url,
            post_username: username,
            product_name: productName,
            product_describe:productDescribe,
            price: price_num,
            ext: ext,
            tag: tagKind,
            upload_date: dt.toLocaleString(),
            review_n: 0,
            review_p: 0,
          }).then(()=>{
            update(dRef(database, 'users/' + uid + '/myproduct/' + id),{
              id:id,
              product_name: productName,
              URL:url,
            })
          }).then(()=>{
          uploadBytes(storageRef, fileContent).then(()=>{
            console.log("upload file");
          }, (err)=>{
            console.log(err);
          })
        }).then(()=>{
          setTimeout(() => {
            location.href = "./post_complete.html";
          }, 1*1000);
        });
            } )
          btn_exitback.addEventListener('click', ()=>{
            document.getElementById("post_check").classList.remove('active');
            document.getElementById("postform").classList.add('active');
          });
          }else {
            location.replace("./index.html");
          }
        });
        }
    });
    

 
