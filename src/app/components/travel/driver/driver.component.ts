import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { listTravel } from 'src/app/collection-app';
import { ITravel } from 'src/app/models/travel/ITravel';
import { TravelModel } from 'src/app/models/travel/TravelModel';
import { UserModel } from 'src/app/models/user/UserModel';

@Component({
  selector: 'app-driver-travel',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DriverComponent  implements OnInit {

  userInfo: UserModel | undefined;

  formTravel: ITravel = {
    origen: '',
    destino: '',
    fecha_hora: undefined,
    conductor: undefined,
    asientosDisp: undefined,
    pasajeros: undefined,
    tipoPago: '',
    mtoViaje: 0,
  }

  constructor(private router: Router) { }

  ngOnInit() {}

  regTravel(){
    if(this.userInfo && this.userInfo.car){
      this.formTravel.asientosDisp = this.userInfo.car.asientos-1;
      this.formTravel.conductor = this.userInfo;
      this.formTravel.fecha_hora = new Date();
      this.formTravel.pasajeros = Array.from({length: this.formTravel.asientosDisp});

      let travel = new TravelModel(
        this.formTravel.origen,
        this.formTravel.destino,
        this.formTravel.fecha_hora,
        this.formTravel.conductor,
        this.formTravel.asientosDisp,
        this.formTravel.pasajeros,
        this.formTravel.tipoPago,
        this.formTravel.mtoViaje,
      );
      
      console.log(travel)

      listTravel[1] = travel;

      this.router.navigate(['/login']);
    }
  }
}
