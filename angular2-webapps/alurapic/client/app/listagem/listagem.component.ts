import { Component } from '@angular/core';
import { FotoService } from '../foto/foto.service';

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html'
})
export class ListagemComponent {
    
    fotos : Array<Object> = []; // ou fotos : Object[] = [];
    
    constructor(fotoService: FotoService)
    {
        fotoService
            .lista()
            .subscribe(fotos => {
                this.fotos = fotos;
            }, erro => console.log(erro));
    }
}