import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, getAuth, signInWithPopup } from '@angular/fire/auth';
import { UserService } from '../user/user.service';
import { UserInfo, UserLocalData, UserMaker } from 'src/app/models/user/user.info';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { ManageLocalData } from 'src/app/utils/manage.localdata';

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
    //   this.userData = JSON.parse(localStorage.getItem('userdata') || '{}');
    // } else {
    //   this.userData = UserMaker.createBasicLocalData();
    //   localStorage.setItem('userdata', JSON.stringify(this.userData));
    // }
  }

  GoogleAuthProv(){

    return this.AuthLogin(new GoogleAuthProvider().setCustomParameters({'hd':'duocuc.cl'}));
  }

  AuthLogin(provider: any){
    return signInWithPopup(this.fireAuth, provider)
      .then((result) =>{
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const userDataLogin = this.checkUser( result.user);
        return false;
      }).catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;

        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('Error al iniciar sesion: '+errorCode)
        return true;
      });
  }

  async checkUser(userDataLogin: any){
    var docSnap = await this.userService.getUser(userDataLogin.email);
    var userInfo: UserInfo;

    if(docSnap.exists()) {
      userInfo = this.validUIDToken(userDataLogin.email, userDataLogin.uid, docSnap.data() as UserInfo);
    } else {
      userInfo = UserMaker.createFromLogin(userDataLogin);
      this.userService.saveUser(userDataLogin.email, userInfo);
    }
    
    this.redireccionar(ManageLocalData.saveLoginLocalData(userDataLogin.email, userInfo));
  }

  isAuth(): boolean {
    const localData = ManageLocalData.getLocalData();
    return getAuth().currentUser != null && Object.keys(localData).length > 0;
  }

  signOut() {
    var userData: UserLocalData = ManageLocalData.getLocalData();
    
    userData.rolActivo = '';
    userData.sesionActiva = false;

    ManageLocalData.saveExistsLocalData(userData);

    this.fireAuth.signOut();
    this.router.navigate(['/login']);
  }

  validUIDToken(email: string, uidLogin: string, userInfo: UserInfo): UserInfo{
      if(uidLogin != userInfo.uid){
        //Primero Actualizamos informacion del usuario
        userInfo.lastUid = userInfo.uid;
        userInfo.uid = uidLogin;

        //Luego enviamos a actualizar datos de la base datos
        this.userService.saveUser(email, userInfo);
      }
    return userInfo;
  }

  redireccionar(userLoginData: UserLocalData){
    if (userLoginData.userInfo?.roles.length == 1) { //Redireccionar solo por rol que tiene
      userLoginData.rolActivo = userLoginData.userInfo?.roles[0];
      this.router.navigate(['/dash/'+userLoginData.userInfo?.roles[0]], {state: {user: userLoginData}});
      ManageLocalData.saveExistsLocalData(userLoginData);
      
    } else //Mandar a vista para seleccionar tipo de vista role a ocupar en la app
      this.router.navigate(['/pickrole'], {state: {user: userLoginData}});
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    // console.log('Parametros')
    // console.log(next)
    // console.log(state)
    const roles = ['admin','driver','user']
    const userData = ManageLocalData.getLocalData();
    if(userData.sesionActiva) {
      if(state.url.includes(roles[0]) || state.url.includes(roles[1]) || state.url.includes(roles[2]))
        if(state.url.includes(userData.rolActivo)){
          return true;
        }  else {
          this.router.navigate(['/login']);
          return false;
        }
        
      return true;
    }
    this.router.navigate(['/login']);
    return false; 
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthService).canActivate(next, state);
}
