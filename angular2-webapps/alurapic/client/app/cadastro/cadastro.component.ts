import { Component } from '@angular/core';
import { FotoComponent} from '../foto/foto.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FotoService } from '../foto/foto.service';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html'
})
export class CadastroComponent {

    foto: FotoComponent  = new FotoComponent();
    meuForm: FormGroup;
    service: FotoService;

    constructor(fotoService: FotoService, fb: FormBuilder ) {
        this.service = fotoService;

        this.meuForm = fb.group({
            titulo: ['', Validators.compose([
                Validators.minLength(4), Validators.required
            ])],
            url: ['', Validators.required],
            descricao: [''],
        });
    }

    cadastrar(event) {

        event.preventDefault();
        

        this.service.cadastra(this.foto)
            .subscribe(() => {
                this.foto = new FotoComponent();
                console.log('Foto salva com sucesso');
            }, erro => {
                console.log(erro);
            });

    }
}