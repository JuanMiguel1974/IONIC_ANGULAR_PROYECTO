import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/interfaces';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {
  @Input() producto: Producto;

  constructor(public listaSvc: ListaService) { }

  ngOnInit() {}

  addLista(){
this.listaSvc.addProducto(this.producto);
  }

}
