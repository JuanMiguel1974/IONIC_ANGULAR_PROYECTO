import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  ToastController,
  AlertController,
} from '@ionic/angular';
import { IUser, Seccion } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { PagesInformationService } from 'src/app/services/pages-information.service';

@Component({
  selector: 'app-set-secciones',
  templateUrl: './set-secciones.page.html',
  styleUrls: ['./set-secciones.page.scss'],
})
export class SetSeccionesPage implements OnInit {
  secciones: Seccion[] = [];

  newSeccion: Seccion;

  localId: string = null;
  infoIUser: IUser = null;
  enableNewSeccion = false;

  loading: any;

  constructor(
    private firestoreSvc: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public pagesInfoSvc: PagesInformationService,
    public interactionSvc: InteractionService,
    public authSvc: AuthService
  ) {}

  ngOnInit() {
    this.authSvc.stateUser().subscribe((res) => {
      this.getLocalId();
    });
    this.getSecciones();
  }
  async getLocalId() {
    const localId = await this.authSvc.getLocalId();
    if (localId) {
      this.localId = localId;
      console.log(this.localId);
      this.getInfoUser();
    } else {
      console.log('No existe localId');
    }
  }
  getInfoUser() {
    const path = 'Usuarios';
    const localId = this.localId;
    this.firestoreSvc.getDocument<IUser>(path, localId).subscribe((res) => {
      if (res) {
        this.infoIUser = res;
      }
      console.log('los datos son ->', res);
    });
  }
  getSecciones() {
    const path = 'Seccion';
    this.firestoreSvc.getCollection<Seccion>(path).subscribe((res) => {
      this.secciones = res;
    });
  }
  async guardarSeccion() {
    this.interactionSvc.presentLoading();
    const path = 'Seccion';
    this.firestoreSvc
      .createDocument(this.newSeccion, path, this.newSeccion.id)
      .then(async (res) => {
        this.interactionSvc.presentToast('guardado con exito', 2000);
        this.interactionSvc.loading.dismiss();
      })
      .catch((error) => {
        this.interactionSvc.presentToast('no se pudo guardar', 2000);
      });
  }
  async finishLoading() {
    this.loading = false;
    await this.loadingController.dismiss();
  }
  nuevo() {
    this.enableNewSeccion = true;
    this.newSeccion = {
      id: this.firestoreSvc.createId(),
      nombre: '',
    };
  }

}
