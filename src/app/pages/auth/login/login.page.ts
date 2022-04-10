/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IResponse, User } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: any;
  loginForm: FormGroup;
  subRef$: Subscription;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private interactionSvc: InteractionService,
    private cookieService: CookieService,
    private http: HttpClient,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl (),
    });
  }
  ngOnInit(): void {}

  async onSubmit() {
    const usuarioLogin: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    try {
      await this.interactionSvc.presentLoading();
      const user = await this.authSvc.login(usuarioLogin.email,usuarioLogin.password);
      if (user) {
        const isVerified = this.authSvc.isMailVerified(user);
        this.cookieService.set('token', user.token);
        this.interactionSvc.loading.dismiss();
        this.interactionSvc.presentToast('Ha ingresado con exito!!', 3000);
        this.redirectUser(isVerified);
      } else {
        this.interactionSvc.loading.dismiss();
        this.interactionSvc.presentToast(
          'Login incorrecto. Revise sus datos',
          3000
        );
      }
    } catch (onLoginError) {
      console.log('Error', onLoginError);
    }
    const datos = {...usuarioLogin, returnSecureToken: true};
    this.http
    .post<IResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyApr_5WOVSiBdmA-vSfCIs_3CjMfP4J2Rw',
      JSON.stringify(datos),
      { observe: 'response' }
    )
    .subscribe(
      (res) => {
        const token = (res.body.idToken);
        console.log(token);
        localStorage.setItem('token',token);
        this.cookieService.set('token',token);
        sessionStorage.setItem('token',token);
       // this.router.navigate(['/home]']);
      },
    );

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
      this.interactionSvc.presentToast(
        'Login incorrecto. Revise sus datos',
        3000
      );
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


