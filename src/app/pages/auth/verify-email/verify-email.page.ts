import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../compartida/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnDestroy {
  user$: Observable<User> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService) {}

  async onSendEmail(): Promise<void> {
    try {
      this.authSvc.sendVerificationEmail();
    } catch (error) {
      console.log('Error->', error);
    }
  }
  ngOnDestroy(): void{
    this.authSvc.logout();
  }
}
