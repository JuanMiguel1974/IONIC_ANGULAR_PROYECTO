/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Producto } from 'src/app/models/interfaces';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { PagesInformationService } from 'src/app/services/pages-information.service';
import { ProductoDbService } from 'src/app/services/productoDb.service';
import { getStorage, ref, deleteObject } from 'firebase/storage';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.page.html',
  styleUrls: ['./set-productos.page.scss'],
})
export class SetProductosPage implements OnInit {
  productos: Producto[] = [];

  newProducto: Producto;

  enableNewProducto = false;

  private path = 'Productos/';

  newImage = '';
  newFile: '';

  loading: any;
  constructor(
    public productoDbSvc: ProductoDbService,
    private firestoreSvc: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    private firestorageSvc: FirestorageService,
    public pagesInfoSvc: PagesInformationService,
    public interactionSvc: InteractionService
  ) {}

  ngOnInit() {
    this.getProductos();
    const producto = this.pagesInfoSvc.getProducto();
    if (producto !== undefined) {
      this.newProducto = producto;
    }
    this.getProductos();
  }

  async guardarProducto() {
    this.interactionSvc.presentLoading();
    const path = 'Productos/';
    const name = this.newProducto.nombre;
    if (this.newFile !== undefined) {
      const res = await this.firestorageSvc.uploadImage(
        this.newFile,
        path,
        name
      );
      this.newProducto.foto = res;
    }
    this.firestoreSvc
      .createDocument(this.newProducto, this.path, this.newProducto.id)
      .then(async (res) => {
        this.interactionSvc.presentToast('guardado con exito', 2000);
        this.interactionSvc.loading.dismiss();
      })
      .catch((error) => {
        this.interactionSvc.presentToast('no se pudo guardar', 2000);
      });
  }

  getProductos() {
    this.firestoreSvc.getCollection<Producto>(this.path).subscribe((res) => {
      this.productos = res;
    });
  }
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
          },
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            this.interactionSvc.presentLoading();
            this.firestoreSvc
              .deleteDoc(this.path, producto.id)
              .then((res) => {
                this.interactionSvc.presentToast('eliminado con exito', 2000);
                this.alertController.dismiss();
                this.interactionSvc.loading.dismiss();
                const filePath = this.path + producto.nombre;
                const storage = getStorage();

                // Create a reference to the file to delete
                const desertRef = ref(storage, filePath);

                // Delete the file
                deleteObject(desertRef)
                  .then(() => {
                    // File deleted successfully
                  })
                  .catch((error) => {
                    // Uh-oh, an error occurred!
                  });
              })
              .catch((error) => {
                this.interactionSvc.presentToast('no se pudo eliminar', 2000);
              });
          },
        },
      ],
    });
    await alert.present();
  }
  nuevo() {
    this.enableNewProducto = true;
    this.newProducto = {
      id: this.firestoreSvc.createId(),
      nombre: '',
      precio: null,
      presentacion: '',
      foto: '',
      supermercado: '',
    };
  }
  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (image) => {
        this.newImage = image.target.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
