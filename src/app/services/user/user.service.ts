import { Injectable } from '@angular/core';
import { DocumentData, DocumentSnapshot, Firestore, collection, collectionData, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { UserLogin } from 'src/app/models/user/UserLogin';
import { UserInfo, UserMaker } from 'src/app/models/user/user.info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly NAME_COLLECTION = 'usuarios';
  readonly USER_COLLECTION = collection(this.fireDatabase,this.NAME_COLLECTION);

  userData: UserLogin;

  constructor(
    private fireDatabase: Firestore,
  ) { 
    this.userData = JSON.parse(localStorage.getItem('user') || '{}');
  }

  getAllUsers(){
    let items: Observable<any[]>;
    
    items = collectionData(this.USER_COLLECTION);
    console.log(items.forEach(item => console.log(item)))

  }

  saveUser(email: string, userData: UserInfo){
    console.log(this.userData);

    setDoc(doc(this.fireDatabase, this.NAME_COLLECTION, email), userData);
  }

  getUser(emailUser: string): Promise<DocumentSnapshot<DocumentData>> {
    const documentRef = doc(this.fireDatabase, this.NAME_COLLECTION, emailUser);
    return getDoc(documentRef);
  }
}
