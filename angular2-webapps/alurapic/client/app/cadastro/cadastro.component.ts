import { Component } from '@angular/core';
import { FotoComponent} from '../foto/foto.component';
import { Http, Headers } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html'
})
export class CadastroComponent {

    foto : FotoComponent  = new FotoComponent();
    http : Http;
    meuForm : FormGroup;

    constructor(http : Http, fb: FormBuilder ) {
        this.http = http;

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

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http
            .post('v1/fotos', JSON.stringify(this.foto), { headers : headers } )
            .subscribe(() => {
                this.foto = new FotoComponent();

                console.log('Foto Salva com Sucesso');
            }, erro => console.error(erro));


    }
}