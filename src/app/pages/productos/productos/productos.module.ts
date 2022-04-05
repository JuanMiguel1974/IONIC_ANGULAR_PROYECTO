import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './productos.page';

import { ProductoItemPage } from '../producto-item/producto-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosPageRoutingModule,
    ProductoItemPage
  ],
  declarations: [ProductosPage],
  entryComponents:[ProductoItemPage]
})
export class ProductosPageModule {}
