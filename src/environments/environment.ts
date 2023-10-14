// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
  production: false,
  mapsKey: 'AIzaSyAfZuhEgIWRTYbVvSl73oBk3bYD0xcazUs'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
