import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IUserLogin } from '../../../models/user/IUserLogin';
import { Router, RouterLink} from '@angular/router';
import { listUserSys } from '../../../collection-app'
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UserLocalData } from 'src/app/models/user/user.info';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class SigninPage implements OnInit {

  errorLogin: boolean = false;
  isBtnLogin: boolean = true;

  listUser = listUserSys;

  userLoginModal: IUserLogin = {
    username:'',
    password:'',
  };

  constructor(
    private route: Router,
    private authService: AuthService,
  ) { 
    // if(localStorage.getItem('userdata') != null){
    //   setTimeout(() => { this.redireccionar(); }, 2000);
    // }
  }

  ngOnInit() {
    if(!this.authService.isAuth())
      this.isBtnLogin = false;
   }

  isOpen() {
    return this.errorLogin;
  }

  setOpen(errorLogin:boolean) {
    this.errorLogin = errorLogin;
  }

  loginWithGoogle() {
    this.isBtnLogin = true;

    this.authService.GoogleAuthProv()
      .then(result => {
        if(result){
          this.redireccionar();
          this.errorLogin = !result;
        } else {
          this.errorLogin = !result;
        }
      }).catch(error => {
        console.log(error);
      });
  }

  redireccionar(){
    var userData: UserLocalData = JSON.parse(localStorage.getItem('userdata') || '{}');

    if (userData.userInfo?.roles.length == 1) //Redireccionar solo por rol que tiene
      this.route.navigate(['/dash/'+userData.userInfo?.roles[0]], {state: {user: userData}});
    else //Mandar a vista para seleccionar tipo de vista role a ocupar en la app
      this.route.navigate(['/pickrole'], {state: {user: userData}});
  }

}
