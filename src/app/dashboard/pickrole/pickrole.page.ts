import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { UserModel } from 'src/app/models/user/UserModel';

@Component({
  selector: 'app-pickrole',
  templateUrl: './pickrole.page.html',
  styleUrls: ['./pickrole.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class PickrolePage implements OnInit {

  userInfo : UserModel | undefined;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.userInfo = this.router.getCurrentNavigation()?.extras.state?.['user'];
  }

  redirectToPage(role:string){
    if(this.userInfo)
      this.userInfo.activeRole = role;

    let url = '/'+role;
    this.router.navigate([url], {state:{user:this.userInfo}});
  }

}
