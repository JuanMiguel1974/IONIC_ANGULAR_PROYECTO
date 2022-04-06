import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../models/interfaces';
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) {}

 createDocument(data: any, path: string, id: string) {
   const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  createId() {
    return this.firestore.createId();
  }
  getDocument<User>(path: string, uid: string){
    const ref = this.firestore.collection('users').doc<User>(uid).get();
    return ref;

  }

  deleteDocument<Producto>(enlace: string, id: string) {
    const ref = this.firestore.collection<Producto>(enlace);
    return ref.doc(id).delete();
  }

  getCollectionChanges<Producto>(path: string): Observable<Producto[]> {
    const ref = this.firestore.collection<Producto>(path);
    return ref.valueChanges();
  }
  getCollection() {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((res) => {
        console.log('users', res);
      });
  }
}
