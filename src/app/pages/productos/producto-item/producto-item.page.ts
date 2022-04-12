import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
    supermercado: '',
  };
  public previsualizacion: string;
  public archivos: any = [];
  constructor(
    public productoDbSvc: ProductoDbService,
    public pagesInfoSvc: PagesInformationService,
    public interactionSvc: InteractionService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const producto = this.pagesInfoSvc.getProducto();
    if (producto !== undefined) {
      this.newProducto = producto;
    }
  }
  async save() {
    this.interactionSvc.presentLoading();
    console.log(this.newProducto);
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
  }
 /*  capturarFotoProducto(event): any {
    const archivoCapturado = event.target.files[0];
    this.extraBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    });
    this.archivos.push(archivoCapturado);
  }

  extraBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            blob: $event,
            image,
            base: null,
          });
        };
      } catch (e) {
        return null;
      }
    });
  subirArchivo(): any {
    try {
      const formularioDeDatos = new FormData();
      this.archivos.forEach((archivo) => {
        console.log(archivo);
        formularioDeDatos.append('files', archivo);
      });
      this.rest.post('http', formularioDeDatos).subscribe((res) => {
        console.log('Respuesta del servidor', res);
      });
    } catch (e) {
      console.log('ERROR', e);
    }
  } */
}
