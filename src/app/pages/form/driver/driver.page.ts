import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../../../components/base/header/header.component";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Manufacturer, SearchResults } from 'src/app/models/nopersistent/search.result';
import { carApiKeys } from 'src/app/app.secret.keys';

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
      'Authorization': `Bearer ${carApiKeys.apiSecretKey}`
    }),
  };
  
  listManufacters: string[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { 
    this.getData();
  }

  ngOnInit() {
  }

  getData(){
    this.http.get<any>(this.urlServerApi+'/api/makes',this.httpOptions).subscribe((result:Array<Manufacturer>) => {
      result.forEach(data => {
        this.listManufacters.push(data.name);
      })
      console.log(this.listManufacters);
    })
  }
}
