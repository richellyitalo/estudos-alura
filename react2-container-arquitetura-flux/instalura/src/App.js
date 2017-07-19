import React, { Component } from 'react';
import Timeline from './components/Timeline';
import Header from './components/Header';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { timelineReducer } from './reducers/timeline';
import { headerReducer } from './reducers/header';

const reducers = combineReducers({timeline: timelineReducer, notificacao: headerReducer});
const store = createStore(
    reducers,
    applyMiddleware(thunk)
);
 
class App extends Component {
    
    render() {
        return(
            <div id="root">
                <div className="main">
            
                    {/* componentes divididos  */}
                    <Header store={store}/>
                    <Timeline login={this.props.params.login} store={store}/>
                </div>
            </div>
        );
    }
}

export default App;