import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserLocalData } from 'src/app/models/user/user.info';
import { TravelService } from 'src/app/services/travel/travel.service';
import { TravelInfo } from 'src/app/models/travel/travel.info';
import { HeaderComponent } from '../../base/header/header.component';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class UserComponent  implements OnInit {

  travelsActive: TravelInfo[] = [];

  userData: UserLocalData | undefined;

  constructor(private router: Router, private travelService: TravelService,) {
    travelService.getAllActiveTravels().then(result => {
      result.forEach(data => {
        this.travelsActive.push(data.data() as TravelInfo);
      })
    }).catch;
   }

  ngOnInit() { }

  viewTravel(travel: TravelInfo){
    this.router.navigate(['/travel/'+this.userData?.rolActivo], {state:{travelInfo:travel, user:this.userData}});
  }

  
}
