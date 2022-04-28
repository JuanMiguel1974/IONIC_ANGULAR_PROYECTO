/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser, Lista } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  usuario: IUser;
  lista: Lista = {} as Lista;
  uid: string = localStorage.getItem('localId');

  listaSuscriber: Subscription;
  total: number;
  cantidad: number;

  constructor(
    public firestoreSvc: FirestoreService,
    public listaSvc: ListaService,
    public authSvc: AuthService,
    public interactionSvc: InteractionService,

  ) {
    this.initLista();
    //this.loadLista();
  }
  ngOnInit() { this.loadLista();}

  loadLista() {
    this.listaSvc.getLista().subscribe((res) => {
      this.lista = res;
      this.getTotal();
      this.getCantidad();
    });
  }
  initLista() {
    this.lista = {
      id: '',
      usuario: null,
      productos: [],
      precioTotal: null,
      fecha: new Date(),
      estado:'abierta'
    };
  }
  getTotal() {
    this.total = 0;
    this.lista.productos.forEach((producto) => {
      this.total = producto.producto.precio * producto.cantidad + this.total;
    });
  }

  getCantidad() {
    this.cantidad = 0;
    this.lista.productos.forEach((producto) => {
      this.cantidad = producto.cantidad + this.cantidad;
    });
  }
  async guardarLista() {
    if(!this.lista.productos.length){
      console.log('Añade items a la lista');

      return;
    }
    this.lista.estado = 'guardada';
    this.lista.fecha = new Date();
    this.lista.precioTotal = this.total;
    this.lista.id = this.firestoreSvc.createId();
    //const uid = await this.authSvc.getLocalId();
    const path = 'Usuarios/' + this.uid + '/listasGuardadas/';
    console.log('guardar', this.lista, this.uid, path);

    this.firestoreSvc.createDocument(this.lista, path, this.lista.id).then( () => {
      this.interactionSvc.presentToast('Lista guardada con exito', 2000);
      this.listaSvc.clearLista();

   });
  }
}
