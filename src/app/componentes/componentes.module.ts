
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './producto/producto.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ItemlistaComponent } from './itemlista/itemlista.component';



@NgModule({
  declarations: [
    ProductoComponent,
    ItemlistaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ], exports: [
    ProductoComponent,
    ItemlistaComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class ComponentesModule { }
