import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebasCrudPage } from './pruebas-crud.page';

const routes: Routes = [
  {
    path: '',
    component: PruebasCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebasCrudPageRoutingModule {}
