import React, { Component } from 'react';
import './App.css';
import { createMessage } from './services/message';
import Panel from './components/Panel';
import { $panel } from './chrome/Panel';

class App extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(data) {
        $panel.postMessage(createMessage(data));
        this.setState({ data: data });
    }

    render() {
        return (
            <div className="App">
                <Panel
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

export default App;
