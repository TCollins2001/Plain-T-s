import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAV9LpDP1jOp0cn5utjz3WiTTQchyYlnVc",
  authDomain: "plain-t-s.firebaseapp.com",
  databaseURL: "https://plain-t-s-default-rtdb.firebaseio.com",
  projectId: "plain-t-s",
  storageBucket: "plain-t-s.appspot.com",
  messagingSenderId: "745737833685",
  appId: "1:745737833685:web:9f7cea79988bc8e626665c",
  measurementId: "G-9DH55BMKL3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

document.getElementById('submitData').addEventListener('click', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      var lgDate = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: lgDate.toString(),
      })
      .then(() => {
        alert('User Logged In Successfully!');
        window.location.href = 'shop.html';
      })
      .catch((error) => {
        alert(error);
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });

});
