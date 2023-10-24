import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { carApiKeys } from 'src/app/app.secret.keys';
import { CarModel } from 'src/app/models/driver/CarModel';
import { CarInfo, CarModelInfo, CarQueryManufacturer, CarQueryModel, SearchResult } from 'src/app/models/nopersistent/search.result';

@Injectable({
  providedIn: 'root'
})
export class APICarService {

  readonly urlServerApi = carApiKeys.urlServerApi;
  
  readonly headerRequest = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-RapidAPI-Host': 'car-api2.p.rapidapi.com',
    'X-RapidAPI-Key': carApiKeys.apiSecretKey,
  })

  constructor(private http: HttpClient) { }

  getCarsInfo(): CarInfo[] {
    const httpOptions = {
      header: this.headerRequest,
      params: {
        limit: '300',
        direction: 'asc',
        sort: 'id',
      }
    };

    var listManufacters: CarInfo[] = [];
    this.http.get<any>(this.urlServerApi+'/api/makes',httpOptions).subscribe((result: SearchResult) => {
      result.data.forEach((data: CarQueryManufacturer) => {
        const infoCar: CarInfo = {
          idManufacterer: data.id,
          manufacterer: data.name,
          listModels: null,
        }
        infoCar.listModels = this.getModels(data.id);
        listManufacters.push(infoCar);
      })
    })
    return listManufacters;
  }

  getModels(manufactererID: number): CarModelInfo[] {
    const httpOptions = {
      header: this.headerRequest,
      params: {
        limit: '300',
        direction: 'asc',
        sort: 'id',
        make_id:manufactererID,
      }
    };

    const listModels: CarModelInfo[] = [];

    this.http.get<any>(this.urlServerApi+'/api/models',httpOptions).subscribe((result: SearchResult) => {
      result.data.forEach((data: CarQueryModel) => {
        const infoCar: CarModelInfo = {
          name: data.name,
          listYears: [],
        }
        infoCar.listYears = this.getYearsModel(data.make_id,data.name);

        listModels.push(infoCar);
      })
    })
    return listModels;
  }

  getYearsModel(manufactererID: number, nameModel: string): number[] {
    const httpOptions = {
      header: this.headerRequest,
      params: {
        limit: '300',
        direction: 'asc',
        sort: 'id',
        model: nameModel,
        make_id:manufactererID,
      }
    };

    var listYears: number[] = [];

    this.http.get<any>(this.urlServerApi+'/api/years',httpOptions).subscribe((result: SearchResult) => {
      listYears = result.data;
    })
    return listYears;
  }
}