import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userId = user.uid;
    const userRef = ref(database, `users/${userId}`);

    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      updateWelcomeMessage(userData);
    });
  } else {
    updateWelcomeMessage(); 
  }
});

function updateWelcomeMessage(userData) {
  const welcomeMessage = document.getElementById('welcome-message');
  const accountLink = document.getElementById('account-link');

  if (welcomeMessage && accountLink) {
    if (userData && userData.username) {
      welcomeMessage.textContent = `Welcome, ${userData.username}!`;
      accountLink.style.display = 'block'; 
    } else {
      welcomeMessage.textContent = 'Welcome, Guest!';
      accountLink.style.display = 'none'; 
    }
  }
}
