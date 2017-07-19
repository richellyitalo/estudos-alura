import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';

import registerServiceWorker from './registerServiceWorker';

// imports de estilos podem ser realizados aqui dentro
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';

import { Router, Route, browserHistory } from 'react-router';
import { matchPattern } from 'react-router/lib/PatternUtils';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { timelineReducer } from './reducers/timeline';
import { headerReducer } from './reducers/header';

const reducers = combineReducers({timeline: timelineReducer, notificacao: headerReducer});
const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

function verificaAutenticacao(nextState, replace) {
  
  const resultado = matchPattern('/timeline(/:login)', nextState.location.pathname);

  // aqui ele verifica se está no endereço privado
  // que é apenas '/timeline'
  const enderecoPrivado = resultado.paramValues[0] === undefined;
  const naoLogado = ! localStorage.getItem('auth-token') === null;

  if (enderecoPrivado && naoLogado) {

    // {A}
    // o replace é o próximo url que substituirá o padrão
    // ex.: onEnter   |
    //                -> replace --> {novoEndereco}
    //                |
    //                {continua na url padrão 'path'}
    replace('/?msg=você precisa estar logado');
    // a propriedade 'msg' é pego dessa forma {this.props.location.query.msg}
  }
}

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={browserHistory}>

        { /* chama o component Login */ }
        <Route path="/" component={Login}/>

        { /* essa rota é protegida com a condição de não ser passado o parametro :login ver {A} */ }
        <Route path="/timeline(/:login)" component={App} onEnter={verificaAutenticacao}/>

        { /* 
          o component {Logout} não possui view 
          que irá destruir o location 'auth-token'
          e retornar a home com {browserHistory}
        */ }
        <Route path="/logout" component={Logout}/>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
registerServiceWorker();
