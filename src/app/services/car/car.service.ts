import { Injectable } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  readonly NAME_COLLECTION = 'vehiculos';
  readonly CAR_COLLECTION = collection(this.fireDatabase,this.NAME_COLLECTION);
  
  constructor(
    private fireDatabase: Firestore,
  ) { }
}
