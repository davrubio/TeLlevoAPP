import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user/UserModel';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ITravel } from 'src/app/models/travel/ITravel';
import { TravelModel } from 'src/app/models/travel/TravelModel';
import { listTravel } from 'src/app/collection-app';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-dash',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DriverComponent  implements OnInit {

  userInfo: UserModel | undefined;
  
  constructor(private router: Router) { }

  ngOnInit() { }

  regTravel(){
    this.router.navigate(['/travel/'+this.userInfo?.activeRole], {state:{user: this.userInfo}});
  }
  
}
