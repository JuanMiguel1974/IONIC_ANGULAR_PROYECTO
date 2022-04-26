import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Lista } from 'src/app/models/interfaces';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-todaslistas',
  templateUrl: './todaslistas.component.html',
  styleUrls: ['./todaslistas.component.scss'],
})
export class TodaslistasComponent implements OnInit, OnDestroy {
  nuevosSuscriber: Subscription;
  guardadosSuscriber: Subscription;
  listas: Lista[] = [];
  listasAnteriores: Lista[] = [];

  enProceso = true;

  constructor(
    private firestoreSvc: FirestoreService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.getListasEnProceso();
  }

  segmentChanged(ev: any) {
    const opcion = ev.detail.value;
    if (opcion === 'guardados') {
       this.enProceso = false;
      this.getListasGuardadas();
    }
    if (opcion === 'procesando') {
      this.enProceso = true;
      this.getListasEnProceso();
    }
  }
  async getListasEnProceso() {
    const path = 'Lista';
    let startAt = null;
     if (this.listas.length) {
        startAt = this.listas[this.listas.length - 1].fecha;
    }
    this.nuevosSuscriber = (
      await this.firestoreSvc.getCollectionAll<Lista>(
        path,
        'estado',
        '==',
        'abierta',
        startAt,
      )
    ).subscribe((res) => {
      if (res.length) {
        console.log('getListasEnProceso() -> res ', res);
        this.listas = res;
      }
    });
  }
  async getListasGuardadas() {
    const path = 'listasGuardadas';
    let startAt = null;
    if (this.listasAnteriores.length) {
        startAt = this.listasAnteriores[this.listasAnteriores.length - 1].fecha;
    }
    // eslint-disable-next-line max-len
    this.guardadosSuscriber = (await this.firestoreSvc.getCollectionAll<Lista>(path,
       'estado', '==', 'guardada', startAt)).subscribe( res => {
          if (res.length) {
                console.log('getlistasAnteriores() -> res ', res);
                res.forEach( lista => {
                      this.listasAnteriores = res;
                });
          }
    });

  }
  ngOnDestroy(): void {
    if (this.nuevosSuscriber) {
      this.nuevosSuscriber.unsubscribe();
    }
    if (this.guardadosSuscriber) {
      this.guardadosSuscriber.unsubscribe();
    }
  }
   cargarMas() {
    console.log('cargarmas()');
    if(this.enProceso === true){
      this.getListasEnProceso();
    }else{
      this.getListasGuardadas();
    }
    }
}

