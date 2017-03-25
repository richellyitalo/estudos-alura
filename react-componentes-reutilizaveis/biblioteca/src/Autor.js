import React, {Component} from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import BotaoSubmitCustomizado from './componentes/BotaoSubmitCustomizado';

class FormularioAutor extends Component
{
    constructor() {
        super();
        this.state = {nome: '', email: '', senha: ''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    setNome(event) {
        this.setState({nome: event.target.value});
    }

    setEmail(event) {
        this.setState({email: event.target.value});
    }

    setSenha(event) {
        this.setState({senha: event.target.value});
    }

    enviaForm(event) {
        event.preventDefault();
        $.ajax({
            url: 'http://localhost:8080/api/autores',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({nome: this.state.nome, email: this.state.email, senha: this.state.senha}),
            success: function(response) {
                // this.setState({lista: response});
                this.setState({nome: '', email: '', senha: ''});
                this.props.callbackAtualizaListagem(response);
            }.bind(this),
            error: function(response) {
                console.log('erro', response);
            }
        });
    }

    render() {
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                    <InputCustomizado name="nome" type="text" onChange={this.setNome} value={this.state.nome} label="Nome"/>
                    <InputCustomizado name="email" type="email" onChange={this.setEmail} value={this.state.email} label="E-mail"/>
                    <InputCustomizado name="senha" type="password" onChange={this.setSenha} value={this.state.senha} label="Senha"/>
                    <BotaoSubmitCustomizado label="Gravar"/>
                </form>

            </div>
        );
    }
}

class TabelaAutores extends Component
{
    render() {
        return(
            <div>
                <table className="pure-table">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Nome</th>
                        <th>email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.lista.map(function(item) {
                            return (
                                <tr key={item.id.toString()}>
                                    <td>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.email}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }

}

export default class AutorBox extends Component
{
    constructor() {
        super();
        this.state = {lista: []};
        this.atualizaListagem = this.atualizaListagem.bind(this);
    }

    componentWillMount() {
        $.ajax({
            url: 'http://localhost:8080/api/autores',
            dataType: 'json',
            success: function(response) {
                this.setState({
                    lista: response
                })
            }.bind(this)
        });
    }

    atualizaListagem(novaLista) {
        this.setState({lista: novaLista});
    }

    render() {
        return(
            <div>
                <FormularioAutor callbackAtualizaListagem={this.atualizaListagem}/>
                <TabelaAutores lista={this.state.lista}/>
            </div>
        );
    }
}