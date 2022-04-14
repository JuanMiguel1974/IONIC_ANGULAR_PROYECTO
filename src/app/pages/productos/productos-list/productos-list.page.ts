import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Producto } from 'src/app/models/interfaces';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { PagesInformationService } from 'src/app/services/pages-information.service';
import { ProductoDbService } from 'src/app/services/productoDb.service';
@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.page.html',
  styleUrls: ['./productos-list.page.scss'],
})
export class ProductosListPage implements OnInit {
  producto: Producto;
  productos: Producto[] = [];
  private path = 'Productos/';
  constructor(
    public firestoreSvc: FirestoreService,
    public productoDbService: ProductoDbService,
    public pageInfoSvc: PagesInformationService,
    public firestorageService: FirestorageService,
    public interactSvc: InteractionService,
    public alertController: AlertController,
  ) {}

  ngOnInit(): void {
    this.getProductos();
  }
  getProductos() {
    const path = 'Productos';
    this.productoDbService
      .getCollectionChanges<Producto>(path)
      .subscribe((res) => {
        this.productos = res;
      });
  }
  editProducto(producto: Producto) {
    this.pageInfoSvc.setProducto(producto);
  }

 /*  async deleteProducto(producto: Producto) {
    await this.productoDbService
      .deleteDocument<Producto>('Productos', producto.id)
      .catch((res) => {
        console.log('Error ->', res);
      });
  } */
   async deleteProducto(producto: Producto) {
    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: ' Seguro desea <strong>eliminar</strong> este producto',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'normal',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            // this.alertController.dismiss();
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            this.firestoreSvc.deleteDoc(this.path, producto.id).then( res => {
              this.interactSvc.presentToast('eliminado con exito',3000);
              this.alertController.dismiss();
            }).catch( error => {
                this.interactSvc.presentToast('no se pude eliminar',2000);
            });
          }
        }
      ]
    });
    await alert.present();
}
}
