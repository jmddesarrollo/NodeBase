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

// Modulo de slider de imagenes
import { NgImageSliderModule } from 'ng-image-slider';

// Sockets
import { environment } from '../environments/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = {
  url: environment.wsUrl, options: {}
};

// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuariosAdminComponent } from './components/usuarios-admin/usuarios-admin.component';
import { UsuariosImagenComponent } from './components/usuarios-imagen/usuarios-imagen.component';
import { RutasComponent } from './components/rutas/rutas.component';
import { RutasFormComponent } from './components/rutas-form/rutas-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    UsuariosComponent,
    HomeComponent,
    UsuariosAdminComponent,
    UsuariosImagenComponent,
    RutasComponent,
    RutasFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    routing,
    NgxDatatableModule,
    NgImageSliderModule,
    ServiceModule,
    PipesModule,
    BrowserAnimationsModule, // required animations module
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot({ timeOut: 5000, positionClass: 'toast-top-right', preventDuplicates: true})
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
