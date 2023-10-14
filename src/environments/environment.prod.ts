import { firestoreKeys } from "src/app/app.secret.keys";

export const environment = {
  firebase: {
    projectId: firestoreKeys.projectId,
    appId: firestoreKeys.appId,
    databaseURL: firestoreKeys.databaseURL,
    storageBucket: firestoreKeys.storageBucket,
    apiKey: firestoreKeys.apiKey,
    authDomain: firestoreKeys.authDomain,
    messagingSenderId: firestoreKeys.messagingSenderId,
    measurementId: firestoreKeys.measurementId,
  },
  production: true
};
