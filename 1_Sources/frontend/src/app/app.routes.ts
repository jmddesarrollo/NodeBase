import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Componentes
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginComponent } from './components/login/login.component';

// Guardianes
import { RenovartokenGuard } from './services/guards/renovartoken.guard';
import { AdminGuard } from './services/guards/admin.guard';
import { RutasComponent } from './components/rutas/rutas.component';
import { RutasFormComponent } from './components/rutas-form/rutas-form.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent, data: {titulo: 'Home'} },
    {path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard, RenovartokenGuard], data: {titulo: 'Gestión de usuarios'} },
    {path: 'rutas', component: RutasComponent, data: {titulo: 'Rutas'} },
    {path: 'rutas/form/:id', component: RutasFormComponent, canActivate: [RenovartokenGuard], data: {titulo: 'Gestión de rutas'} },
    {path: 'login', component: LoginComponent, data: {titulo: 'Login'} },
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
