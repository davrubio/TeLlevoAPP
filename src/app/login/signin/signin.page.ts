import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IUserLogin } from '../../models/user/IUserLogin';
import { NavigationExtras, Router, RouterLink} from '@angular/router';
import { listUserSys } from '../../collection-users'


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class SigninPage implements OnInit {

  errorLogin = false;

  listUser = listUserSys;

  userLoginModal: IUserLogin = {
    username:'',
    password:'',
  };

  constructor(
    private route: Router,
  ) { }

  ngOnInit() {
    /* this.userLoginModalRestart(); */
  }

  userLogin(userLoginInfo: IUserLogin): any{
    for(let i = 0; i < this.listUser.length; i++){
      if((this.listUser[i].username == userLoginInfo.username) && (this.listUser[i].password == userLoginInfo.password)) {
        
        this.listUser[i].activeRole = this.listUser[i].roles[0];

        let userInfoSend: NavigationExtras = {
          state: {
            user: this.listUser[i]
          }
        }
        
        if (this.listUser[i].roles.length == 1) //Redireccionar solo por rol que tiene
          this.route.navigate(['/'+this.listUser[i].roles[0]], userInfoSend);
        else //Mandar a vista para seleccionar tipo de vista role a ocupar en la app
          this.route.navigate(['/pickrole'], userInfoSend);
        
        this.errorLogin = false;
        return true;
      }
    }
    this.userLoginModalRestart();
  }

  userLoginModalRestart(): void {
    this.userLoginModal.username = '';
    this.userLoginModal.password = '';
    this.errorLogin = true;
  }

  isOpen() {
    return this.errorLogin;
  }

  setOpen(errorLogin:boolean) {
    this.errorLogin = errorLogin;
  }

}
