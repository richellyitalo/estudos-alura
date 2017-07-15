import React, { Component } from 'react';
import {Link} from 'react-router';

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

    render() {
        return(

            <div className="foto-info">
                <div className="foto-info-likes">
                    {
                        this.props.foto.likers.map(liker => {
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
                        this.props.foto.comentarios.map(comentario => {
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
    }
    
    like(event) {
 
        event.preventDefault();

        this.props.like(this.props.foto.id);
    }

    comentar(event) {

        event.preventDefault();
        this.props.comentar(this.props.foto.id, this.comentario.value);
        this.comentario.value = '';
    }

    render() {
        return(

            <section className="fotoAtualizacoes">
                <a onClick={this.like.bind(this)} className={this.props.foto.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
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
                <FotoAtualizacoes {...this.props}/>

            </div>
        );
    }
}