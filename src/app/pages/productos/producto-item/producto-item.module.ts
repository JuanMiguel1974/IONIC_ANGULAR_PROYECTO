import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoItemPageRoutingModule } from './producto-item-routing.module';

import { ProductoItemPage } from './producto-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoItemPageRoutingModule
  ],
  declarations: [ProductoItemPage]
})
export class ProductoItemPageModule {}
