import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, UserInfo, getAuth, signInWithPopup } from '@angular/fire/auth';
import { UserLogin } from 'src/app/models/user/UserLogin';
import { capitalizeString } from 'src/app/utils/formatter.string';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  authLocal = getAuth();
  userData: UserLogin;

  constructor(
    private fireAuth: Auth,
  ) { 
    // if(localStorage.getItem('user') != null) {
      this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    // } else {
    //   this.userData = JSON.parse('{uid:\'\', name:\'\', email:\'\', emailVerified:false}');
    //   localStorage.setItem('user', JSON.stringify(this.userData));
    // }
  }

  GoogleAuthProv(){
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: any){
    return signInWithPopup(this.fireAuth,provider)
      .then((result) =>{
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        this.saveDataLocalStorage(user);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('Error al iniciar sesion: '+errorCode)
      });
  }

  saveDataLocalStorage(data: any){
    this.userData.uid = data.uid;
    this.userData.name = capitalizeString(data.displayName);
    this.userData.email = data.email;
    this.userData.emailVerified = data.emailVerified;

    localStorage.setItem('user', JSON.stringify(this.userData));
  }
}
