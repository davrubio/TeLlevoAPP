import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user/UserModel';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent  implements OnInit {

  userInfo: UserModel | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userInfo = this.router.getCurrentNavigation()?.extras.state?.['user'];
    console.log('ADMIN COMPONENT')
    console.log(this.userInfo?.name);
  }

}
