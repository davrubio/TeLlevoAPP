import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../../../components/base/header/header.component";
import { Router } from '@angular/router';
import { UserLocalData } from 'src/app/models/user/user.info';
import { capitalizeString } from 'src/app/utils/formatter.string';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class ProfilePage implements OnInit {

  readonly titlePage = 'Perfil Usuario';

  userData: UserLocalData;

  constructor(
    private router: Router
  ) {
    this.userData = this.router.getCurrentNavigation()?.extras.state?.['user'];
   }

  ngOnInit() {
  }

  getRoles(): string{
    var rolesUser: string = '';
    if(this.userData.userInfo != null){
      
      if(this.userData.userInfo.roles.length == 1)
        rolesUser = capitalizeString(this.userData.userInfo.roles[0]);
      else {
        var nbrSepString: number = this.userData.userInfo.roles.length -1
        this.userData.userInfo.roles.forEach(rol => {
          rolesUser += capitalizeString(rol)
          if(nbrSepString >= 1) {
            rolesUser += ' | ';
            nbrSepString--;
          }
        })
      }
    }
    return rolesUser;
  }
}
