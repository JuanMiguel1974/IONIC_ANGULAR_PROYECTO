import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InteractionService } from 'src/app/services/interaction.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  constructor(private authSvc: AuthService, private router: Router, private interacSvc: InteractionService) {}
  async onResetPassword(email) {
    try {
      await this.interacSvc.presentLoading();
      await this.authSvc.resetPassword(email.value);
      this.interacSvc.loading.dismiss();
      this.interacSvc.presentToast('Se le ha enviado un email para actualizar su password', 3000);
      this.router.navigate(['/login']);
    } catch (error) {
      this.interacSvc.loading.dismiss();
        this.interacSvc.presentToast(
          'El email no está registrado. Revise sus datos',
          3000
        );
    }
  }
}
