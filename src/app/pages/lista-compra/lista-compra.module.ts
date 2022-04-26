import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaCompraPageRoutingModule } from './lista-compra-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SupermercadoPipe } from 'src/app/pipes/supermercado.pipe';

@NgModule({
  exports: [SupermercadoPipe],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaCompraPageRoutingModule,
    PipesModule
  ],
})
export class ListaCompraPageModule {}
