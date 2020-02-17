import app from 'firebase';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

class Firebase {
  constructor() {
    const config = {
      apiKey: process.env.REACT_APP_API_KEY || "AIzaSyDTkCPWFTa6ErjixOjCAMxi-Yz_nftNi8A",
      authDomain: process.env.REACT_APP_AUTH_DOMAIN || "quackbook-f35da.firebaseapp.com",
      databaseURL: process.env.REACT_APP_DATABASE_URL || "https://quackbook-f35da.firebaseio.com",
      projectId: process.env.REACT_APP_PROJECT_ID || "quackbook-f35da",
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET || "quackbook-f35da.appspot.com",
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || "745508951069",
      appId: process.env.REACT_APP_APPID || "1:745508951069:web:0a8a9bbb1217fb6b",
    };


    app.initializeApp(config);

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;
    this.auth = app.auth();
    this.db = app.database();
    this.storageRef = app.storage().ref();
  }

  onAuthUserListener = (next, fallback) => {
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.db
          .ref(`users/${authUser.uid}`)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            if (dbUser === null) {
              return alert('incorrect');
            }

            authUser = {
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });
  };

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  writeNewPost = obj => {
    this.db.ref('users/' + obj.id + '/msg').push(obj.post);
  };

  EditProfileData = (id, data) => {
    this.db.ref('users/' + id + '/info').update({
      job: data.job,
      school: data.school,
      course: data.course,
      location: data.location,
    });
  };

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
  storageRef = () => this.storageRef;
  getimg = image => {
    this.storageRef
      .child(`${image}`)
      .getDownloadURL()
      .then(url => {
        console.log(url);
      })
      .catch(error => {
        console.log('image loading error');
      });
  };
}

export default Firebase;
