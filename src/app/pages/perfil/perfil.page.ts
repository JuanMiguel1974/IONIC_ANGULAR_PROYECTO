
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IUser } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  localId: string = null;
  uid: string = null;
  infoIUser: IUser = null;
  newImage = '';
  newFile: '';
  newIUser: IUser;

  constructor(
    private authSvc: AuthService,
    private firestoreSvc: FirestoreService,
    public alertController: AlertController,
    private interactionSvc: InteractionService,
    private firestorageSvc: FirestorageService
  ) {}

  async ngOnInit() {
    this.authSvc.stateUser().subscribe((res) => {
      this.getLocalId();
    });
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

  async saveAtributo(nombreAtributo: string, input: any) {
    await this.interactionSvc.presentLoading();
    const path = 'Usuarios';
    const localId = this.localId;
    const updateDoc = {
    };
    updateDoc[nombreAtributo] = input;
    this.firestoreSvc.updateDocument(path, localId, updateDoc).then(() => {
      this.interactionSvc.presentToast('actualizado con exito', 2000);
      this.interactionSvc.loading.dismiss();
    });
  }
  async saveFotoPerfil() {
    const path = 'Usuarios/';
    const id = this.infoIUser.uid;
    if (this.newFile !== undefined) {
      const res = this.firestorageSvc.uploadImage(
        this.newFile,
        path,
        id);
        this.interactionSvc.presentToast('guardado con exito', 2000);
        this.infoIUser.fotoDePerfil= this.newImage;
        this.newImage='';
      }
  }

  async editAtributo(nombreAtributo: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar' + nombreAtributo,
      inputs: [
        {
          name: nombreAtributo,
          type: 'text',
          placeholder: 'Ingresa tu nuevo' + nombreAtributo,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Aceptar',
          handler: (ev) => {
            console.log('Confirm Ok', ev);
            this.saveAtributo(nombreAtributo,ev[nombreAtributo]);
          },
        },
      ],
    });
    await alert.present();
  }

  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (image) => {
        this.newImage = image.target.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  /* getUid(){
    const uid = await this.authSvc.getUid();
    if (uid) {
      this.uid = uid;
      console.log(this.uid);
    } else {
      console.log('No existe uid');
    }
  } */
}
