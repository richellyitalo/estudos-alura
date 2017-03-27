import React, {Component} from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import BotaoSubmitCustomizado from './componentes/BotaoSubmitCustomizado';
import TratadorDeErros from './TratadorDeErros';
import SelectCustomizado from './componentes/SelectCustomizado';
import PubSub from 'pubsub-js';

class FormularioLivro extends Component
{
    constructor(){
        super();
        this.state = {titulo: '', preco: '0.00', autorId: '', autores: []};
        // sem o setHandle
        // this.setTitulo = this.setTitulo.bind(this);
        // this.setPreco = this.setPreco.bind(this);
        // this.setAutor = this.setAutor.bind(this);
        this.enviaForm = this.enviaForm.bind(this);
        this.setHandle = this.setHandle.bind(this);
    }

    setHandle(event){
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    }

    // sem o setHandle
    // setTitulo(event){
    //     this.setState({titulo: event.target.value});
    // }
    //
    // setPreco(event){
    //     this.setState({preco: event.target.value});
    // }
    //
    // setAutor(event){
    //     this.setState({autorId: event.target.value});
    // }

    componentWillMount(){
        $.ajax({
            url: 'https://cdc-react.herokuapp.com/api/autores',
            dataType: 'json',
            success: function(response) {
                this.setState({autores: response});
            }.bind(this)
        });
    }

    enviaForm(event){
        event.preventDefault()      ;
        $.ajax({
            url: 'https://cdc-react.herokuapp.com/api/livros',
            dataType: 'json',
            contentType: 'application/json',
            type: 'post',
            data: JSON.stringify({
                titulo: this.state.titulo,
                preco: this.state.preco,
                autorId: this.state.autorId
            }),
            success: function(response) {
                this.setState({titulo: '', preco: '0.00', autorId: ""});
                PubSub.publish('atualiza-lista-livro', response);
            }.bind(this),
            error: function(response) {
                if (response.status === 400) {
                    new TratadorDeErros().listar(response.responseJSON);
                }
            },
            beforeSend(){
                PubSub.publish('limpa-erro');
            }
        });
    }

    render(){
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                    <InputCustomizado name="titulo" type="text" onChange={this.setHandle} value={this.state.titulo} label="Título"/>
                    <InputCustomizado name="preco" type="text" onChange={this.setHandle} value={this.state.preco} label="Preço"/>
                    <SelectCustomizado name="autorId" onChange={this.setHandle} value={this.state.autorId} options={this.state.autores} />
                    <BotaoSubmitCustomizado label="Gravar"/>
                </form>

            </div>
        );
    }
}

class TabelaLivros extends Component
{
    render(){
        return(
            <div>
                <table className="pure-table">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Título</th>
                        <th>Preço</th>
                        <th>Autor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.lista.map(function(item) {
                            return (
                                <tr key={item.id.toString()}>
                                    <td>{item.id}</td>
                                    <td>{item.titulo}</td>
                                    <td>{item.preco}</td>
                                    <td>{item.autor.nome} - {item.autor.email}</td>
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

export default class LivroBox extends Component
{
    constructor(){
        super();
        this.state = {lista: []};
    }

    componentWillMount(){
        $.ajax({
            url: 'https://cdc-react.herokuapp.com/api/livros',
            dataType: 'json',
            success: function(response) {
                this.setState({lista: response})
            }.bind(this)
        });

        PubSub.subscribe('atualiza-lista-livro', function(msg, data) {
            this.setState({lista: data});
        }.bind(this));
    }

    render(){
        return(
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro />
                    <TabelaLivros lista={this.state.lista} />
                </div>
            </div>
        );
    }

}
