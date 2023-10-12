import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, getAuth, signInWithPopup } from '@angular/fire/auth';
import { UserService } from '../user/user.service';
import { UserInfo, UserLocalData, UserMaker } from 'src/app/models/user/user.info';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  
  // authLocal = getAuth();

  constructor(
    private fireAuth: Auth,
    private userService: UserService,
    private router: Router,
  ) { 
    // if(localStorage.getItem('userdata') != null) {
    //   this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    // } else {
    //   this.userData = UserMaker.createBasicLocalData();
    //   localStorage.setItem('userdata', JSON.stringify(this.userData));
    // }
  }

  GoogleAuthProv(){

    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: any){
    return signInWithPopup(this.fireAuth, provider)
      .then((result) =>{
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        this.checkUser(user);
        return true;
      }).catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;

        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('Error al iniciar sesion: '+errorCode)
        return false;
      });
  }

  async checkUser(userData: any){
    var docSnap = await this.userService.getUser(userData.email);
    var userInfo: UserInfo;
    if(docSnap.exists()) {
      userInfo = docSnap.data() as UserInfo;
    } else {
      userInfo = UserMaker.createFromLogin(userData);
      this.userService.saveUser(userData.email, userInfo);
    }
    this.saveDataLocalStorage(userData.email, userInfo);
  }

  saveDataLocalStorage(email: string, userInfo: UserInfo){
    var userData: UserLocalData = {
      email: email,
      sesionActiva: true,
      rolActivo: '',
      userInfo: userInfo,
    };

    localStorage.clear();
    localStorage.setItem('userdata', JSON.stringify(userData));
  }

  isAuth(): boolean {
    return getAuth().currentUser != null;
  }

  signOut() {
    this.fireAuth.signOut();
    this.router.navigate(['/login']);
  }

  changedToken(){
    // this.fireAuth.onIdTokenChanged()
  }
}
