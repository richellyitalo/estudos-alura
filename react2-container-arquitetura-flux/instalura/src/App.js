import React, { Component } from 'react';
import Timeline from './components/Timeline';
import Header from './components/Header';
 
class App extends Component {
    
    render() {
        return(
            <div id="root">
                <div className="main">
                    {/* componentes divididos  */}
                    <Header store={this.context.store}/>
                    <Timeline login={this.props.params.login}/>
                </div>
            </div>
); 
    }
}

App.contextTypes = {
    store: React.PropTypes.object.isRequired
}

export default App;