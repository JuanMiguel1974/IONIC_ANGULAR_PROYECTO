import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/interfaces';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { PagesInformationService } from 'src/app/services/pages-information.service';
import { ProductoDbService } from 'src/app/services/productoDb.service';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.page.html',
  styleUrls: ['./producto-item.page.scss'],
})
export class ProductoItemPage /* implements OnInit */ {
 /*  newFile: any;
  newImage: any;
  loading: any;

  producto: Producto;
  productos: Producto[] = [];
  newProducto: Producto = {
    id: '',
    nombre: '',
    precio: null,
    presentacion: '',
    fecha: new Date(),
    foto: '',
    supermercado: '',
  };
  public previsualizacion: string;
  public archivos: any = [];
  private path = 'Productos/';
  constructor(
    public productoDbSvc: ProductoDbService,
    public pagesInfoSvc: PagesInformationService,
    public interactionSvc: InteractionService,
    private firestorageSvc: FirestorageService,
    private firestoreSvc: FirestoreService
  ) {}

  ngOnInit() {
    const producto = this.pagesInfoSvc.getProducto();
    if (producto !== undefined) {
      this.newProducto = producto;
    }
  }

  async guardarProducto() {
    this.interactionSvc.presentLoading();
    const path = 'Productos';
    const name = this.newProducto.nombre;
    if (this.newFile !== undefined) {
      const res = await this.firestorageSvc.uploadImage(this.newFile, path, name);
      this.newProducto.foto = res;
    }
    this.firestoreSvc.createDocument(this.newProducto, this.path, this.newProducto.id).then( res => {
         this.loading.dismiss();
         this.interactionSvc.presentToast('guardo con exito',2000);
    }).catch( error => {
       this.interactionSvc.presentToast('no se pude guardar',2000);
    });
} */
  /* async save() {
    this.interactionSvc.presentLoading();
    const path = 'Productos';
    const name = this.newProducto.nombre;
    const res = await this.firestorageSvc.uploadImage(this.newFile, path, name);
    this.newProducto.foto = res;

    const data = this.newProducto;
    if (data.id === '') {
      data.id = this.productoDbSvc.createId();
    }
    const enlace = 'Productos';
    await this.productoDbSvc.createDocument<Producto>(data, enlace, data.id);
    this.interactionSvc.presentToast('Guardado con éxito', 2000);
    this.interactionSvc.loading.dismiss();
    this.newProducto = {
      id: '',
      nombre: '',
      precio: null,
      descripcion: '',
      presentacion: '',
      foto: '',
      supermercado: '',
    };
  } */
 /*  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newImage = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }

  } */
}
