import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Componentes
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginComponent } from './components/login/login.component';

// Guardianes
import { RenovartokenGuard } from './services/guards/renovartoken.guard';
import { AdminGuard } from './services/guards/admin.guard';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent, canActivate: [RenovartokenGuard], data: {titulo: 'Home'} },
    {path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard, RenovartokenGuard], data: {titulo: 'Gestión de usuarios'} },
    {path: 'login', component: LoginComponent, data: {titulo: 'Gestión de usuarios'} },
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
