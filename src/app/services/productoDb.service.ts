import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoDbService {

  constructor(public firestore: AngularFirestore) {}

  createDocument<Producto>(data: Producto, enlace: string, id: string) {
    const ref = this.firestore.collection<Producto>(enlace);
    this.firestore.collection('productos');
    return ref.doc(id).set(data);
  }
  createId() {
    return this.firestore.createId();
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
