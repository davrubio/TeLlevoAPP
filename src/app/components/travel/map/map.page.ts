import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Travel, TravelInfo } from 'src/app/models/travel/travel.info';
import { TravelService } from '../../../services/travel/travel.service';
import { UserLocalData } from 'src/app/models/user/user.info';
import { Car } from 'src/app/models/driver/cardriver.info';
import { UtilsService } from 'src/app/services/utils/utils.service';


declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapPage implements OnInit {
  
  readonly payTypes: string[] = ['Efectivo','Transeferencia'];

  userData: UserLocalData | undefined;
  travel: TravelInfo | undefined;
  car: Car | undefined;
  paytypeTmp: string;
  priceTmp: number;

  origin = {lat: -33.03362239261196, lng: -71.53317651646127}
  map: any;
  marker: any;
  search: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  constructor(private TravelService: TravelService, private manageLocalData : UtilsService) { }

  async ngOnInit() {
    let localData: any = await this.manageLocalData.getFromLocalStorage('userdata');
    this.userData = JSON.parse(localData);
    this.loadMap();
    this.onSearchChange(this.map, this.marker);
  }
  loadMap(){
    let map: HTMLElement = document.getElementById('map')!;
    
    this.map = new google.maps.Map(map, {
      center: this.origin,
      zoom: 17
    });

    this.marker = new google.maps.Marker({
      position: this.origin,
      map: this.map
    });

    this.directionsRenderer.setMap(this.map);
    /* let indicactions: HTMLElement = document.getElementById('indicactions'); */
    this.directionsRenderer.setPanel();
  }

  onSearchChange(localMap: any, localMarker: any){
    let autocomplete: HTMLElement = document.getElementById('autocomplete')!;
    const search = new google.maps.places.Autocomplete(autocomplete);
    this.search = search;

    search.addListener('place_changed', () => {
      let place = search.getPlace().geometry.location;

      localMap.setCenter(place);
      localMap.setZoom(15);
      localMarker.setPosition(place);
      
    });

  }

  calcuRoute(){
    let place = this.search.getPlace().geometry.location;
    let request = {
      origin: this.origin,
      destination: place,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.marker.setPosition(null);

    console.log(this.search.getPlace().formatted_address);  // direccion
    console.log(this.search.getPlace().geometry.location.lat()); // latitud
    console.log(this.search.getPlace().geometry.location.lng()); // longitud

    this.travel = Travel.createTravelInfo(this.userData?.userInfo!, this.search.getPlace().formatted_address, this.paytypeTmp, this.priceTmp);
    this.TravelService.saveTravel(this.travel)



    this.directionsService.route(request, (resp: any) => {
      this.directionsRenderer.setDirections(resp);
    });
  }

  paySelected(event: any){
    this.paytypeTmp = event.target.value
    console.log(this.paytypeTmp);
  }

  

}

