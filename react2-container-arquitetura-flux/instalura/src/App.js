import React, { Component } from 'react';
import Timeline from './components/Timeline';
import Header from './components/Header';
import TimelineStore from './logicas/TimelineStore';
import { createStore } from 'redux';

const timelineStore = new TimelineStore([]);

// Reducer
// state é o estado anterior que eu havia retornado

function timelineReducer(state=[], action) {

    if (action.type === 'LISTAGEM') {
        return action.fotos;
    }
    return state;
}

const store = createStore(timelineReducer);

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