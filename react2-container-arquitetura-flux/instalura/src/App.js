import React, { Component } from 'react';
import Timeline from './components/Timeline';
import Header from './components/Header';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { timelineReducer } from './reducers/timeline';

const store = createStore(
    timelineReducer,
    applyMiddleware(thunk)
);

class App extends Component {
    
    render() {
        return(
            <div id="root">
                <div className="main">
            
                    {/* componentes divididos  */}
                    <Header/>
                    <Timeline login={this.props.params.login} store={store}/>
                </div>
            </div>
        );
    }
}

export default App;