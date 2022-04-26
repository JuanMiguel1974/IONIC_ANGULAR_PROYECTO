import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SupermercadoPipe } from './supermercado.pipe';



@NgModule({
  declarations: [SupermercadoPipe],
  exports: [SupermercadoPipe],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class PipesModule { }
