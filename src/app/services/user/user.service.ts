import { Injectable } from '@angular/core';
import { DocumentData, DocumentSnapshot, Firestore, collection, collectionData, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { UserInfo, UserLocalData } from 'src/app/models/user/user.info';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly NAME_COLLECTION = 'usuarios';
  readonly USER_COLLECTION = collection(this.fireDatabase,this.NAME_COLLECTION);

  constructor(
    private fireDatabase: Firestore,
  ) { 
  }

  getAllUsers(){    
    return collectionData(this.USER_COLLECTION);
  }

  saveUser(email: string, userData: UserInfo){
    setDoc(doc(this.fireDatabase, this.NAME_COLLECTION, email), userData);
  }

  getUser(emailUser: string): Promise<DocumentSnapshot<DocumentData>> {
    const documentRef = doc(this.fireDatabase, this.NAME_COLLECTION, emailUser);
    return getDoc(documentRef);
  }
}
