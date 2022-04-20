import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  ToastController,
  AlertController,
} from '@ionic/angular';
import { IUser, Supermercado } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { PagesInformationService } from 'src/app/services/pages-information.service';
@Component({
  selector: 'app-set-supermercados',
  templateUrl: './set-supermercados.page.html',
  styleUrls: ['./set-supermercados.page.scss'],
})
export class SetSupermercadosPage implements OnInit {
  supermercados: Supermercado[] = [];

  newSupermercado: Supermercado;

  localId: string = null;
  infoIUser: IUser = null;
  enableNewSupermercado = false;

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
    this.getsupermercados();
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
  getsupermercados() {
    const path = 'Supermercados';
    this.firestoreSvc.getCollection<Supermercado>(path).subscribe((res) => {
      this.supermercados = res;
    });
  }
  async guardarSupermercado() {
    this.interactionSvc.presentLoading();
    const path = 'Supermercados';
    this.firestoreSvc
      .createDocument(this.newSupermercado, path, this.newSupermercado.id)
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
    this.enableNewSupermercado = true;
    this.newSupermercado = {
      id: this.firestoreSvc.createId(),
      nombre: '',
      ubicacion: ''
    };
  }

}
