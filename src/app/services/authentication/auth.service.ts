import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, getAuth, signInWithPopup } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  authLocal = getAuth();

  constructor(
    private fireAuth: Auth,
  ) { }

  GoogleAuthProv(){
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: any){
    return signInWithPopup(this.fireAuth,provider)
      .then((result) =>{
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log(user);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('Error al iniciar sesion: '+errorCode)
      });
  }
}
