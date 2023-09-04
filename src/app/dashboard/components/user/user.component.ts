import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UserModel } from 'src/app/models/user/UserModel';
import { listTravel } from '../../../collection-app';
import { ITravel } from 'src/app/models/travel/ITravel';
import { TravelModel } from 'src/app/models/travel/TravelModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class UserComponent  implements OnInit {

  travels = listTravel;
  

  userInfo: UserModel | undefined;

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
    this.router.navigate(['/travel'], {state:{travelInfo:travel, user:this.userInfo}});
  }

}
