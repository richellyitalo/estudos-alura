import React, { Component } from 'react';
import FotoItem from './Foto';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import TimelineApi from '../logicas/TimelineApi';

export default class Timeline extends Component {

    constructor(props) {

        super(props);

        // todas as fotos irão estar aqui neste state
        // inicialmente como vazia
        this.state = { fotos: [] };
 
        // o login que foi recebido é dos parametros aquele (:login)
        // ele é apenas para listar as fotos (lembre-se: é a rota pública)
        this.login = this.props.login;

        // aqui foi necessário criar essa classe
        // para separar a lógica da coisa de códigos react
        // e se desejar, ficaria mais fácil incorporar outro framework
        // agora será passado via props pelo 'App.js' -> this.logicaTimeline = new LogicaTimeline([]);
    }

    // like na foto
    // precisaremos apenas do ID
    // a API recebe o token, e internet já é feito a lógica de qual usuário laikou
    like(fotoId) {

        // necessário o bind na passagem da função no render: like={this.like.bind(this)}
        this.props.store.dispatch(TimelineApi.like(fotoId));
    }

    comentar(fotoId, textoComentario) {

        this.props.store.dispatch(TimelineApi.comentar(fotoId, textoComentario));
    }

    // eventos do componente
    componentWillMount() {
        this.props.store.subscribe(fotos => {
            this.setState({fotos: this.props.store.getState()})
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
        // mockup
        //const listaFixa = [{"urlPerfil":"https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-19/11199408_569104449895751_1837574990_a.jpg","loginUsuario":"alots","horario":"15/07/2017 14:55","urlFoto":"https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-15/e35/14482111_1635089460122802_8984023070045896704_n.jpg?ig_cache_key=MTM1MzEzNjM4NzAxMjIwODUyMw%3D%3D.2","id":1,"likeada":true,"likers":[{"login":"vitor"},{"login":"rafael"},{"login":"alots"}],"comentarios":[{"login":"rafael","texto":"Material confined likewise it humanity raillery an unpacked as he. Three chief merit no if. Now how her edward engage not horses.","id":2},{"login":"alots","texto":"Material confined likewise it humanity raillery an unpacked as he. Three chief merit no if. Now how her edward engage not horses.","id":1},{"login":"alots","texto":"Comentei, ihuu","id":23}],"comentario":"comentario da foto"},{"urlPerfil":"https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-19/11199408_569104449895751_1837574990_a.jpg","loginUsuario":"alots","horario":"15/07/2017 14:55","urlFoto":"https://instagram.fcgh9-1.fna.fbcdn.net/t51.2885-15/e35/15276770_381074615568085_8052939980646907904_n.jpg?ig_cache_key=MTM5ODY4MDMyNjYyMDA1MDE4OQ%3D%3D.2","id":2,"likeada":true,"likers":[{"login":"vitor"}],"comentarios":[{"login":"vitor","texto":"Material confined likewise it humanity raillery an unpacked as he. Three chief merit no if. Now how her edward engage not horses.","id":3}],"comentario":"comentario da foto"}];
        //this.props.store.dispatch({type: 'LISTAGEM', fotos: listaFixa});
        //this.props.store.lista(urlPerfil);

        this.props.store.dispatch(TimelineApi.lista(urlPerfil));
    }

    componentDidMount () {

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
                            foto => <FotoItem foto={foto} key={foto.id} like={this.like.bind(this)} comentar={this.comentar.bind(this)} />
                        )
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}