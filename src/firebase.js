import config from './config';
import firebase from 'firebase';

// let firebase = require("firebase/app")
const firebaseConfig = config.firebaseConfig;

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebaseApp.firestore();

export const provider = new firebase.auth.FacebookAuthProvider();

export const login = (setAuthenticated, setRole) => {
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
            setAuthenticated(true);
            let profile = {};
            profile["photoUrl"] = userData.photoURL;
            profile["email"] = userData.email;
            profile["displayName"] = userData.displayName;
            localStorage.setItem("profile", JSON.stringify(profile));
            localStorage.setItem("authenticated", true);
            let routes = await getAccessableRoutesFromRole(userRole);
            localStorage.setItem("accessableRoutes", routes);
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
    localStorage.setItem("profile", null);
    localStorage.setItem("authenticated", false);
    localStorage.setItem("accessableRoutes", null);
}

export const getUserRole = (uid) => {
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

//Should accessable routes be stored locally to reduce RTT cost?
export const getAccessableRoutesFromRole = (role) => {
    return new Promise((resolve, reject) => {
        firestore.collection('roles').doc(role).get().then(snapshot => {
            let { routes } = snapshot.data()
            if (routes) {
                resolve(routes)
            } else {
                reject('Could not find role')
            }
        })
    })
}

export const checkUserAccessableRoutes = (route) => {
    const routes = localStorage.getItem("accessableRoutes")
    if (routes.includes(route)) {
        return true
    } else {
        return false
    }
}

// export const getListings = () => {
//     return new Promise((resolve, reject) => {
//         firestore.collection('listings').get().then(snapshot => {
//             snapshot.map(doc => {
//                 console.log(doc.data())
//                 return doc.data()
//             })
//         })
//     })
// }

export const getListings = async () => {
    const snapshot = await firestore.collection('listings').get();
    return snapshot.docs.map(doc => {
        let data = doc.data()
        data.id = doc.id
        return data
    }); 
}