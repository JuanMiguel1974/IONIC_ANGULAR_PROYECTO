import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loading: any;
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
      }else{
        this.interactionSvc.loading.dismiss();
        this.interactionSvc.presentToast('Login incorrecto. Revise sus datos', 3000);
      }

    } catch (onLoginError) {
      console.log('Error', onLoginError);
    }
  }
  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        const isVerified = this.authSvc.isMailVerified(user);
        this.interactionSvc.presentToast('Ha ingresado con exito!!', 3000);
        this.redirectUser(isVerified);
      }
    } catch (onLoginGoogleError) {
      console.log('Error', onLoginGoogleError);
      this.interactionSvc.presentToast('Login incorrecto. Revise sus datos', 3000);
    }
  }
  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }
}


