import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ItemlistaComponent } from './componentes/itemlista/itemlista.component';
import { AuthGuard } from './guards/auth.guard';
import { ListaComponent } from './pages/lista/lista.component';
import { MislistasComponent } from './pages/mislistas/mislistas.component';
import { AdminGuard } from './guards/admin.guard';
import { TodaslistasComponent } from './pages/todaslistas/todaslistas.component';
import { SupermercadoPipe } from './pipes/supermercado.pipe';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./pages/auth/registro/registro.module').then(
        (m) => m.RegistroPageModule
      ),
  },
  {
    path: 'lista',
    component: ListaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'itemlista',
    component: ItemlistaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'verify-email',
    loadChildren: () =>
      import('./pages/auth/verify-email/verify-email.module').then(
        (m) => m.VerifyEmailPageModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./pages/auth/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./pages/perfil/perfil.module').then((m) => m.PerfilPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'set-productos',
    loadChildren: () =>
      import('./pages/set-productos/set-productos.module').then(
        (m) => m.SetProductosPageModule
      ),
      canActivate: [AdminGuard],
  },
  {
    path: 'set-secciones',
    loadChildren: () =>
      import('./pages/set-secciones/set-secciones.module').then(
        (m) => m.SetSeccionesPageModule
      ),
    canActivate: [AdminGuard],
  },
  {
    path: 'set-supermercados',
    loadChildren: () =>
      import('./pages/set-supermercados/set-supermercados.module').then(
        (m) => m.SetSupermercadosPageModule
      ),
      canActivate: [AdminGuard],
  },
  {
    path: 'lista-compra',
    loadChildren: () =>
      import('./pages/lista-compra/lista-compra.module').then(
        (m) => m.ListaCompraPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'mislistas',
    component: MislistasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'todasLasListas',
    component: TodaslistasComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
