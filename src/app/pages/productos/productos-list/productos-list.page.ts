import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Producto } from 'src/app/models/interfaces';
import { FirestoreService } from 'src/app/services/firestore.service';
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
  constructor(
    public firestore: ProductoDbService,
    public pageInfoSvc: PagesInformationService
  ) {}

  ngOnInit(): void {
    this.getProductos();
  }
   getProductos() {
    const path = 'Productos';
    this.firestore.getCollectionChanges<Producto>(path).subscribe((res) => {
      this.productos = res;
    });
  }
  editProducto(producto: Producto) {
    this.pageInfoSvc.setProducto(producto);
  }

 async deleteProducto(producto: Producto){
    await this.firestore.deleteDocument<Producto>('Productos',producto.id).catch(res =>{
     console.log('Error ->', res);


    });

  }

}
