import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaItemPageRoutingModule } from './lista-item-routing.module';

import { ListaItemPage } from './lista-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaItemPageRoutingModule
  ],
  declarations: [ListaItemPage]
})
export class ListaItemPageModule {}
