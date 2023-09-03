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

  constructor(private router: Router) {
    this.userInfo = this.router.getCurrentNavigation()?.extras.state?.['user'];
  }

  ngOnInit() {
  }

  redirectToPage(url:string){
    url = '/'+url;
    this.router.navigate([url], {state:{user:this.userInfo}});
  }

}
