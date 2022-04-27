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

  getCollectionQuery<tipo>(
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
    const collection = this.firestore.collectionGroup<tipo>(
      path,
      (ref) => ref
      .where(parametro, condicion, busqueda)
      .orderBy('fecha', 'desc')
      .limit(2)
      .startAfter(startAt)
    );
    return collection.valueChanges();
  }

  getCollectionPaginada<tipo>(path: string, limit: number, startAt: any) {
    if (startAt == null) {
      startAt = new Date();
    }
    const collection = this.firestore.collection<tipo>(path, (ref) =>
      ref.orderBy('supermercado', 'desc').limit(limit).startAfter(startAt)
    );
    return collection.valueChanges();
  }
}
