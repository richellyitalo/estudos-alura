import React, { Component } from 'react';
import TimelineApi from '../logicas/TimelineApi';

export default class Header extends Component {

    constructor() {
        super();

        this.state = {
            msg: ''
        };
    }

    componentDidMount() {
        this.props.store.subscribe( () => {
            this.setState({msg: this.props.store.getState().notificacao});
        }); 
    }

    // como não iremos trabalhar agora com flux
    // utilizaremos o Pubsub
    pesquisa(event) {

        event.preventDefault();

        this.props.store.dispatch(TimelineApi.pesquisa(this.loginPesquisa.value));
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
                <span>{this.state.msg}</span>
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