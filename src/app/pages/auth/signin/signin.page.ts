import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink} from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UserLocalData } from 'src/app/models/user/user.info';
import { ManageSession } from 'src/app/utils/manage.session';
import { UtilsService } from 'src/app/services/utils/utils.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class SigninPage implements OnInit {

  errorLogin: boolean = false;
  btnLogin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private manageLocalData : UtilsService,
  ) { }

  ngOnInit() { 
    this.authService.isAuth().then(valdiation => this.btnLogin = valdiation);
  }

  isOpen() {
    return this.errorLogin;
  }

  setOpen(errorLogin:boolean) {
    this.errorLogin = errorLogin;
  }

  loginWithGoogle() {
    this.authService.GoogleAuthProv().then(errorResult => {
      this.errorLogin = errorResult;
      if(!errorResult)
        this.btnLogin = true;
    }).catch(error => {
      console.log(error);
    });
  }

  isBtnLogin(): boolean {
    return this.btnLogin;
  }

  async redireccionar(){
    let localData: any = await this.manageLocalData.getFromLocalStorage('userdata');
    let userData: UserLocalData = JSON.parse(localData);

    if (userData.userInfo?.roles.length == 1) { //Redireccionar solo por rol que tiene
        this.router.navigate(['/dash/'+userData.rolActivo], {state: {user: userData}});
      } else //Mandar a vista para seleccionar tipo de vista role a ocupar en la app
        this.router.navigate(['/pickrole'], {state: {user: userData}});
  }

  cerrarSesion(){
    this.authService.signOut();
    this.btnLogin = false
  }
}
