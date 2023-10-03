import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, documentId, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { UserLogin } from 'src/app/models/user/UserLogin';
import { UserInfo } from 'src/app/models/user/UserInfo';

export interface usuario{
  nombre: string;
  id: number;
} 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData: UserLogin;

  constructor(
    private fireDatabase: Firestore,
  ) { 
    this.userData = JSON.parse(localStorage.getItem('user') || '{}');
  }

  getAllUsers(){
    const nameCollection = 'usuarios';
    const collectionDB = collection(this.fireDatabase,nameCollection);
    let items: Observable<usuario[]>;
    
    items = collectionData(collectionDB) as Observable<usuario[]>;
    console.log(items.forEach(item => console.log(item)))

  }

  saveUser(){
    const nameCollection = 'usuarios';
    const collectionDB = collection(this.fireDatabase,nameCollection);
    console.log(this.userData);
    setDoc(doc(this.fireDatabase,nameCollection,this.userData.uid),{nombre: this.userData.name, id: 10});
  }
}
