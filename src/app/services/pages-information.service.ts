import { Injectable } from '@angular/core';
import { Producto } from '../models/interfaces';
import { PerfilPage } from '../pages/perfil/perfil.page';
import { SetSeccionesPage } from '../pages/set-secciones/set-secciones.page';

@Injectable({
  providedIn: 'root',
})
export class PagesInformationService {
  editProducto: Producto;
  editPerfil: PerfilPage;
  constructor() {}

  setProducto(producto: Producto) {
    this.editProducto = producto;
  }
  getProducto() {
    return this.editProducto;
  }
  setPerfil(perfil: PerfilPage){
    this.editPerfil = perfil;
  }
  getPerfil(){
    return this.editPerfil;
  }
}
