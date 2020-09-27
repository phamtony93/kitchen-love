import React from "react";
import config from "./config";
import firebase from "firebase";

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
  // let tokenId = null;

  auth.signInWithPopup(provider).then(async (result) => {
    userData = result.user;
    // tokenId = result.credential.accessToken;
    firebaseToken = await auth.currentUser.getIdToken();

    //TODO: requests should get routed to server-side with firebaseToken
    try {
      // localStorage.setItem("uid", userData.uid)
      // userRole = await getUserRole(userData.uid);
      // setRole(userRole);
      // setAuthenticated(true);
      // let profile = {};
      // profile["photoUrl"] = userData.photoURL;
      // profile["email"] = userData.email;
      // profile["displayName"] = userData.displayName;
      // localStorage.setItem("profile", JSON.stringify(profile));
      // localStorage.setItem("authenticated", true);
      // let routes = await getAccessableRoutesFromRole(userRole);
      // localStorage.setItem("accessableRoutes", routes);
    } catch (e) {
      console.log(e);
    }
  });
};

export const logout = (setAuthenticated, setRole) => {
  auth
    .signOut()
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};

export const getUserRole = (uid) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .where("uid", "==", uid)
      .get()
      .then((snapshot) => {
        if (snapshot.docs[0]) {
          resolve(snapshot.docs[0].data()["role"]);
        } else {
          reject("User Not Found");
        }
      });
  });
};

//Should accessable routes be stored locally to reduce RTT cost?
export const getAccessableRoutesFromRole = (role) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("roles")
      .doc(role)
      .get()
      .then((snapshot) => {
        let { routes } = snapshot.data();
        if (routes) {
          resolve(routes);
        } else {
          reject("Could not find role");
        }
      });
  });
};

//Use one time pull vs. listener to prevent UI from updating real time
export const getListings = async () => {
  const snapshot = await firestore.collection("listings").get();
  return snapshot.docs.map((doc) => {
    let data = doc.data();
    data.id = doc.id;
    return data;
  });
};

export const createOrder = async (order) => {
  const res = await firestore.collection("orders").add(order);
  console.log("Added document with ID", res.id);
  // setOrderSubmitted(true);
};

export const getOrderHistory = async (uid) => {
  const orderHistory = await firestore
    .collection("orders")
    .where("customerId", "==", uid)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log("no matching");
      }
      return snapshot.docs.map((doc) => {
        let data = doc.data();
        data["id"] = doc.id;
        return data;
      });
    });
  return orderHistory;
};

export const getStoreInventory = (uid) => {
  let inventory = firestore
    .collection("listings")
    .where("vendorId", "==", uid)
    .onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        console.log(doc.data());
        return doc.data();
      });
    });

  console.log("1");
  console.log(inventory);
  return inventory;
};

// const export uploadImageToStorageAndReturnUrl
