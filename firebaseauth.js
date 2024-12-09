 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {getAuth, creatUserWithEmailandPassword, signinwithEmailandpassword} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"
import {getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"
 
 const firebaseConfig = {
  apiKey: "AIzaSyBLqPdAxWhbfQPCSB-A0uWMwNGzWEIPhWg",
  authDomain: "study-ai-8e017.firebaseapp.com",
  projectId: "study-ai-8e017",
  storageBucket: "study-ai-8e017.firebasestorage.app",
  messagingSenderId: "550649982067",
  appId: "1:550649982067:web:69ba5b720b20dcd6384e06"
};

 function showMessage(message, divId){
    var messageDiv=document. getElementById(divID);
    messageDiv.style.display= "block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;



    },5000);
        
    

}
const app = initializeApp(firebaseConfig);
const signUP= document.getElementById('submisignup');
signUP.addEventListener('click',(event)=>{
event.preventDefault();
const email= document.getElementById('rEmail').value;
const password=document.getElementById('rPassword').value;
const firstName=document.getElementById('fName').value;
const lastName=document.getElementById('lName').value;

const auth=getAuth();
const db=getFirestore();

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    
    const userData = {
      email: email,
      firstName: firstName,
      lastName: lastName,

    };
    showMessage('Account Created sucessfully','signUPMessage');
    const docRef=doc(db,"user", user.uid);
    setDoc(docRef,userData)
    .then(()=>{
        window.location.href='index.html';

    })
    .catch((error)=>{
        console.error("error writing document",error )

       });
    })
    .catch ((error)=>{
        const errorcode= error.code;
        if(errorcode=='auth/email-already-in-use'){

            showMessage('email Adress already exists!!', 'signUPmessage');
        }
        else{
            showMessage('unable to creat user', 'signUpmessage');

        }
    })
})