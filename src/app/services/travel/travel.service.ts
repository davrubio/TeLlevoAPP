import { Injectable } from '@angular/core';
import { DocumentData, DocumentSnapshot, Firestore, addDoc, collection, collectionData, doc, getDoc, query, setDoc, where } from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';
import { TravelInfo } from 'src/app/models/travel/travel.info';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  readonly NAME_COLLECTION = 'viajes';
  readonly TRAVEL_COLLECTION = collection(this.fireDatabase,this.NAME_COLLECTION);

  travelData: TravelInfo;

  constructor(private fireDatabase: Firestore) {
    this.travelData = JSON.parse(localStorage.getItem('travelData') || '{}');
  }

  getAllTravels(){
    return collectionData(this.TRAVEL_COLLECTION);
  }

  getAllActiveTravels(){
    return getDocs(query(this.TRAVEL_COLLECTION, where('stateTravel', '==', 3)))
  }

  saveTravel(travelData: TravelInfo){
    getDocs(query(this.TRAVEL_COLLECTION)).then(result => {
      travelData.idDoc = String(result.size+1);
      setDoc(doc(this.fireDatabase, this.NAME_COLLECTION, travelData.idDoc), travelData);
      /* addDoc(this.TRAVEL_COLLECTION, travelData); */
    });
    console.log(this.TRAVEL_COLLECTION.id);
  }

  updateTravel(travelData: TravelInfo){
    setDoc(doc(this.fireDatabase, this.NAME_COLLECTION, travelData.idDoc), travelData);
    console.log(travelData);
  }

  getTravel(idTravel: string): Promise<DocumentSnapshot<DocumentData>> {
    const documentRef = doc(this.fireDatabase, this.NAME_COLLECTION, idTravel);
    return getDoc(documentRef);
  }
}
