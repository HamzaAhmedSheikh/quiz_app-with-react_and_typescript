import * as firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCtw0VBeAGCi9Png2b9o2qztd-0geGrxDE",
    authDomain: "fir-project-4db1f.firebaseapp.com",
    databaseURL: "https://fir-project-4db1f.firebaseio.com",
    projectId: "fir-project-4db1f",
    storageBucket: "fir-project-4db1f.appspot.com",
    messagingSenderId: "122224133326",
    appId: "1:122224133326:web:b09c809e0d4ea142f4fc9f",
    measurementId: "G-HW4SNZW7Q0"
  };

  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();

   const initNotification = ()=> {
    Notification.requestPermission().then((permission) => {
        console.log(permission)
        if (permission === 'granted') {
          messaging.getToken().then((currentToken) => {
            if (currentToken) {
                
                console.log("Your Token ==> " , currentToken)
          
            } else {
              // Show permission request.
              console.log('No Instance ID token available. Request permission to generate one.');
              // Show permission UI.
          
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
 
          });

        }

})
}

export default initNotification;