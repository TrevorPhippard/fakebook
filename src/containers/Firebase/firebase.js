import app from 'firebase';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

class Firebase {
  constructor() {
    const config = {
      apiKey: process.env.REACT_APP_API_KEY || 'API_KEY',
      authDomain: process.env.REACT_APP_AUTH_DOMAIN || 'AUTH_DOMAIN',
      databaseURL: process.env.REACT_APP_DATABASE_URL || 'DB_URL',
      projectId: process.env.REACT_APP_PROJECT_ID || 'PROJECT_ID',
      storageBucket:
        process.env.REACT_APP_STORAGE_BUCKET || 'STORAGE_BUCKET',
      messagingSenderId:
        process.env.REACT_APP_MESSAGING_SENDER_ID ||
        'MESSAGE_SENDER_ID',
      appId: process.env.REACT_APP_APPID || 'APP_ID',
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
