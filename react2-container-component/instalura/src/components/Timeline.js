import React, { Component } from 'react';
import FotoItem from './Foto';
import Pubsub from 'pubsub-js';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

export default class Timeline extends Component {

    constructor(props) {

        super(props);

        // todas as fotos irão estar aqui neste state
        // inicialmente como vazia
        this.state = { fotos: [] };

        // o login que foi recebido é dos parametros aquele (:login)
        // ele é apenas para listar as fotos (lembre-se: é a rota pública)
        this.login = this.props.login;
    }

    // like na foto
    // precisaremos apenas do ID
    // a API recebe o token, e internet já é feito a lógica de qual usuário laikou
    like(fotoId) {
        // utlizando os '`' pode ser concatenado interamente valores com ${this.valor}
        fetch(
            `http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
            // como não estou passando nenhum valor 
            // como o text no body
            // não é encessário criar o header, basta determinar o 'method'
            { method: 'POST' })

            // resposta do server
            // 1ª etapa - tratamento do valor
            .then(response => {
                if (response.ok) {
                    // será usado o valor retornado
                    // o liker {login: 'nome'}
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

        // uso dos parametros, pois estamos trabalhando com valores internos
        // como 'body'
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

    // eventos do componente
    componentWillMount() {

        Pubsub.subscribe('timeline', (topico, fotos) => {
            this.setState({ fotos });
        });

        Pubsub.subscribe('atualiza-like', (msg, infoLiker) => {
            // pega a foto onde ocorreu o like
            const fotoAchada = this.state.fotos.find(foto => foto.id === infoLiker.fotoId);
            // determina se foi laikeada
            fotoAchada.likeada = ! fotoAchada.likeada;
            
            // pega o liker na foto
            const possivelLiker = fotoAchada.likers.find(liker => liker.login === infoLiker.liker.login);

            // se não tem o like, então adiciona o like nessa foto dentro da lista de likers
            if (possivelLiker === undefined) {
                fotoAchada.likers.push(infoLiker.liker);
            
            } else {
                // caso já tenha, faz uma lista de todos os likers, com exceção do like em questão 'possivelLiker'
                const novosLikers = fotoAchada.likers.filter(liker => liker.login !== infoLiker.liker.login);
                fotoAchada.likers = novosLikers;
            }

            // fotoAchada é uma referência dentro de 'this.state.fotos'
            // ele é redefinido para vigorar na view
            this.setState({ fotos: this.state.fotos });
        });

        // processo semelhante para comentário
        // pega a Foto, adiciona a Lista de comentários desta Foto
        Pubsub.subscribe('novo comentario', (msg, infoComentario) => {
            const fotoAchada = this.state.fotos.find(foto => foto.id === infoComentario.fotoId);
            fotoAchada.comentarios.push(infoComentario.novoComentario);

            // e redefine seu state
            this.setState({fotos: this.state.fotos});
        });
    }

    // função privada para carregar de acordo com a url (publica/privada)
    carregaFotos() {

        let urlPerfil;

        // para o parametro login indefinido, é necessário o token do usuário logado
        if (this.login === undefined) {
            urlPerfil = `http://localhost:8080/api/fotos/?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

        } else {
            // endereço público
            // aqui estamos em /timeline/richelly por exemplo
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

    // após o component ser montado
    componentDidMount() {
        this.carregaFotos();
    }

    // quando é clicado no perfil
    // o props muda então essa implementação é necessária
    // e assim chamar o carregaFotos novamente
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

                {
                    /* esta animação não encontrei na listagem da documentação
                    apenas via google */
                }
                <ReactCSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        /* todas as função são passadas para o FotoItem(like, comentar) 
                        e assim ser chamado de dentro do componente;
                        O 'key' é necessário pelo react */
                        this.state.fotos.map(
                            foto => <FotoItem foto={foto} key={foto.id} like={this.like} comentar={this.comentar} />
                        )
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}