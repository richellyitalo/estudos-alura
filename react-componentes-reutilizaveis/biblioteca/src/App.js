import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import BotaoSubmitCustomizado from './componentes/BotaoSubmitCustomizado';

class App extends Component {
    constructor() {
        super();
        this.state = {lista: [], nome: '', email: '', senha: ''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
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

    enviaForm(event) {
        event.preventDefault();
        $.ajax({
            url: 'http://localhost:8080/api/autores',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({nome: this.state.nome, email: this.state.email, senha: this.state.senha}),
            success: function(response) {
                this.setState({lista: response});
                this.setState({nome: '', email: '', senha: ''});
            }
            .bind(this),
            error: function(response) {
                console.log('erro', response);
            }
        });
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

    render() {
        return (
            <div id="layout">
                <a href="#menu" id="menuLink" className="menu-link">
                    <span></span>
                </a>

                <div id="menu">
                    <div className="pure-menu">
                        <a className="pure-menu-heading" href="#">Company</a>

                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
                        </ul>
                    </div>
                </div>

                <div id="main">
                    <div className="header">
                        <h1>Cadastro de Autores</h1>
                    </div>
                    <div className="content" id="content">
                        <div className="pure-form pure-form-aligned">
                            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                                <InputCustomizado name="nome" type="text" onChange={this.setNome} value={this.state.nome} label="Nome"/>
                                <InputCustomizado name="email" type="email" onChange={this.setEmail} value={this.state.email} label="E-mail"/>
                                <InputCustomizado name="senha" type="text" onChange={this.setSenha} value={this.state.senha} label="Senha"/>
                                <BotaoSubmitCustomizado label="Gravar"/>
                            </form>

                        </div>
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
                                    this.state.lista.map(function(item) {
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
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
