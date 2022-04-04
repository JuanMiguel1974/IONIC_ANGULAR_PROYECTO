import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { InteractionService } from './services/interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private menu: MenuController,
    private authSvc: AuthService,
    private interactionSvc: InteractionService,
    private router: Router
  ) {}

  closeMenu() {
    this.menu.close();
  }
  logout(){
this.authSvc.logout();
this.interactionSvc.presentToast('Sesion finalizada',2000);
this.router.navigate(['/home']);
  }

}
