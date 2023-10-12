import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UserModel } from 'src/app/models/user/UserModel';
import { listTravel } from '../../../collection-app';
import { ITravel } from 'src/app/models/travel/ITravel';
import { TravelModel } from 'src/app/models/travel/TravelModel';
import { Router } from '@angular/router';
import { UserLocalData } from 'src/app/models/user/user.info';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class UserComponent  implements OnInit {

  travels = listTravel;
  

  userData: UserLocalData | undefined;

  travelModal: ITravel = {
    origen:'',
    destino: '',
    fecha_hora: undefined,
    conductor: undefined,
    asientosDisp: 0,
    pasajeros: undefined,
    tipoPago: '',
  }

  constructor(private router: Router) { }

  ngOnInit() { }

  viewTravel(travel: TravelModel){
    this.router.navigate(['/travel/'+this.userData?.rolActivo], {state:{travelInfo:travel, user:this.userData}});
  }

}
