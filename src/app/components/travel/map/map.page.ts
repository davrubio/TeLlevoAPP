import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { GmpasService } from 'src/app/services/gmaps/gmpas.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapPage implements OnInit {

  @ViewChild('map', {static:true}) mapElementRef: ElementRef;
  googleMaps: any;
  center = {lat: -33.03362239261196, lng: -71.53317651646127}
  map: any;

  constructor(private gmaps: GmpasService, private renderer: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.loadMap();
  }

  async loadMap(){
    try{
      let googleMaps: any = await this.gmaps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;
      const location = new googleMaps.LatLng(this.center.lat, this.center.lng);
      this.map = new googleMaps.Map(mapEl, {
        center: location,
        zoom: 17,
      });
      this.renderer.addClass(mapEl, 'visible');
    }catch(error) {
      console.log(error)
    }
  }

  /* async createMap(){
    this.map = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.mapsKey,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    })
  } */
}
