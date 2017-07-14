import React, { Component } from 'react';
import Timeline from './components/Timeline';

class App extends Component {
    render() {
        return(
            <div id="root">
                <div  className="main">
            
                    
                    <Timeline/>
                </div> {/* fim .main */}
            </div>
        );
    }
}

export default App;