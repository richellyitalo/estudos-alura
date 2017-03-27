import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class SelectCustomizado extends Component
{
    constructor(){
        super();
        this.state = {msgError: ''};
    }

    render(){
        return(
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>

                <select name={this.props.name} value={this.props.value} onChange={this.props.onChange}>
                    <option value="">Selecione</option>
                    {
                        this.props.options.map(function(option) {
                            return(
                                <option value={option.id} key={option.id.toString()}>
                                    {option.nome}
                                </option>
                            );
                        })
                    }
                </select>
                <span>{this.state.msgError}</span>
            </div>
        );
    }

    componentDidMount(){
        PubSub.subscribe('erro-formulario', function(msg, data) {
            if (this.props.name === data.field) {
                this.setState({msgError: data.defaultMessage});
            }
        }.bind(this));

        PubSub.subscribe('limpa-erro', function(msg) {
            this.setState({msgError: ''})
        }.bind(this));
    }
}