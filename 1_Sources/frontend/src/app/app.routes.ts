import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Guardianes
import { RenovartokenGuard } from './services/guards/renovartoken.guard';
import { AdminGuard } from './services/guards/admin.guard';

// Componentes
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { RutasComponent } from './components/rutas/rutas.component';
import { RutasFormComponent } from './components/rutas-form/rutas-form.component';
import { InfoComponent } from './components/info/info.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent, data: { titulo: 'Home' } },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AdminGuard, RenovartokenGuard],
    data: { titulo: 'Gestión de usuarios' }
  },
  {
    path: 'rutas',
    component: RutasComponent,
    canActivate: [RenovartokenGuard],
    data: { titulo: 'Rutas' }
  },
  {
    path: 'rutas/form/:id',
    component: RutasFormComponent,
    canActivate: [AdminGuard, RenovartokenGuard],
    data: { titulo: 'Gestión de rutas' }
  },
  {
    path: 'rutas/form',
    component: RutasFormComponent,
    canActivate: [AdminGuard, RenovartokenGuard],
    data: { titulo: 'Gestión de rutas' }
  },
  {
    path: 'info',
    component: InfoComponent,
    data: { titulo: 'Información general' }
  },
  { path: 'login', component: LoginComponent, data: { titulo: 'Login' } },
  { path: '**', component: HomeComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
