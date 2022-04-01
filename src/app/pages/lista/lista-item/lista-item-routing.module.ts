import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaItemPage } from './lista-item.page';

const routes: Routes = [
  {
    path: '',
    component: ListaItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaItemPageRoutingModule {}
