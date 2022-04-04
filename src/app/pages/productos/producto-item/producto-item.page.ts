import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/models/interfaces';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { PagesInformationService } from 'src/app/services/pages-information.service';
import { ProductoDbService } from 'src/app/services/productoDb.service';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.page.html',
  styleUrls: ['./producto-item.page.scss'],
})
export class ProductoItemPage implements OnInit {
  producto: Producto;
  productos: Producto[] = [];
  newProducto: Producto = {
    id: '',
    nombre: '',
    precio: null,
    descripcion: '',
    presentacion: '',
    foto: '',
  };

  constructor(
    public productoDbSvc: ProductoDbService,
    public pagesInfoSvc: PagesInformationService,
    public interactionSvc: InteractionService
  ) {}

  ngOnInit() {
    const producto = this.pagesInfoSvc.getProducto();
    if(producto !== undefined){

      this.newProducto = producto;
    }
  }
  async save() {
    this.interactionSvc.presentLoading();
    console.log(this.newProducto);
    const data = this.newProducto;
    if(data.id === ''){
      data.id = this.productoDbSvc.createId();
    }
    const enlace = 'Productos';
    await this.productoDbSvc.createDocument<Producto>(data, enlace, data.id);
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
 /*  getProductos() {
    const path = 'Productos';
    this.productoDbSvc.getCollectionChanges<Producto>(path).subscribe((res) => {
      this.productos = res;
    });
  }
  editProducto(producto: Producto) {
    this.pagesInfoSvc.setProducto(producto);
  }

 async deleteProducto(producto: Producto){
    await this.productoDbSvc.deleteDocument<Producto>('Productos',producto.id).catch(res =>{
     console.log('Error ->', res);


    });

  }*/

}
