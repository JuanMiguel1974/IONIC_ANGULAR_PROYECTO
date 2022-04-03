import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Producto } from 'src/app/models/interfaces';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PagesInformationService } from 'src/app/services/pages-information.service';

@Component({
  selector: 'app-pruebas-crud',
  templateUrl: './pruebas-crud.page.html',
  styleUrls: ['./pruebas-crud.page.scss'],
})
export class PruebasCrudPage implements OnInit {
  user: User;
  producto: Producto;
  usuarios: User[] = [];
  productos: Producto[] = [];
  constructor(
    public firestore: FirestoreService,
    public pageInfoSvc: PagesInformationService
  ) {}

  ngOnInit(): void {
    this.getProductos();
  }
  getUsers() {
    const path = 'users';
    this.firestore.getCollection();
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
