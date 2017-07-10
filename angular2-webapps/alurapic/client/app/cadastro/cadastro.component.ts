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
    fotoService: FotoService;

    constructor(fotoService: FotoService, fb: FormBuilder ) {
        this.fotoService = fotoService;

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
        
        this.fotoService
            .cadastra(this.foto)
            .subscribe(() => {
                console.log('Foto cadastrada.');
                this.foto = new FotoComponent();
            }, erro => console.log(erro));

    }
}