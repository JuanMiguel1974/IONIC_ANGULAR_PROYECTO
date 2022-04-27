import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Producto } from 'src/app/models/interfaces';
import { ListaService } from 'src/app/services/lista.service';
import { ComentariosComponent } from '../comentarios/comentarios.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {
  @Input() producto: Producto;

  constructor(public listaSvc: ListaService,public modalController: ModalController) {}

  ngOnInit() {}

  addLista() {
    this.listaSvc.addProducto(this.producto);
  }
 async openModal() {
    const modal = await this.modalController.create({
      component: ComentariosComponent,
      componentProps: {producto: this.producto}
    });
    return await modal.present();
  }
}
