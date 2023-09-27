import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserModel } from 'src/app/models/user/UserModel';
import { Router } from '@angular/router';
import { IFormRecPass } from 'src/app/models/IFormRecPass';
import { listUserSys } from 'src/app/collection-app';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ResetpassPage implements OnInit {

  errorConfPass = false;

  userInfoReceived: UserModel | undefined;

  userChangePassModal: IFormRecPass = {
    institutional_email:'',
    password:'',
    confPAss1:'',
    confPAss2:'',
  }

  constructor(private router: Router) {
    this.userInfoReceived = this.router.getCurrentNavigation()?.extras.state?.['usuario'];
  }

  ngOnInit() {
  }

  changePassword(){
    this.errorConfPass = this.validPassword();
    if(!this.errorConfPass && this.userInfoReceived){
      let i = listUserSys.indexOf(this.userInfoReceived);
      this.userInfoReceived.password = this.userChangePassModal.confPAss1;
      listUserSys[i] = this.userInfoReceived;
      this.router.navigate(['/login']);
    }
  }

  validPassword() :boolean{
    return !(this.userChangePassModal.confPAss1 == this.userChangePassModal.confPAss2) 
           || this.userChangePassModal.confPAss1.trim() == '';
  }

  isOpen() {
    return this.errorConfPass;
  }

  setOpen(errorConfPass:boolean) {
    this.errorConfPass = errorConfPass;
  }
}
