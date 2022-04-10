import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
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
  constructor(
    private menu: MenuController,
    private authSvc: AuthService,
    private interactionSvc: InteractionService,
    private router: Router,
    private popover: PopoverController,
    private firestore: FirestoreService
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
  }
  closeMenu() {
    this.menu.close();
  }
  logout() {
    this.authSvc.logout();
    this.interactionSvc.presentToast('Sesion finalizada', 2000);
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
  getDatosUser(uid: string) {
    const path = 'users';
    const id = uid;
    this.firestore.getCollectionChanges(path).subscribe((res) => {
      console.log('datos', res);
    });
  }
}
