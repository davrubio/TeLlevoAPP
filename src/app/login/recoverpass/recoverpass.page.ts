import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { listUserSys,  } from '../../collection-users';
import { UserModel } from 'src/app/models/user/UserModel';
import { IFormRecPass } from 'src/app/models/IFormRecPass';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.page.html',
  styleUrls: ['./recoverpass.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RecoverpassPage implements OnInit {

  listUser = listUserSys;

  userRecModal: IFormRecPass = {
    institutional_email:'',
    password:'',
  }

  constructor() { }

  ngOnInit() {
  }

  userPass(userInfo: IFormRecPass): any {
    for(let i = 0; i < this.listUser.length; i++){
      if(this.listUser[i].institutional_email == userInfo.institutional_email){
        console.log(this.listUser[i].password)
      }
    }
  }
}
