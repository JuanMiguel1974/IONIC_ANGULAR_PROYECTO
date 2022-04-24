import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ProductoLista } from 'src/app/models/interfaces';
import { InteractionService } from 'src/app/services/interaction.service';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-itemlista',
  templateUrl: './itemlista.component.html',
  styleUrls: ['./itemlista.component.scss'],
})
export class ItemlistaComponent implements OnInit {
  @Input() productoLista: ProductoLista;
  @Input() botones = true;
  loading: any;

  constructor(
    public listaSvc: ListaService,
    public interactionSvc: InteractionService,

  ) {}

  ngOnInit() {}

  addLista() {

    console.log('addLista()');
    this.listaSvc.addProducto(this.productoLista.producto);
    this.interactionSvc.presentToast('guardado con exito', 2000);

  }
  removeLista() {
    this.listaSvc.removeProducto(this.productoLista.producto);
    this.interactionSvc.presentToast('borrado con exito', 2000);
  }

}
