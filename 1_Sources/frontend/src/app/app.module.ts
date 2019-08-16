import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modulo para las rutas
import { routing, appRoutingProviders } from './app.routes';
import { AppRoutingModule } from './app-routing.module';

// Modulo de servicios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceModule } from './services/service.module';

// Modulo de pipes
import { PipesModule } from './pipes/pipes.module';

// Modulo para DataTable
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// Modulo de notificaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuariosAdminComponent } from './components/usuarios-admin/usuarios-admin.component';
import { UsuariosImagenComponent } from './components/usuarios-imagen/usuarios-imagen.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    UsuariosComponent,
    HomeComponent,
    UsuariosAdminComponent,
    UsuariosImagenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    routing,
    NgxDatatableModule,
    ServiceModule,
    PipesModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({ timeOut: 5000, positionClass: 'toast-top-right', preventDuplicates: true})
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
