import { Component } from '@angular/core';
import { FotoService } from '../foto/foto.service';
import { FotoComponent } from '../foto/foto.component';

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html'
})
export class ListagemComponent {
    
    fotos : FotoComponent[] = []; // ou fotos : Object[] = [];
    
    constructor(fotoService: FotoService)
    {
        fotoService
            .lista()
            .subscribe(
                fotos =>  this.fotos = fotos,
                erro => console.log('erro', erro)
            );
    }
}