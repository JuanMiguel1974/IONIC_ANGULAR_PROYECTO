/* eslint-disable prefer-const */
/* eslint-disable object-shorthand */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { IUser, Lista, Producto, ProductoLista } from '../models/interfaces';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { InteractionService } from './interaction.service';

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  uid: string = localStorage.getItem('localId');
  usuario: IUser;
  path = 'Lista/';
  public lista: Lista;
  lista$ = new Subject<Lista>();

  constructor(
    private authSvc: AuthService,
    private firestoreSvc: FirestoreService,
    public router: Router,
    public interactionSvc: InteractionService,

  ) {
    this.authSvc.stateUser().subscribe((res) => {
      console.log(res);
      if (res !== null) {
        this.uid = res.uid;
        this.loadUsuario();
      }
    });
  }
  loadUsuario() {
    const path = 'Usuarios';
    this.firestoreSvc.getDocument<IUser>(path, this.uid).subscribe((res) => {
      this.usuario = res;
      this.loadLista();
    });
  }

  loadLista() {
    const path = 'Usuarios/' + this.uid + '/' + 'Lista';
    this.firestoreSvc.getDocument<Lista>(path, this.uid).subscribe((res) => {
      console.log(res);
      if (res) {
        this.lista = res;
        this.lista$.next(this.lista);
      } else {
        this.initLista();
      }
    });
  }
  initLista() {
    this.lista = {
      id: this.uid,
      usuario: this.usuario,
      productos: [],
      precioTotal: null,
      fecha: new Date(),
      estado:'abierta'
    };
    this.lista$.next(this.lista);
  }

  getLista(): Observable<Lista> {
    this.lista$.next(this.lista);

    return this.lista$.asObservable();
  }

  addProducto(producto: Producto) {
    if (this.uid.length) {
      const item = this.lista.productos.find((productoLista) => {
        return productoLista.producto.id === producto.id;
      });
      if (item !== undefined) {
        item.cantidad++;
      } else {
        const add: ProductoLista = {
          cantidad: 1,
          producto,
        };
        this.lista.productos.push(add);
      }
    } else {
      return;
    }
    this.lista$.next(this.lista);
    const path = 'Usuarios/' + this.uid + '/' + this.path;
    this.firestoreSvc
      .createDocument(this.lista, path, this.lista.id)
      .then(() => {
        console.log('Añadido con exito');
        this.interactionSvc.presentToast('Añadido con exito', 2000);

      });
  }
  removeProducto(producto: Producto) {
    if (this.uid.length) {
      let position = 0;
      const item = this.lista.productos.find((productoLista, index) => {
        position = index;
        return productoLista.producto.id === producto.id;
      });
      if (item !== undefined) {
        item.cantidad--;
        if (item.cantidad === 0) {
          this.lista.productos.splice(position, 1);
        }
        const path = 'Usuarios/' + this.uid + '/' + this.path;
        this.firestoreSvc
          .createDocument(this.lista, path, this.lista.id)
          .then(() => {
            console.log('Borrado con exito');
          });
      }
    }
  }
  guardarLista() {}
  clearLista() {
    this.initLista();
    const path = 'Usuarios/' + this.uid + '/' + 'Lista';
    this.firestoreSvc.deleteDoc(path, this.uid).then(() => {
      this.initLista();
    });
  }
}
