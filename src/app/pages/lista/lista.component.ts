/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser, Lista } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  uid: string = '';
  usuario: IUser;
  lista: Lista = {} as Lista;
  //lista: Lista;
  listaSuscriber: Subscription;
  total: number;
  cantidad: number;

  constructor(
    public firestoreSvc: FirestoreService,
    public listaSvc: ListaService,
    public authSvc: AuthService
  ) {
    this.initLista();
    this.loadLista();
  }
  ngOnInit() {}

  loadLista() {
    this.listaSvc.getLista().subscribe((res) => {
      this.lista = res;
    });
  }
  initLista() {
    this.lista = {
      id: '',
      usuario: null,
      productos: [],
      precioTotal: null,
      fecha: new Date(),
    };
  }
}
