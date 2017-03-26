import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class InputCustomizado extends Component {

    constructor()
    {
        super();
        this.state = {msgError: ''};
    }

    render() {
        return(
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange}  />
                <span>{this.state.msgError}</span>
            </div>
        );
    }

    componentDidMount()
    {
        PubSub.subscribe('erro-formulario', function(msg, data) {
            if (data.field === this.props.name) {
                this.setState({msgError: data.defaultMessage});
            }
        }.bind(this));

        PubSub.subscribe('limpa-erro', function(msg) {
            this.setState({msgError: ''});
        }.bind(this));
    }
}