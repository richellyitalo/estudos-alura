import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class Login extends Component {

    // o constructor deve usar 'props' para podermos utilzar
    // o 'this.props...'
    constructor(props) {

        super(props);

        // mensagem de erro, caso exista
        this.state = { msg: this.props.location.query.msg };
    }

    envia(event) {

        event.preventDefault();

        // requisição via POST
        // para toda requisição POST é necessário um requestInfo
        // com os parâmetros abaixo
        // lembre-se:   method, Stringuifar json, headers
        // ou           'métodico estringado cabeção'
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.login.value,
                senha: this.senha.value
            }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        // o fetch é o nosso ajax em outras palavras aqui dentro do React
        fetch('http://localhost:8080/api/public/login', requestInfo)
            // após o primeiro fetch, tratameos a resposta
            // o thrown new Error é capiturado no catch
            .then(response => {
                if (response.ok) {
                    // esse return devolve para ser pego no próximo 'then' abaixo
                    return response.text();
                } else {
                    throw new Error('Não foi possível realizar login!');
                }
            })
            // resposta recebida no 'then' acima
            .then(token => {

                localStorage.setItem('auth-token', token);

                // redirecionamento
                browserHistory.push('/timeline');
            })
            // se houver algum erro, é aqui que tramos ele
            .catch(erro => {
                this.setState({ msg: erro.message });
            });
    }

    // Tela de login
    render() {
        return (

            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>

                {/* 
                o uso do bind(this) é feito para que possa ser pego os valores via this
                ex.: this.login.value na função envia
                seria algo como envia e binda este formulário => enviar.bind(this)
                 */}
                <form onSubmit={this.envia.bind(this)}>
                    <input type="text" ref={(input) => this.login = input} />
                    <input type="password" ref={(input) => this.senha = input} />
                    <input type="submit" value="login" />
                </form>
            </div>
        );
    }
}