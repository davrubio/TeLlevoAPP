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

declare let google: any;

@Component({
  selector: 'app-user-travel',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MaskitoModule],
})
export class UserComponent implements OnInit {

  readonly options = maskitoNumberOptionsGenerator({precision: 0});

  travel: TravelInfo;
  userData: UserLocalData;
  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  constructor(private router: Router, private travelService: TravelService, private manageLocalData : UtilsService) { }

  ngOnInit() {
    this.loadMap();
   }

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

  loadMap() {
    let map: HTMLElement = document.getElementById('map')!;

    this.map = new google.maps.Map(map, {
      center: this.travel.originLatLng,
      zoom: 12,
      streetViewControl: false,
      mapTypeControl: false,
    });

    let request = {
      origin: this.travel.originLatLng,
      destination: this.travel.destinationLatLng,
      travelMode: google.maps.TravelMode.DRIVING,
    }

    this.directionsService.route(request, (resp: any) => {
      this.directionsRenderer.setDirections(resp);
    });

    this.directionsRenderer.setMap(this.map);
  }

}
