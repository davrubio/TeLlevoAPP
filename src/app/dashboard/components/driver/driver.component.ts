import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user/UserModel';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
})
export class DriverComponent  implements OnInit {

  userInfo: UserModel | undefined;

  constructor() { }

  ngOnInit() { }

}
