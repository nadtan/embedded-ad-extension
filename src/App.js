import React, { Component } from 'react';
import './App.css';
import { createMessage } from './services/message';
import Panel from './components/Panel';
import { $tool } from './chrome/Tool';

class App extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(data) {
        $tool.postMessage(createMessage(data));
    }

    render() {
        return (
            <div className="App">
                <Panel
                    url={$tool.getPageUrl()}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

export default App;
