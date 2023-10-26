import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDocs, query, setDoc } from '@angular/fire/firestore';
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
      setDoc(doc(this.fireDatabase, this.NAME_COLLECTION, String(result.size+1)), driverRequest);
    })
  }

  getAllRequests(){
    return collectionData(this.PETCON_COLLECTION);
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
