import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user/UserModel';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent  implements OnInit {

  userInfo: UserModel | undefined;

  constructor() { }

  ngOnInit() { }

}
