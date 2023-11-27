import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import { TravelInfo } from 'src/app/models/travel/travel.info';
import { UserLocalData } from 'src/app/models/user/user.info';
import { MaskitoModule } from '@maskito/angular';
import { TravelService } from '../../../services/travel/travel.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-user-travel',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MaskitoModule],
})
export class UserComponent  implements OnInit {

  readonly options = maskitoNumberOptionsGenerator({precision: 0});

  travel: TravelInfo;
  userData: UserLocalData;

  constructor(private router: Router, private travelService: TravelService, private manageLocalData : UtilsService) { }

  ngOnInit() { }

  regUserInTravel(){
    if(this.travel.availableSeats == 1){
      this.travel.stateTravel = 2;
    }
    this.travel.availableSeats = this.travel.availableSeats-1;
    this.travel.passengers.push(this.userData.userInfo!);
    this.travelService.updateTravel(this.travel);
    this.userData.travelActive = true;
    this.manageLocalData.saveLocalStorage('userdata',this.userData);
    this.router.navigate(['/dash/'+this.userData.rolActivo],{state:{user:this.userData}});
  }

}
