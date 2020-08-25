import config from './config';
import firebase from 'firebase';

// let firebase = require("firebase/app")
const firebaseConfig = config.firebaseConfig;

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebaseApp.firestore();

export const provider = new firebase.auth.FacebookAuthProvider();

export const login = () => {
    let userData = null;
    let firebaseToken = null;
    let tokenId = null;
    let routes = null;
    let userRole = null;

    auth.signInWithPopup(provider).then(async (result) => {
        userData = result.user;
        tokenId = result.credential.accessToken;
        firebaseToken = await auth.currentUser.getIdToken();
        //use redux here? better to send to secured server
        //TODO: requests should get routed to server-side with firebaseToken
        localStorage.setItem('firebaseToken', firebaseToken);
        console.log(userData.uid)
        console.log(firebaseToken)
        console.log(tokenId)
    })
}

export const logout = () => {
    auth.signOut().then(() => {
    }).catch((error) => {
        console.log(error);
    })
    //update state

}