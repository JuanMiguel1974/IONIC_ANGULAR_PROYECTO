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

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  localId: string = localStorage.getItem('localId');
  uid: string = '';
  usuario: IUser;
  path = 'Lista/';
  public lista: Lista;
  lista$ = new Subject<Lista>();

  constructor(
    private authSvc: AuthService,
    private firestoreSvc: FirestoreService,
    public router: Router
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
    const path = 'Usuarios/' + this.localId + '/' + 'Lista';
    this.firestoreSvc
      .getDocument<Lista>(path, this.localId)
      .subscribe((res) => {
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
      id: this.localId,
      usuario: this.usuario,
      productos: [],
      precioTotal: null,
      fecha: new Date(),
    };
    this.lista$.next(this.lista);
  }

  getLista(): Observable<Lista> {
    return this.lista$.asObservable();
  }

  addProducto(producto: Producto) {
    if (this.localId.length) {
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
    const path = 'Usuarios/' + this.localId + '/' + this.path;
    this.firestoreSvc
      .createDocument(this.lista, path, this.lista.id)
      .then(() => {
        console.log('Añadido con exito');
      });
  }
  removeProducto(producto: Producto) {
    if (this.localId.length) {
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
        const path = 'Usuarios/' + this.localId + '/' + this.path;
        this.firestoreSvc
          .createDocument(this.lista, path, this.lista.id)
          .then(() => {
            console.log('Borrado con exito');
          });
      }
    }
  }
  guardarLista() {}
  clearLista() {}
}
