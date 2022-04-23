import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/interfaces';
import { InteractionService } from 'src/app/services/interaction.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FirestorageService } from 'src/app/services/firestorage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  newImage = '';
  newFile: '';
  datos: IUser = {
    uid: null,
    idLocal: null,
    nickname: null,
    correo: null,
    password: null,
    fotoDePerfil: null,
    categoria: 'usuario',
  };
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private interactionSvc: InteractionService,
    private firestorageSvc: FirestorageService,
    public firestoreSvc: FirestoreService
  ) {}

  ngOnInit() {}
  async registrar() {
    this.interactionSvc.presentLoading();
    const res = await this.authSvc.registrarUser(this.datos).catch((error) => {
      this.interactionSvc.loading.dismiss();
      this.interactionSvc.presentToast(
        'Registro incorrecto. Compruebe sus datos',
        2000
      );
      console.log('error');
    });
    if (res) {
      const path = 'Usuarios';
      const uid = res.user.uid;
      this.datos.uid = uid;
      this.datos.password = null;
      if (this.newFile !== undefined) {
        const resp = await this.firestorageSvc.uploadImage(
          this.newFile,
          path,
          uid
        );
        this.datos.fotoDePerfil = resp;
      }
      await this.firestoreSvc.createDocument(this.datos, path, uid);
      this.interactionSvc.loading.dismiss();
      this.interactionSvc.presentToast('Registrado con exito!!', 3000);
      this.router.navigate(['/verify-email']);
    }
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

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }
}
