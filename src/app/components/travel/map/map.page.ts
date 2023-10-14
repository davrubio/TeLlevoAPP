import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapPage implements OnInit {
  origin = {lat: -33.03362239261196, lng: -71.53317651646127}
  map: any;
  marker: any;
  search: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  constructor() {
   }
  

  ngOnInit() {
    this.loadMap();
    this.onSearchChange(this.map, this.marker);
  }
  loadMap(){
    let map: HTMLElement = document.getElementById('map');
    
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

  onSearchChange(localMap, localMarker){
    let autocomplete: HTMLElement = document.getElementById('autocomplete');
    const search = new google.maps.places.Autocomplete(autocomplete);
    this.search = search;

    search.addListener('place_changed', function() {
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

    this.directionsService.route(request, (resp, status) => {
      this.directionsRenderer.setDirections(resp);
    });

    this.marker.setPosition(null);
  }
}
