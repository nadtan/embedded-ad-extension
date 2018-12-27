import React, {Component} from 'react';

const BASE_URL = 'https://staging3.intgdc.com';
const PREFIX_PATH = '/analyze/embedded/#/';

export default class EmbeddedAD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            baseUri: BASE_URL,
            url: `${BASE_URL}${PREFIX_PATH}`
        };
        this.onEnter = this.onEnter.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onLoad(event) {
        // const id = document.getElementById("gdc");
        // if (id) {
        //     //TODO
        // }
        // event.persist();
        // console.log(event);
    }

    getUrl() {
        const { baseUri } = this.state;

        if (baseUri && baseUri.includes(PREFIX_PATH)) {
            return baseUri;
        } else {
            return `${baseUri || BASE_URL}${PREFIX_PATH}`;
        }
    }

    onChange(event) {
        this.setState({
            baseUri: event.target.value
        });
    }

    onEnter(event) {
        if (event.key === 'Enter') {
            this.setState({
                baseUri: event.target.value,
                url: this.getUrl()
            });
        }
    }

    render() {
        return (
            <div className={'EmbeddedAD'}>
                <div className="input-group p-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="iframeUrl">URL</span>
                    </div>
                    <input type="text"
                           onChange={this.onChange}
                           onKeyPress={this.onEnter}
                           value={this.state.baseUri}
                           className="form-control" />
                </div>
                <iframe
                    id="gdc"
                    title="GDC"
                    src={this.state.url}
                    onLoad={this.onLoad.bind(this)}
                    allowFullScreen
                    width="100%"
                    frameBorder="0"
                />
            </div>
        );
    }
}