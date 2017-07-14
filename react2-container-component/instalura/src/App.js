import React, { Component } from 'react';
import Timeline from './components/Timeline';
import Header from './components/Header';

class App extends Component {
    render() {
        return(
            <div id="root">
                <div  className="main">
            
                    <Header/>
                    <Timeline/>
                </div>
            </div>
        );
    }
}

export default App;