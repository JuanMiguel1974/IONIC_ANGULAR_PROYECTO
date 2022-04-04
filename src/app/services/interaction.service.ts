import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class InteractionService {

  loading: any;
  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {}
  async presentToast(mensaje: string, tiempo: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: tiempo,
    });
    toast.present();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Guardando',

    });
    await this.loading.present();
  }

}
