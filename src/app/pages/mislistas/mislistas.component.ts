import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser, Lista } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-mislistas',
  templateUrl: './mislistas.component.html',
  styleUrls: ['./mislistas.component.scss'],
})
export class MislistasComponent implements OnInit, OnDestroy {
  nuevosSuscriber: Subscription;
  guardadosSuscriber: Subscription;
  listaNueva: Lista = {} as Lista;
  listasAnteriores: Lista[];
  listas: Lista[] = [];
  uid = '';
  localId= '';
  infoIUser: IUser;

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private firestoreSvc: FirestoreService
  ) {}

  async ngOnInit() {
    this.getListaEnCurso();
  }
  ngOnDestroy(): void {
    if (this.nuevosSuscriber) {
      this.nuevosSuscriber.unsubscribe();
   }
   if (this.guardadosSuscriber) {
      this.guardadosSuscriber.unsubscribe();
   }
  }
  segmentChanged(ev: any) {
    const opcion = ev.detail.value;
    if (opcion === 'anteriores') {
      this.getListasAnteriores();
    }
    if (opcion === 'nuevos') {
      this.getListaEnCurso();
    }
  }
  async getListaEnCurso() {
    console.log('getListasNuevas()');
    const uid = await this.authSvc.getLocalId();
    const path = 'Usuarios/' + uid + '/Lista/';
    this.nuevosSuscriber = this.firestoreSvc
      .getCollectionQuery<Lista>(path,'estado','==','abierta')
      .subscribe( res => {
        console.log('res',res);
        if (res) {
          this.listas = res;
        }
      });
  }
  async getListasAnteriores() {
    console.log('getListasAnteriores()');
    const uid = await this.authSvc.getLocalId();
    const path = 'Usuarios/' + uid + '/listasGuardadas/';
    this.guardadosSuscriber = this.firestoreSvc
      .getCollectionQuery<Lista>(path,'estado','==','guardada')
      .subscribe( res => {
        console.log('res',res);
        if (res) {
          this.listas = res;
        }
      });
  }
}
