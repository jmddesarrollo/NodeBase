import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { GaleriaPipe } from './galeria.pipe';

@NgModule({
  imports: [
  ],
  declarations: [
    ImagenPipe,
    GaleriaPipe
  ],
  exports: [
    ImagenPipe,
    GaleriaPipe
  ]
})
export class PipesModule { }
