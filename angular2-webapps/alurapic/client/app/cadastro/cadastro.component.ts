import { Component } from '@angular/core';
import { FotoComponent} from '../foto/foto.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FotoService } from '../foto/foto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html'
})
export class CadastroComponent {

    foto: FotoComponent  = new FotoComponent();
    meuForm: FormGroup;
    service: FotoService;
<<<<<<< HEAD
    route: ActivatedRoute;
    router: Router;
    mensagem : string = '';

    constructor(fotoService: FotoService, fb: FormBuilder, route: ActivatedRoute, router: Router ) {
        this.service = fotoService;

        this.route = route;
        this.router = router;

        this.route.params.subscribe(
            params => {
                let id = params['id'];

                if (id) {
                    this.service.findById(id)
                    .subscribe(
                        foto => this.foto = foto,
                        erro => console.log(erro)
                    );
                }
            }
        );
=======

    constructor(fotoService: FotoService, fb: FormBuilder ) {
        this.service = fotoService;
>>>>>>> 59051c26d704ac670d7c65b2960ed30d140a1e6b

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
<<<<<<< HEAD

        this.service.cadastra(this.foto)
            .subscribe((res) => {
                
                this.mensagem = res.mensagem;
                this.foto = new FotoComponent();
                if (!res.inclusao)
                    this.router.navigate(['']);
                    
=======
        

        this.service.cadastra(this.foto)
            .subscribe(() => {
                this.foto = new FotoComponent();
>>>>>>> 59051c26d704ac670d7c65b2960ed30d140a1e6b
                console.log('Foto salva com sucesso');
            }, erro => {
                console.log(erro);
            });

    }
}