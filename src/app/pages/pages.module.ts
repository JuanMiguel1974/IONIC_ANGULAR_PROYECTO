import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComponentesModule } from '../componentes/componentes.module';
import { ListaCompraPage } from './lista-compra/lista-compra.page';
import { PerfilPage } from './perfil/perfil.page';
import { ListaComponent } from './lista/lista.component';
import { MislistasComponent } from './mislistas/mislistas.component';
import { TodaslistasComponent } from './todaslistas/todaslistas.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
ListaCompraPage,
PerfilPage,
ListaComponent,
MislistasComponent,
TodaslistasComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ComponentesModule,
    PipesModule
  ]
})
export class PagesModule { }
