import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UserInfo, UserLocalData } from 'src/app/models/user/user.info';

@Component({
  standalone: true,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [IonicModule, CommonModule,]
})
export class AdminComponent  implements OnInit {

  userData: UserLocalData | undefined;

  constructor() { }

  ngOnInit() { }

}
