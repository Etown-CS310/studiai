import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLqPdAxWhbfQPCSB-A0uWMwNGzWEIPhWg",
  authDomain: "study-ai-8e017.firebaseapp.com",
  projectId: "study-ai-8e017",
  storageBucket: "study-ai-8e017.firebasestorage.app",
  messagingSenderId: "550649982067",
  appId: "1:550649982067:web:69ba5b720b20dcd6384e06"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Function to display messages
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Login Event Listener
const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User signed in successfully
      const user = userCredential.user;
      console.log("User logged in:", user);

      // Redirect to hompage
      window.location.href = 'hompage_index.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      console.error("Error logging in:", error);

      // Handle specific login errors
      if (errorCode === 'auth/user-not-found') {
        showMessage('No user found with this email.', 'loginMessage');
      } else if (errorCode === 'auth/wrong-password') {
        showMessage('Incorrect password. Please try again.', 'loginMessage');
      } else {
        showMessage('Failed to log in. Please try again later.', 'loginMessage');
      }
    });
});
