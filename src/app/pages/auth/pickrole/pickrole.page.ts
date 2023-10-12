import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { UserModel } from 'src/app/models/user/UserModel';
import { UserInfo, UserLocalData } from 'src/app/models/user/user.info';

@Component({
  selector: 'app-pickrole',
  templateUrl: './pickrole.page.html',
  styleUrls: ['./pickrole.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class PickrolePage implements OnInit {

  userData: UserLocalData | undefined;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.userData = this.router.getCurrentNavigation()?.extras.state?.['user'];
  }

  redirectToPage(role:string){
    if(this.userData)
      this.userData.rolActivo = role;

    let url = '/dash/'+role;
    this.router.navigate([url], {state:{user:this.userData}});
  }

}
