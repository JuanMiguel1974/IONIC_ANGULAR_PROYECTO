import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/interfaces';
import { SupermercadoPipe } from 'src/app/pipes/supermercado.pipe';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.page.html',
  styleUrls: ['./lista-compra.page.scss'],
})
export class ListaCompraPage implements OnInit {

  productos: Producto[] = [];
  textoBuscar: '';
  private path = 'Productos/';

  constructor(public firestoreSvc: FirestoreService,
    public supermercadoPipe: SupermercadoPipe) {
    this.loadProductos();
   }

  ngOnInit() {
    this.loadProductos();
  }
  loadProductos(){
    this.firestoreSvc.getCollection<Producto>(this.path).subscribe( res => {
      console.log(res);
      this.productos = res;
    });
  }
async buscar( event ) {

 this.textoBuscar = event.detail.value;

  }

}
