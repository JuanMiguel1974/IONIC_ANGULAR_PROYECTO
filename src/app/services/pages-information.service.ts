import { Injectable } from '@angular/core';
import { Producto } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PagesInformationService {
  editProducto: Producto;
  constructor() {}

  setProducto(producto: Producto) {
    this.editProducto = producto;
  }
  getProducto() {
    return this.editProducto;
  }
}
