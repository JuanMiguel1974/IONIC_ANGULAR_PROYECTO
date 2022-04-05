import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProductoItemPage } from '../producto-item/producto-item.page';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
ev: any;
  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }
async abrirPopover(ev: any){
  const popover = await this.popoverController.create({
    component: ProductoItemPage,
    cssClass: 'my-custom-class',
    event: ev,
    translucent: true
  });
  await popover.present();
}
}
