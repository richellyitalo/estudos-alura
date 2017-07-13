import { Http, Headers, Response } from '@angular/http';
import { FotoComponent } from './foto.component';
import { Observable } from 'rxjs'; 
import { Injectable } from '@angular/core';

@Injectable()
export class FotoService {

    http: Http;
    headers: Headers;
    url: string = 'v1/fotos';

    constructor(http: Http) { 

        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
<<<<<<< HEAD
    }

    lista(): Observable<FotoComponent[]> {

        return this.http.get(this.url)
            .map(res => res.json());
    }

    cadastra(foto: FotoComponent): Observable<MensagemCadastro> {

        if (foto._id) {
            return this.http
            .put(this.url + '/' + foto._id, JSON.stringify(foto), { headers: this.headers})
            .map(() => new MensagemCadastro("Alterado com sucesso!", false));
        }
        return this.http.post(this.url, JSON.stringify(foto), 
                { headers: this.headers })
                .map(() => new MensagemCadastro("Cadastrado com sucesso!", true)); 

    }

    remove(foto: FotoComponent)
    {
        return this.http.delete(this.url + '/' + foto._id);
    }

    findById(id: string): Observable<FotoComponent>
    {
        return this.http
            .get(this.url + '/' + id)
=======
    }

    lista(): Observable<FotoComponent[]> {

        return this.http.get(this.url)
>>>>>>> 59051c26d704ac670d7c65b2960ed30d140a1e6b
            .map(res => res.json());
    }
}

<<<<<<< HEAD
export class MensagemCadastro {

    constructor(private _mensagem: string, private _inclusao: boolean) {
        this._mensagem = _mensagem;
        this._inclusao = _inclusao;
    }

    get mensagem(): string {
        return this._mensagem;
    }

    get inclusao(): boolean {
        return this._inclusao;
=======
    cadastra(foto: FotoComponent): Observable<Response> {

        return this.http.post(this.url, JSON.stringify(foto), 
                { headers: this.headers }); 

>>>>>>> 59051c26d704ac670d7c65b2960ed30d140a1e6b
    }
}