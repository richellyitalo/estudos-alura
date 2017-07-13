import { Component } from '@angular/core';
import { FotoService } from '../foto/foto.service';
import { FotoComponent } from '../foto/foto.component';
<<<<<<< HEAD
import { PainelComponent } from '../painel/painel.component';
=======
>>>>>>> 59051c26d704ac670d7c65b2960ed30d140a1e6b

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html'
})
export class ListagemComponent {
    
    fotos : FotoComponent[] = []; // ou fotos : Object[] = [];
<<<<<<< HEAD
    service : FotoService;
    mensagem : string = '';
=======
>>>>>>> 59051c26d704ac670d7c65b2960ed30d140a1e6b
    
    constructor(fotoService: FotoService)
    {
        this.service = fotoService;

        fotoService
            .lista()
            .subscribe(
                fotos =>  this.fotos = fotos,
                erro => console.log('erro', erro)
            );
<<<<<<< HEAD
    }

    remove(foto: FotoComponent, painel: PainelComponent)
    {
        this.service
            .remove(foto)
            .subscribe(
                () => {

                    painel.fadeOut(() => {

                        let novasFotos = this.fotos.slice(0);
                        let indice = this.fotos.indexOf(foto);
                        novasFotos.splice(indice, 1);
                        this.fotos = novasFotos;
                        this.mensagem = 'Foto removida com sucesso';
                    });
                },
                erro => {

                    console.log('Deu erro: ', erro);
                    this.mensagem = 'Não foi possível remover a foto';
                }
            );
=======
>>>>>>> 59051c26d704ac670d7c65b2960ed30d140a1e6b
    }
}