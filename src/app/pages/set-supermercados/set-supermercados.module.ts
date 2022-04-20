import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetSupermercadosPageRoutingModule } from './set-supermercados-routing.module';

import { SetSupermercadosPage } from './set-supermercados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetSupermercadosPageRoutingModule
  ],
  declarations: [SetSupermercadosPage]
})
export class SetSupermercadosPageModule {}
