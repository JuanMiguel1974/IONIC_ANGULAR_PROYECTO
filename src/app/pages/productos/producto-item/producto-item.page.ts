import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/models/interfaces';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { PagesInformationService } from 'src/app/services/pages-information.service';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.page.html',
  styleUrls: ['./producto-item.page.scss'],
})
export class ProductoItemPage implements OnInit {
  newProducto: Producto = {
    id: '',
    nombre: '',
    precio: null,
    descripcion: '',
    presentacion: '',
    foto: '',
  };

  constructor(
    public firebase: FirestoreService,
    public pagesInfo: PagesInformationService,
    public interactionSvc: InteractionService
  ) {}

  ngOnInit() {
    const producto = this.pagesInfo.getProducto();
    if(producto !== undefined){

      this.newProducto = producto;
    }
  }
  async save() {
    this.interactionSvc.presentLoading();
    console.log(this.newProducto);
    const data = this.newProducto;
    if(data.id === ''){
      data.id = this.firebase.createId();
    }
    const enlace = 'Productos';
    await this.firebase.createDocument<Producto>(data, enlace, data.id);
    this.interactionSvc.presentToast('Guardado con éxito',2000);
    this.interactionSvc.loading.dismiss();
    this.newProducto = {
      id: '',
      nombre: '',
      precio: null,
      descripcion: '',
      presentacion: '',
      foto: '',
    };
  }

}
