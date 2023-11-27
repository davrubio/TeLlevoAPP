import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, getAuth, signInWithPopup } from '@angular/fire/auth';
import { UserService } from '../user/user.service';
import { UserInfo, UserLocalData, UserMaker } from 'src/app/models/user/user.info';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  
  userData!: UserLocalData;

  constructor(
    private fireAuth: Auth,
    private userService: UserService,
    private router: Router,
    private manageLocalData : UtilsService,
  ) { }

  GoogleAuthProv(){
    return this.AuthLogin(new GoogleAuthProvider().setCustomParameters({'hd':'duocuc.cl'}));
  }

  AuthLogin(provider: any){
    return signInWithPopup(this.fireAuth, provider)
      .then((result) =>{
        const userDataLogin = this.checkUser( result.user);
        return false;
      }).catch((error) => {
        const errorCode = error.code;
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
    
    const userData: UserLocalData = {
      email: userDataLogin.email,
      sesionActiva: true,
      rolActivo: '',
      travelActive: false,
      userInfo: userInfo,
    };
    this.manageLocalData.saveLocalStorage('userdata', userData);

    this.redireccionar(userData);
  }

  async isAuth(): Promise<boolean> {
    let localData: any = await this.manageLocalData.getFromLocalStorage('userdata'); 
    const userData = JSON.parse(localData);
    return new Promise(resolve => resolve(getAuth().currentUser != null && Object.keys(userData).length > 0));
  }

  async signOut() {
    let localData: any = await this.manageLocalData.getFromLocalStorage('userdata');
    let userData: UserLocalData = JSON.parse(localData);
    
    userData.rolActivo = '';
    userData.sesionActiva = false;

    this.manageLocalData.saveLocalStorage('userdata',userData);

    this.fireAuth.signOut();
    this.router.navigate(['/login']);
  }

  validUIDToken(email: string, uidLogin: string, userInfo: UserInfo): UserInfo{
      if(uidLogin != userInfo.uid){
        userInfo.lastUid = userInfo.uid;
        userInfo.uid = uidLogin;

        this.userService.saveUser(email, userInfo);
      }
    return userInfo;
  }

  redireccionar(userLoginData: UserLocalData){
    if (userLoginData.userInfo?.roles.length == 1) { //Redireccionar solo por rol que tiene
      userLoginData.rolActivo = userLoginData.userInfo?.roles[0];
      this.router.navigate(['/dash/'+userLoginData.userInfo?.roles[0]], {state: {user: userLoginData}});
      this.manageLocalData.saveLocalStorage('userdata', userLoginData);
    } else //Mandar a vista para seleccionar tipo de vista role a ocupar en la app
      this.router.navigate(['/pickrole'], {state: {user: userLoginData}});
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const roles = ['admin','driver','user'];
    let localData: any = await this.manageLocalData.getFromLocalStorage('userdata');
    const userData: UserLocalData = JSON.parse(localData);
    if(userData.sesionActiva) {
      if(state.url.includes(roles[0]) || state.url.includes(roles[1]) || state.url.includes(roles[2])) {
        if(state.url.includes(userData.rolActivo)){
          return new Promise(resolve => resolve(true));
        }  else {
          if(userData.userInfo?.roles.length! > 1) 
            this.router.navigate(['/pickrole']);
          else 
            this.router.navigate([`/dash/${userData.rolActivo}`]);

          return new Promise(resolve => resolve(false));
        }
      }
        
      return new Promise(resolve => resolve(true));
    }
    this.router.navigate(['/login']);
    return new Promise(resolve => resolve(false));
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
  return inject(AuthService).canActivate(next, state);
}
