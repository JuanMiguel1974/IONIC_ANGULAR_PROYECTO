/* eslint-disable arrow-body-style */
import { Pipe, PipeTransform } from '@angular/core';
import { Producto, Supermercado } from '../models/interfaces';

@Pipe({
  name: 'supermercado',
})
export class SupermercadoPipe implements PipeTransform {
  transform(arreglo: any[], texto: string): any[] {
    if (texto === ' ') {
      return arreglo;
    }
    return arreglo.filter((item) => {
      return item.nombre.toLowerCase().includes(texto.toLowerCase());
    });
  }
}
