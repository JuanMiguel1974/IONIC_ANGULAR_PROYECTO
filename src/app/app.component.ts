import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController, Platform, PopoverController } from '@ionic/angular';
import { IUser } from './models/interfaces';
import { AuthService } from './services/auth.service';
import { FirestoreService } from './services/firestore.service';
import { InteractionService } from './services/interaction.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  login: boolean = false;
  perfil: 'usuario' | 'admin';
  admin = false;
  constructor(
    private menu: MenuController,
    private authSvc: AuthService,
    private interactionSvc: InteractionService,
    private router: Router,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private firestoreSvc: FirestoreService
  ) {
    this.authSvc.stateUser().subscribe((res) => {
      if (res) {
        console.log('logeado');
        this.login = true;
        this.getDatosUser(res.uid);
      } else {
        console.log('no logeado');
        this.login = false;
      }
    });
    this.initializeApp();
    this.getUid();
  }
  initializeApp() {
    this.platform.ready().then( () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getUid();

    });
  }
  closeMenu() {
    this.menu.close();
  }
  logout() {
    this.authSvc.logout();
    this.interactionSvc.presentToast('Sesion finalizada', 2000);
    localStorage.clear();
    sessionStorage.removeItem('token');
    this.router.navigate(['home']);
  }
  getDatosUser(uid: string) {
    const path = 'Usuarios';
    const id = uid;
    this.firestoreSvc.getDocument<IUser>(path, id).subscribe(res => {
      if(res) {
      this.perfil = res.categoria;
      }
    });
  }
  getUid() {
    this.authSvc.stateUser().subscribe( res => {
          if (res !== null) {
              if (res.uid === 'fgOaSpQTZOZeDNaE6YvPSJSu0g12')  {
                  this.admin = true;
              } else {
                 this.admin = false;
              }
          } else {
            this.admin = false;
          }
    });
}
}
