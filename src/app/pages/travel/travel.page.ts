import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TravelModel } from 'src/app/models/travel/TravelModel';
import { UserModel } from 'src/app/models/user/UserModel';
import { Router, RouterOutlet } from '@angular/router';
import { UserComponent } from '../../components/travel/user/user.component';
import { HeaderComponent } from "../../components/base/header/header.component";
import { UserLocalData } from 'src/app/models/user/user.info';
import { TravelInfo } from 'src/app/models/travel/travel.info';

@Component({
    selector: 'app-travel',
    templateUrl: './travel.page.html',
    styleUrls: ['./travel.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, RouterOutlet, HeaderComponent]
})
export class TravelPage implements OnInit {

  readonly titlePage = 'Detalles del viaje';

  userData: UserLocalData;
  travelInfo: TravelInfo;

  constructor(private router: Router) {
    this.userData = this.router.getCurrentNavigation()?.extras.state?.['user'];
    this.travelInfo = this.router.getCurrentNavigation()?.extras.state?.['travelInfo'];
  }

  ngOnInit() {
  }

  subscribeToEmiter(component:any){
    component.userData = this.userData;
    if(component instanceof UserComponent){
      component.travel = this.travelInfo;
    }
  }
}
