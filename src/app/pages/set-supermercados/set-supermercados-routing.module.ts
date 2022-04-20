import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetSupermercadosPage } from './set-supermercados.page';

const routes: Routes = [
  {
    path: '',
    component: SetSupermercadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetSupermercadosPageRoutingModule {}
