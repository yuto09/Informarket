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
 
   const tag = document.getElementById("tag");
 
   onAuthStateChanged(auth, (user) => {
   if (user) {
       // User is signed in, see docs for a list of available properties
       // https://firebase.google.com/docs/reference/js/firebase.User
       const uid = user.uid;
       const dbref=ref(database);
       let i = 0;
       let j = 0;
       let k = 0;
       var url = 0;
       const catalog = document.getElementById("catalog");
 
 
       var product_name = 0;
       var appendHTML = "";
       var info_model =
       `<td>
         <div id="info">
           <a href="${url}">
             <img src="" height=100>
             <p>${product_name}</p>
           </a>
         </div>
       </td>`;
       var currentpoint = document.getElementById("Currentpoint");
 
       get(child(dbref, 'users/' + uid)).then((snapshot)=>{
           if(snapshot.exists()){
               console.log(snapshot.val());
 
               get(child(dbref,'product')).then((snapshot) => {
                Object.values(snapshot.val()).forEach(item => {
                  url = item.URL;
                  product_name = item.product_name;
                  var info_model =
                    `<td>
                      <div id="info">
                        <a href="${url}">
                          <img src="./image/file.png" height=100>
                          <p>${product_name}</p>
                        </a>
                      </div>
                    </td>`;
                  if (i % 5 == 0){
                    j++;
                    if(j==1){
                      appendHTML += "<tr id='list' class='table_one'>";
                    }
                    else if(j==2){
                      appendHTML += "<tr id='list' class='table_two'>";
                    }
                    else if(j==3){
                      appendHTML += "<tr id='list' class='table_three'>";
                    }
                    else if(j==4){
                      appendHTML += "<tr cid='list' class='table_four'>";
                    }
                    else{
                      appendHTML += "<tr id='list' class='table_five'>";
                    }

                  }
                  appendHTML += info_model;
                  i++;
                  if (i % 5 == 0){
                    appendHTML += "</tr>";
                    catalog.insertAdjacentHTML('beforeend', appendHTML);
                    i = 0;
                    appendHTML = "";
                  }
                })
                if (appendHTML != ""){
                    appendHTML += "</tr>";
                    catalog.insertAdjacentHTML('beforeend', appendHTML);
                    appendHTML += "";
                    i=0;
                  }

                  search.addEventListener('click', ()=>{
                    // const list = document.getElementById("list");

                    const parent = document.getElementById("catalog");
                    appendHTML = "";
                    i=0;
                    while (parent.firstChild){
                      parent.removeChild(parent.firstChild);
                    }
                      Object.values(snapshot.val()).forEach(item => {
                        var selftag = item.tag;
                        const target_tag = document.getElementById("tag");
                        if (selftag === target_tag.value){
                        url = item.URL;
                        product_name = item.product_name;
                        var info_model =
                          `<td>
                            <div id="info">
                              <a href="${url}">
                                <img src="./image/file.png" height=100>
                                <p>${product_name}</p>
                              </a>
                            </div>
                          </td>`;
                          if (i % 5 == 0){
                            k++;
                            if(k==1){
                              appendHTML += "<tr id='list' class='table_one'>";
                            }
                            else if(k==2){
                              appendHTML += "<tr id='list' class='table_two'>";
                            }
                            else if(k==3){
                              appendHTML += "<tr id='list' class='table_three'>";
                            }
                            else if(k==4){
                              appendHTML += "<tr cid='list' lass='table_four'>";
                            }
                            else{
                              appendHTML += "<tr id='list' class='table_five'>";
                            }
                          }
                          appendHTML += info_model;
                          i++;
                          if (i % 5 == 0){
                            appendHTML += "</tr>";
                            catalog.insertAdjacentHTML('beforeend', appendHTML);
                            i = 0;
                            appendHTML = "";
                          }
                      }
                    });
                    if (appendHTML != ""){
                      appendHTML += "</tr>";
                      catalog.insertAdjacentHTML('beforeend', appendHTML);
                      i=0;
                    }
                   });
              })
               }else{
                       alert("No data found");
                   }
               })
               .catch((error)=>{
                   alert("unsuccessful, error"+error);
               });
 
     }else {
       // User is signed out
       location.replace("./index.html");
   }})
 