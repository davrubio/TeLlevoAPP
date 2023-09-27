import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { listUserSys,  } from '../../../collection-app';
import { IFormRecPass } from 'src/app/models/IFormRecPass';
import { NavigationExtras, Router } from '@angular/router';

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
    confPAss1:'',
    confPAss2:'',
  }

  constructor(private route:Router) { }

  ngOnInit() {
  }

  userPass(userInfo: IFormRecPass): any {
    for(let user of this.listUser){
      if(user.institutional_email == userInfo.institutional_email){
        console.log(user.password)

        let userInfoSend: NavigationExtras = {
          state: {
            usuario: user
          }
        }

        this.route.navigate(['/resetpass'],userInfoSend)
      }
    }
  }
}
