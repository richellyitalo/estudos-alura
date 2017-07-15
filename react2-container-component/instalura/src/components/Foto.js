import React, { Component } from 'react';
import {Link} from 'react-router';
import Pubsub from 'pubsub-js'; 

class FotoHeader extends Component {

    render() {
        return(
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={this.props.foto.urlPerfil} alt="foto do usuario"/>
                    <figcaption className="foto-usuario">
                    <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
                        {this.props.foto.loginUsuario}
                    </Link>
                    </figcaption>
                </figure>
                <time className="foto-data">{this.props.foto.horario}</time>
            </header>
        );
    }
}

class FotoInfo extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            likers: this.props.foto.likers,
            comentarios: this.props.foto.comentarios
        };
    }
    
    componentWillMount() {
        Pubsub.subscribe('atualiza-like', (msg, infoLiker) => {
            if (this.props.foto.id === infoLiker.fotoId) {
                const possivelLiker = this.state.likers.find(liker => liker.login === infoLiker.liker.login);
                
                if (possivelLiker === undefined) {
                    const novosLikers = this.state.likers.concat(infoLiker.liker);
                    this.setState({likers: novosLikers});
                } else {
                    const novosLikers = this.state.likers.filter(liker => liker.login !== infoLiker.liker.login);
                    this.setState({likers: novosLikers});
                }
            }
        });

        Pubsub.subscribe('novo comentario', (msg, infoComentario) => {
            if (this.props.foto.id === infoComentario.fotoId) {
                const novosComentarios = this.state.comentarios.concat(infoComentario.novoComentario);
                this.setState({comentarios: novosComentarios});
            }
        });
    }

    render() {
        return(

            <div className="foto-info">
                <div className="foto-info-likes">
                    {
                        this.state.likers.map(liker => {
                            return (<Link to={`/timeline/${liker.login}`} key={liker.login}>{liker.login}, </Link>)
                        })
                    }
                    &nbsp;
                    curtiram

                </div>

                <p className="foto-info-legenda">
                    <a className="foto-info-autor">{this.props.foto.loginUsuario} </a>
                    {this.props.foto.comentario}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        this.state.comentarios.map(comentario => {
                            return (
								<li className="comentario" key={comentario.id}>
									<Link to={`/timeline/${comentario.login}`} className="foto-info-autor">{comentario.login} </Link>
									{comentario.texto}
								</li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
} // end FotoInfo

class FotoAtualizacoes extends Component {

    constructor(props) {
        
        super(props);
        this.state = {
            likeada: this.props.foto.likeada
        };
    }
    
    like(event) {

        event.preventDefault();

        fetch(`http://localhost:8080/api/fotos/${this.props.foto.id}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, {method: 'POST'})
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Não foi possível dar like');
                }
            })
            .then(liker => {
                this.setState({
                    likeada: ! this.state.likeada
                });
                Pubsub.publish('atualiza-like', { fotoId: this.props.foto.id, liker});
            })
            .catch(error => {
                console.error(error);
            });
    }

    comentar(event) {

        event.preventDefault();
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ texto: this.comentario.value}),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        fetch(`http://localhost:8080/api/fotos/${this.props.foto.id}/comment/?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Não foi possível comentar');
                }
            })
            .then(novoComentario => {
                Pubsub.publish('novo comentario', {fotoId: this.props.foto.id, novoComentario});
                this.comentario.value = '';
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return(

            <section className="fotoAtualizacoes">
                <a onClick={this.like.bind(this)} className={this.state.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
                <form className="fotoAtualizacoes-form" onSubmit={this.comentar.bind(this)}>
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comentario = input}/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
                </form>
            </section>
        );
    }
} // end FotoAtualizacoes

export default class FotoItem extends Component {



    render() {
        return(

            <div className="foto">
                <FotoHeader foto={this.props.foto}/>

                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto}/>

                <FotoInfo foto={this.props.foto}/>
                <FotoAtualizacoes foto={this.props.foto}/>

            </div>
        );
    }
}