import React, { Component } from 'react';
import FotoItem from './Foto';
import Pubsub from 'pubsub-js';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

export default class Timeline extends Component {

    constructor(props) {

        super(props);
        this.state = { fotos: [] };
        this.login = this.props.login;
    }

    like(fotoId) {

        fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Não foi possível dar like');
                }
            })
            .then(liker => {
                console.log(liker);
                Pubsub.publish('atualiza-like', { fotoId: fotoId, liker });
            })
            .catch(error => {
                console.error(error);
            });
    }

    comentar(fotoId, textoComentario) {

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ texto: textoComentario }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        fetch(`http://localhost:8080/api/fotos/${fotoId}/comment/?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Não foi possível comentar');
                }
            })
            .then(novoComentario => {
                Pubsub.publish('novo comentario', { fotoId: fotoId, novoComentario });
            })
            .catch(error => {
                console.error(error);
            });
    }

    componentWillMount() {

        Pubsub.subscribe('timeline', (topico, fotos) => {
            this.setState({ fotos });
        });

        Pubsub.subscribe('atualiza-like', (msg, infoLiker) => {
            const fotoAchada = this.state.fotos.find(foto => foto.id === infoLiker.fotoId);
            fotoAchada.likeada = ! fotoAchada.likeada;

            const possivelLiker = fotoAchada.likers.find(liker => liker.login === infoLiker.liker.login);

            if (possivelLiker === undefined) {
                fotoAchada.likers.push(infoLiker.liker);
            } else {
                const novosLikers = fotoAchada.likers.filter(liker => liker.login !== infoLiker.liker.login);
                fotoAchada.likers = novosLikers;
            }

            this.setState({ fotos: this.state.fotos });
        });

        Pubsub.subscribe('novo comentario', (msg, infoComentario) => {
            const fotoAchada = this.state.fotos.find(foto => foto.id === infoComentario.fotoId);
            fotoAchada.comentarios.push(infoComentario.novoComentario);
            this.setState({fotos: this.state.fotos});
        });
    }

    carregaFotos() {

        let urlPerfil;

        if (this.login === undefined) {
            urlPerfil = `http://localhost:8080/api/fotos/?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`;
        }

        fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => {
                this.setState({
                    fotos: fotos
                });
            });
    }

    componentDidMount() {
        this.carregaFotos();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== undefined) {
            this.login = nextProps.login;
            console.log(this.login);
            this.carregaFotos();
        }
    }

    render() {
        return (

            <div className="fotos container">
                <ReactCSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.fotos.map(foto => <FotoItem foto={foto} key={foto.id} like={this.like} comentar={this.comentar} />)
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}