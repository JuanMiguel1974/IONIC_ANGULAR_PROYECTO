import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/auth/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)

  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/auth/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'producto-item',
    loadChildren: () => import('./pages/productos/producto-item/producto-item.module').then( m => m.ProductoItemPageModule)
  },
  {
    path: 'productos-list',
    loadChildren: () => import('./pages/productos/productos-list/productos-list.module').then( m => m.ProductosListPageModule)
  },
  {
    path: 'lista-item',
    loadChildren: () => import('./pages/lista/lista-item/lista-item.module').then( m => m.ListaItemPageModule)
  },
  {
    path: 'lista-list',
    loadChildren: () => import('./pages/lista/lista-list/lista-list.module').then( m => m.ListaListPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./pages/ajustes/ajustes.module').then( m => m.AjustesPageModule)
  },
  {
    path: 'pruebas-crud',
    loadChildren: () => import('./pages/pruebas-crud/pruebas-crud.module').then( m => m.PruebasCrudPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
