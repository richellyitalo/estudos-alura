import React, { Component } from 'react';
import Pubsub from 'pubsub-js';

export default class Header extends Component {

    // como não iremos trabalhar agora com flux
    // utilizaremos o Pubsub
    pesquisa(event) {

        event.preventDefault();

        fetch(`http://localhost:8080/api/public/fotos/${this.loginPesquisa.value}`)
            .then(response => response.json())
            .then(fotos => {
                // envia isto aos subscribes
                // irá alterar apenas o componente da timeline
                Pubsub.publish('timeline', fotos);
            });
    }

    render() {

        return(
            
            <header className="header container">
                <h1 className="header-logo">
                    Instalura
                </h1>
        
                <form className="header-busca" onSubmit={this.pesquisa.bind(this)}>
                    {/* ref é utilizado para criar a variável local no component  */}
                    <input ref={input => this.loginPesquisa = input} type="text" name="search" placeholder="Pesquisa" className="header-busca-campo"/>
                    <input type="submit" value="Buscar" className="header-busca-submit" />
                </form>
        
                <nav>
                    <ul className="header-nav">
                    <li className="header-nav-item">
                        <a href="#">
                        ♡
                        {/*♥*/}
                        {/*Quem deu like nas minhas fotos?*/}
                        </a>
                    </li>
                    </ul>
                </nav>
            </header>
        );
    }
}