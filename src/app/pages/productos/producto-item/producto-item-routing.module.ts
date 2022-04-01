import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoItemPage } from './producto-item.page';

const routes: Routes = [
  {
    path: '',
    component: ProductoItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoItemPageRoutingModule {}
