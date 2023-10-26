import { Injectable } from '@angular/core';
import { DocumentData, DocumentSnapshot, Firestore, collection, collectionData, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserInfo, UserLocalData } from 'src/app/models/user/user.info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly NAME_COLLECTION = 'usuarios';
  readonly USER_COLLECTION = collection(this.fireDatabase,this.NAME_COLLECTION);

  userData: UserLocalData;

  constructor(
    private fireDatabase: Firestore,
  ) { 
    this.userData = JSON.parse(localStorage.getItem('userdata') || '{}');
  }

  getAllUsers(){
    let items: Observable<any[]>;

    items = collectionData(this.USER_COLLECTION);
    items.forEach(item => console.log(item));

  }

  saveUser(email: string, userData: UserInfo){
    setDoc(doc(this.fireDatabase, this.NAME_COLLECTION, email), userData);
  }

  getUser(emailUser: string): Promise<DocumentSnapshot<DocumentData>> {
    const documentRef = doc(this.fireDatabase, this.NAME_COLLECTION, emailUser);
    return getDoc(documentRef);
  }
}
