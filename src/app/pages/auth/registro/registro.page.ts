import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Cliente } from 'src/app/models/interfaces';
import { InteractionService } from 'src/app/services/interaction.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  datos: Cliente = {
    uid: null,
    productos: null,
    listas: null,
    lista: null,
    nickname: null,
    avatar: null,
    correo: null,
    password: null,
    perfil: 'cliente',
  };
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private interactionSvc: InteractionService,
    private firestore: FirestoreService
  ) {}

  ngOnInit() {}

  async registrar() {
    this.interactionSvc.presentLoading();
    const res = await this.authSvc.registrarUser(this.datos).catch (error => {
      this.interactionSvc.loading.dismiss();
      this.interactionSvc.presentToast('Registro incorrecto',2000);
    });
    if (res) {
      const path = 'Clientes';
      const id = res.user.uid;
      this.datos.uid = id;
      this.datos.password = null;
      await this.firestore.createDocument(this.datos, path,id);
      this.interactionSvc.loading.dismiss();
      this.interactionSvc.presentToast('Registrado con éxito',2000);
      this.router.navigate(['/verify-email']);
    }
  }

  /* public registroIncorrecto = false;
  async onRegister(email, password) {
    try {
      const user = await this.authSvc.register(email.value, password.value);
      if (user) {
        this.router.navigate(['verify-email']);
      } else {
        this.registroIncorrecto = true;
      }
    } catch (onRegisterError) {
      console.log('Error', onRegisterError);
    }
  } */
  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }
}
