import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user/UserModel';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent  implements OnInit {

  userInfo: UserModel | undefined;

  constructor() { }

  ngOnInit() { }

}
