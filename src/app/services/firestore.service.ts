import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  createDocument<Producto>(data: Producto, enlace: string, id: string) {
    const ref = this.firestore.collection<Producto>(enlace);
    this.firestore.collection('productos');
    return ref.doc(id).set(data);
  }
  createId() {
   return this.firestore.createId();
  }

  deleteDocument() {}

  getDocument() {}

  editDocument() {}

  getCollection() {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((res) => {
        console.log('users', res);
      });
  }
}
