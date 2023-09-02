import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IUserLogin } from '../models/IUserLogin';
import { NavigationExtras, Router, RouterLink} from '@angular/router';
import { listUserSys } from '../collection-users'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class LoginPage implements OnInit {

  errorLogin:boolean = false;

  listUser = listUserSys;

  userLoginModal: IUserLogin = {
    username:'',
    password:'',
  };

  constructor(private route: Router) { }

  ngOnInit() {
    this.userLoginModalRestart();
  }

  userLogin(userLoginInfo: IUserLogin): any{
    for(let i = 0; i < this.listUser.length; i++){
      if((this.listUser[i].username == userLoginInfo.username) && (this.listUser[i].password == userLoginInfo.password)) {
        /* console.log('User Loged...',this.userLoginModal.username, this.userLoginModal.password); */
        let userInfoSend: NavigationExtras = {
          state: {
            user: this.listUser[i]
          }
        }
        if(this.listUser[i].type == 'USER'){
          let sendInfo = this.route.navigate(['/user'], userInfoSend);
          return true;
        }else {
          let sendInfo = this.route.navigate(['/admin'], userInfoSend);
        }
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