import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolService, UsuarioService, AdminGuard, RenovartokenGuard, ShareUsuariosService,
  ShareMenuService, ValidadoresService } from './service.index';
import { UploadService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [RolService, UsuarioService, AdminGuard, RenovartokenGuard, ShareUsuariosService, ShareMenuService,
    ValidadoresService, UploadService],
  declarations: []
})
export class ServiceModule { }
