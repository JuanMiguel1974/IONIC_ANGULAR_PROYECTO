import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PruebasCrudPageRoutingModule } from './pruebas-crud-routing.module';

import { PruebasCrudPage } from './pruebas-crud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PruebasCrudPageRoutingModule
  ],
  declarations: [PruebasCrudPage]
})
export class PruebasCrudPageModule {}
