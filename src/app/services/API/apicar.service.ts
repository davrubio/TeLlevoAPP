import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { carApiKeys } from 'src/app/app.secret.keys';
import { CarModel, CarYear, ResultCarAPI } from 'src/app/models/querysapis/carapi.info';

@Injectable({
  providedIn: 'root'
})
export class APICarService {

  readonly headerRequest = new HttpHeaders({
    'X-RapidAPI-Key': carApiKeys.apiSecretKey1,
    // 'X-RapidAPI-Key': 'd557d8f9e9msh669df0bab098123p1171b7jsn71fd9b14e22a',
    'X-RapidAPI-Host': carApiKeys.apiHost,
    // 'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
    // 'X-Api-Key': carApiKeys.apiSecretKey2,
  })

  constructor(private http: HttpClient) { }

  getManufacturersData(): Observable<ResultCarAPI> {
    const httpOptions = {
      headers: this.headerRequest,

      params: {
        limit: '100',
        direction: 'asc',
        sort: 'id',
      }
    };

    return this.http.get<ResultCarAPI>(`${carApiKeys.urlServerApi}/makes`, httpOptions);
  }

  getModelsData(manufactererID: number): Observable<ResultCarAPI> {
    const httpOptions = {
      headers: this.headerRequest,
      params: {
        limit: '100',
        direction: 'asc',
        sort: 'id',
        make_id: manufactererID,
      }
    };
    return this.http.get<ResultCarAPI>(`${carApiKeys.urlServerApi}/models`, httpOptions);
  }

  getYearsData(model: CarModel): Observable<string[]> {
    const httpOptions = {
      headers: this.headerRequest,
      params: {
        model: model.name,
        make_id: model.make_id,
      }
    };
    return this.http.get<string[]>(`${carApiKeys.urlServerApi}/years`, httpOptions);
  }

  getColorData(nameManufacturer: string, model: string, year: string): Observable<ResultCarAPI> {
    const httpOptions = {
      headers: this.headerRequest,
      params: {
        direction: 'asc',
        sort: 'id',
        make: nameManufacturer,
        model: model,
        year: year,
      }
    };
    return this.http.get<ResultCarAPI>(`${carApiKeys.urlServerApi}/exterior-colors`, httpOptions);
  }

}