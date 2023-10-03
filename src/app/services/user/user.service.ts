import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface usuario{
  nombre: string;
  id: number;
} 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(
    private fireDatabase: Firestore,
  ) { }

  getUser(){
    const nameCollection = 'usuarios';
    const collectionDB = collection(this.fireDatabase,nameCollection);
    let items: Observable<usuario[]>;
    
    items = collectionData(collectionDB) as Observable<usuario[]>;
    console.log(items.forEach(item => console.log(item)))

  }

  createCollection(){
    const nameCollection = 'pasajeros';
    const collectionDB = collection(this.fireDatabase,nameCollection);
    
  }
}
