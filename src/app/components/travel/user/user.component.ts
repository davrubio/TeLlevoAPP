import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { listTravel } from 'src/app/collection-app';
import { TravelModel } from 'src/app/models/travel/TravelModel';
import { UserModel } from 'src/app/models/user/UserModel';

@Component({
  selector: 'app-user-travel',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UserComponent  implements OnInit {

  travel: TravelModel | undefined;
  driver: UserModel | undefined;
  userInfo: UserModel | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
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
