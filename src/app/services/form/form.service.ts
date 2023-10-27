import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDocs, or, query, setDoc, where } from '@angular/fire/firestore';
import { DriverRequest } from 'src/app/models/driver/form.info';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  readonly NAME_COLLECTION = 'peticiones-conductores';
  readonly PETCON_COLLECTION = collection(this.fireDatabase,this.NAME_COLLECTION);

  constructor(
    private fireDatabase: Firestore,
  ) { }

  saveRequest(driverRequest: DriverRequest){
    getDocs(query(this.PETCON_COLLECTION)).then(result => {
      const idDoc = String(result.size+1);
      driverRequest.idDoc = idDoc
      setDoc(doc(this.fireDatabase, this.NAME_COLLECTION, idDoc), driverRequest);
    });
  }

  async getAllRequests(){
    return getDocs(query(this.PETCON_COLLECTION));
  }
  
  async getAllPendsRequests(){
    return getDocs(query(this.PETCON_COLLECTION, or(where('statusRequest','==',0), where('statusRequest','==',3))));
  }

  async getAllAcceptedRequests(){
    return getDocs(query(this.PETCON_COLLECTION, where('statusRequest','==',1)));
  }

  async getAllRejectedRequests(){
    return getDocs(query(this.PETCON_COLLECTION, where('statusRequest','==',2)));
  }

  // getAllRequestsPend(){
  //   getDocs(query(this.PETCON_COLLECTION)).then(result => {
  //     setDoc(doc(this.fireDatabase, this.NAME_COLLECTION, String(result.size+1)), driverRequest);
  //   })
  // }

  updateRequest(driverRequest: DriverRequest){
    setDoc(doc(this.fireDatabase, this.NAME_COLLECTION, driverRequest.idDoc), driverRequest);
  }
}
