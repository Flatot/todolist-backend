const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } = require("firebase/auth");
const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyAUXF3JjscryLr4qHQGg6ZeE4UpCZGqH0U",
  authDomain: "todo-list-b7734.firebaseapp.com",
  projectId: "todo-list-b7734",
  storageBucket: "todo-list-b7734.appspot.com",
  messagingSenderId: "849807997027",
  appId: "1:849807997027:web:5b8a8fee69d0c2d55a2056",
  measurementId: "G-473XSQJ0TX"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const firebaseAuth = getAuth(firebaseApp);

async function checkLoggedIn() {
    return firebaseAuth.currentUser;
}

async function signup(email, password) {
    return await createUserWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
        // USER SIGNED IN
        const user = userCredential.user;
        return user;
    })
    .catch((error) => {
        return Promise.reject(error);
    });
}

async function login(email, password) {
    return await signInWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
        // USER SIGNED IN
        const user = userCredential.user;
        return user;
    })
    .catch((error) => {
        return Promise.reject(error);
    });
}

async function logout() {
    signOut(firebaseAuth).then(() => {
        // USER SIGNED OUT
        return Promise.resolve();
    }).catch((error) => {
        return Promise.reject(error);
    });
}

module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.checkLoggedIn = checkLoggedIn;