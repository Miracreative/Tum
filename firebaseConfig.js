import * as firebase from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyCgiSe5H23DwngAnL9XQsHyJ1RcKdoZmjY",
    authDomain: "tummiestest.firebaseapp.com",
    projectId: "tummiestest",
    storageBucket: "tummiestest.appspot.com",
    messagingSenderId: "264014217501",
    appId: "1:264014217501:web:38a969297037711c5321f4",
    measurementId: "G-71NC8Q27KS"
}

let app;
if(firebase.apps.length ===0) {
    app = firebase.inicializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

export const auth = getAuth(app);
export default app;
