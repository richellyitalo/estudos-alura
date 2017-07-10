import { NgModule } from '@angular/core';
import { FotoComponent } from './foto.component';
import { FiltroPorTitulo } from './foto.pipes';
import { FotoService } from './foto.service';

@NgModule({
    declarations: [FotoComponent, FiltroPorTitulo, FotoService],
    exports: [FotoComponent, FiltroPorTitulo, FotoService]
})
export class FotoModule {

}