import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserModel } from '../models/UserModels';
import { IUserLogin } from '../models/IUserLogin';
import { NavigationExtras, Router, RouterLinkWithHref} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  listUser: UserModel[] = [
    new UserModel('David', 'Rubio', 'dav.rubio@duocuc.cl', 'Ingenieria en Informatica', 'USER', 'dav.rubio','dav123'),
    new UserModel('Nicolas', 'Caviedes', 'ni.caviedes@duocuc.cl', 'Ingenieria en Informatica', 'ADMIN','ni.caviedes','nico123'),
  ];

  userLoginModal: IUserLogin = {
    username:'',
    password:'',
  };

  constructor(private route: Router) { }

  ngOnInit() {
    this.userLoginModalRestart();
  }

  userLogin(userLoginInfo: IUserLogin): boolean{
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
    return false;
  }
  userLoginModalRestart(): void {
    this.userLoginModal.username = '';
    this.userLoginModal.password = '';
  }
}