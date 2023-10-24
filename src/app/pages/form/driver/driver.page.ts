import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../../../components/base/header/header.component";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CarQueryManufacturer } from 'src/app/models/nopersistent/search.result';
import { carApiKeys } from 'src/app/app.secret.keys';
import { APICarService } from 'src/app/services/API/apicar.service';

@Component({
    selector: 'app-driver',
    templateUrl: './driver.page.html',
    styleUrls: ['./driver.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class DriverPage implements OnInit {

  readonly titlePage = 'Formulario Solicitud';
  readonly urlServerApi = carApiKeys.urlServerApi;
  
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-RapidAPI-Host': 'car-api2.p.rapidapi.com',
      'X-RapidAPI-Key': carApiKeys.apiSecretKey,
    }),
    params: {
      limit: '300',
      direction: 'asc',
      sort: 'id'
    }
  };
  
  listManufacters: string[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: APICarService
  ) { 
    this.apiService.getCarsInfo();
  }

  ngOnInit() {
  }

  getData(){
    const params = new HttpParams();

    this.http.get<any>(this.urlServerApi+'/api/makes',this.httpOptions,).subscribe(result => {
      result.data.forEach((data: CarQueryManufacturer) => {
        this.listManufacters.push(data.name);
      })
      // result.forEach(data => {
      //   this.listManufacters.push(data.name);
      // })
      // console.log(this.listManufacters);
    })
  }
}
