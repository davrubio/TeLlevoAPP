import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { CareerModel } from 'src/app/models/career/career.info';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  readonly NAME_COLLECTION = 'carreras';
  readonly CAREER_COLLECTION = collection(this.fireDatabase,this.NAME_COLLECTION);

  constructor(private fireDatabase: Firestore) { }

  getAllCareers(){
    return collectionData(this.CAREER_COLLECTION);
  }
}
