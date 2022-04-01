import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { sendPasswordResetEmail } from 'firebase/auth';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  public registroIncorrecto = false;
  constructor(private authSvc: AuthService, private router: Router) {}
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
  }
  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }
}
