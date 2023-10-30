import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink} from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UserLocalData } from 'src/app/models/user/user.info';
import { ManageSession } from 'src/app/utils/manage.session';
import { ManageLocalData } from 'src/app/utils/manage.localdata';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class SigninPage extends ManageSession implements OnInit {

  errorLogin: boolean = false;

  constructor(
    private router: Router,
    authService: AuthService,
  ) {
    super(authService);
  }

  ngOnInit() { }

  isOpen() {
    return this.errorLogin;
  }

  setOpen(errorLogin:boolean) {
    this.errorLogin = errorLogin;
  }

  loginWithGoogle() {
    this.authService.GoogleAuthProv()
    .then(result => {
      if(result){
        this.errorLogin = result;
      } else {
        this.errorLogin = result;
      }
    }).catch(error => {
      console.log(error);
    });
  }

  isBtnLogin(): boolean {
    return this.authService.isAuth();
  }

  redireccionar(){
    var userData: UserLocalData = ManageLocalData.getLocalData();
    if (userData.userInfo?.roles.length == 1) { //Redireccionar solo por rol que tiene
      this.router.navigate(['/dash/'+userData.rolActivo], {state: {user: userData}});
    } else //Mandar a vista para seleccionar tipo de vista role a ocupar en la app
      this.router.navigate(['/pickrole'], {state: {user: userData}});
  }
}
