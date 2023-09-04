import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { listUserSys, listTravel } from '../collection-app';
import { UserModel } from '../models/user/UserModel';
import { TravelModel } from '../models/travel/TravelModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TravelPage implements OnInit {

  travel: TravelModel | undefined;
  driver: UserModel | undefined;
  userInfo: UserModel | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userInfo = this.router.getCurrentNavigation()?.extras.state?.['user'];
    this.travel = this.router.getCurrentNavigation()?.extras.state?.['travelInfo'];
    this.driver = this.travel?.conductor;
  }

  regUserInTravel(){

    if(this.travel && this.userInfo && this.driver?.car){
      if(this.travel.asientosDisp != 0){
        let index = listTravel.indexOf(this.travel);
        this.travel.pasajeros?.push(this.userInfo);
        this.travel.asientosDisp -= 1;
        
        listTravel[index] = this.travel;

        this.router.navigate(['/dash/'+this.userInfo.activeRole],{state:{user:this.userInfo}})
      }

    }
  }
}
