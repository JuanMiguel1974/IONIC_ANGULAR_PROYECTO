import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/interfaces';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.page.html',
  styleUrls: ['./lista-compra.page.scss'],
})
export class ListaCompraPage implements OnInit {

  productos: Producto[] = [];
  private path = 'Productos/';

  constructor(public firestoreSvc: FirestoreService) {
    this.loadProductos();
   }

  ngOnInit() {
  }
  loadProductos(){
    this.firestoreSvc.getCollection<Producto>(this.path).subscribe( res => {
      console.log(res);
      this.productos = res;
    });
  }

}
