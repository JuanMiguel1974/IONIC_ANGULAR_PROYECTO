/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(public firestore: AngularFirestore) {}

  createDocument(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
}

  getDocument<tipo>(path: string, id: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).delete();
  }
  updateDocument(path: string, id: string, data: any) {
    return this.firestore.collection(path).doc(id).update(data);
  }
  createId() {
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

 /*  getCollectionQuery<tipo>(
    path: string,
    parametro: string,
    condicion: any,
    busqueda: string
  ) {
    const collection = this.firestore.collection<tipo>(path, (ref) =>
      ref.where(parametro, condicion, busqueda)
    );
    return collection.valueChanges();
  }

  getCollectionAll<tipo>(
    path,
    parametro: string,
    condicion: any,
    busqueda: string,
    startAt: any
  ) {
    if (startAt == null) {
      startAt = new Date();
    }
    const collection = this.firestore.collectionGroup<tipo>(path, (ref) =>
      ref
        .where(parametro, condicion, busqueda)
        .orderBy('fecha', 'desc')
        .limit(1)
        .startAfter(startAt)
    );
    return collection.valueChanges();
  }

  getCollectionPaginada<tipo>(path: string, limit: number, startAt: any) {
    if (startAt == null) {
      startAt = new Date();
    }
    const collection = this.firestore.collection<tipo>(path, (ref) =>
      ref.orderBy('fecha', 'desc').limit(limit).startAfter(startAt)
    );
    return collection.valueChanges();
  } */
}

/*  createDocument(data: any, path: string, id: string) {
   const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  createId() {
    return this.firestore.createId();
  }
  getDocument<tipo>(path: string, id: string){
  return this.firestore.collection(path).doc<tipo>(id).valueChanges();

  }

  deleteDocument<tipo>(enlace: string, id: string) {
    const ref = this.firestore.collection<tipo>(enlace);
    return ref.doc(id).delete();
  }

  getCollectionChanges<tipo>(path: string): Observable<tipo[]> {
    const ref = this.firestore.collection<tipo>(path);
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
  updateDocument(path: string, id: string, data: any){
   return this.firestore.collection(path).doc(id).update(data);
  }
}
 */
