import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private interactionSvc: InteractionService
  ) {}
  async onLogin(email, password) {
    try {
      await this.interactionSvc.presentLoading();
      const user = await this.authSvc.login(email.value, password.value);
      if (user) {
        const isVerified = this.authSvc.isMailVerified(user);
        this.interactionSvc.loading.dismiss();
        this.interactionSvc.presentToast('Ha ingresado con exito!!', 3000);
        this.redirectUser(isVerified);
      }
    } catch (onLoginError) {
      console.log('Error', onLoginError);
      this.interactionSvc.loading.dismiss();
      this.interactionSvc.presentToast('Login incorrecto. Revise sus datos', 3000);
    }
  }
  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        const isVerified = this.authSvc.isMailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (onLoginGoogleError) {
      console.log('Error', onLoginGoogleError);
      this.interactionSvc.presentToast('Login incorrecto. Revise sus datos', 3000);
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

/* import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credenciales = {
    correo: null,
    password: null,
  };

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private interactionSvc: InteractionService
  ) {}
   async onLogin(email, password) {

    const user = await this.authSvc.login(email.value, password.value);
    if (user) {
      const isVerified = this.authSvc.isMailVerified(user);
      this.redirectUser(isVerified);
    }

    this.interactionSvc.presentToast('Login incorrecto. Revise sus datos', 3000);

  async login() {
    await this.interactionSvc.presentLoading();
    const res = await this.authSvc
      .login(this.credenciales.correo, this.credenciales.password)
      .catch((error) => {
        this.interactionSvc.loading.dismiss();
        this.interactionSvc.presentToast(
          // eslint-disable-next-line max-len
          'Usuario o contraseña incorrectas. La contraseña debe tener al menos 6 caracteres',
        2000);
      });
    if (res) {
      this.interactionSvc.loading.dismiss();
      this.interactionSvc.presentToast('Ingresado con éxito',2000);
      this.router.navigate(['/admin']);
    }
  }
   async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        const isVerified = this.authSvc.isMailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (onLoginGoogleError) {
      console.log('Error', onLoginGoogleError);
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
 */
