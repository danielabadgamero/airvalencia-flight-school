// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT5YZMEHTMTQFZdclkzUumpYALV2ANjZU",
  authDomain: "airvalencia-flight-schoo-494df.firebaseapp.com",
  databaseURL: "https://airvalencia-flight-schoo-494df-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "airvalencia-flight-schoo-494df",
  storageBucket: "airvalencia-flight-schoo-494df.appspot.com",
  messagingSenderId: "794741392615",
  appId: "1:794741392615:web:dd6a4ca145e99c551e4e42",
  measurementId: "G-0WR3KC245B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function writeUserData(firstname, lastname, callsign, email, pass) {
    const database = getDatabase(app);
    set(ref(database, 'users/' + firstname), {
        first_name: firstname,
        last_name: lastname,
        callsign: callsign,
        email: email,
        password: pass
    });
}

const links = [...document.querySelectorAll('li')];
const submit = document.getElementById('register');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        document.getElementById(`scroll-${e.target.id}`).scrollIntoView({behavior: "smooth"});
    })
})

const inputFields = [...document.querySelectorAll('input')]
inputFields.pop();

submit.addEventListener('click', () => {
    let valid = {
        "first-name": false,
        "last-name": false,
        "callsign": false,
        "email": false,
        "password": false,
        "confirm-password": false,
        "passwords-match": false
    }
    inputFields.forEach(field => {
        if (!field.value) {
            alert(field.id + " is required!");
        } else {
            valid[field.id] = true;
        }
    })
    if (document.getElementById('confirm-password').value !== document.getElementById('password').value) {
        alert('Passwords do not match');
    } else {
        valid["passwords-match"] = true;
    }
    let isValid = true;
    for (let entry in valid) {
        if (valid[entry] === false) {
            isValid = false;
        }
    }
    if (isValid) {
        writeUserData(inputFields[0].value, inputFields[1].value, inputFields[2].value, inputFields[3].value, inputFields[4].value)
        window.location.replace('./pages/registration.html');
    }
})