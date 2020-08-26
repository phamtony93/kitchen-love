import config from './config';
import firebase from 'firebase';

// let firebase = require("firebase/app")
const firebaseConfig = config.firebaseConfig;

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebaseApp.firestore();

export const provider = new firebase.auth.FacebookAuthProvider();

export const login = (setAuthentication, setRole) => {
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
        // localStorage.setItem('firebaseToken', firebaseToken);
        try {
            userRole = await getUserRole(userData.uid);
            setRole(userRole);
            setAuthentication(true);
        } catch(e) {
            console.log(e);
        }


    })
}

export const logout = (setAuthenticated, setRole) => {
    auth.signOut().then(() => {
    }).catch((error) => {
        console.log(error);
    })
    setAuthenticated(false);
    setRole(null);
}

export const getUserRole = (uid) => {
    console.log(uid)
    return new Promise((resolve, reject) => {
        firestore.collection('users').where('uid', '==', uid).get().then(snapshot => {
            if (snapshot.docs[0]) {
                resolve(snapshot.docs[0].data()['role'])
            } else {
                reject('User Not Found')
            }
        })
    })
}