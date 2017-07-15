import { Component } from 'react';
import { browserHistory } from 'react-router';

export default class Logout extends Component {

    // utilizaremos o 'componentWillMount'
    // pois a ação é realizada antes de renderizar a view
    // que neste caso não será necessária, pois está 'return null'
    componentWillMount() {
        localStorage.removeItem('auth-token');

        // aqui é o redirecionamento
        browserHistory.push('/');
    }

    // desativa a exibição da view
    render() {
        return null;
    }
}