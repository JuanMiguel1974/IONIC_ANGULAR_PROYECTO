import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetSeccionesPage } from './set-secciones.page';

const routes: Routes = [
  {
    path: '',
    component: SetSeccionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetSeccionesPageRoutingModule {}
