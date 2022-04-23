import { Component, Input, OnInit } from '@angular/core';
import { ProductoLista } from 'src/app/models/interfaces';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-itemlista',
  templateUrl: './itemlista.component.html',
  styleUrls: ['./itemlista.component.scss'],
})
export class ItemlistaComponent implements OnInit {

@Input() productoLista: ProductoLista;
@Input() botones = true;

  constructor(public listaSvc: ListaService) { }

  ngOnInit() {}

  addLista() {
    console.log('addLista()');
    this.listaSvc.addProducto(this.productoLista.producto);
  }
  removeLista() {
    this.listaSvc.removeProducto(this.productoLista.producto);
  }

}
