import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user/UserModel';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent  implements OnInit {

  userInfo: UserModel | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userInfo = this.router.getCurrentNavigation()?.extras.state?.['user'];
  }

}
