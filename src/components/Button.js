import React, { Component } from 'react';

export default class Button extends Component {

    onSubmit() {
        this.props.onSubmit();
    }

    render() {
        const {
            projectId,
            reportId,
            isClient,
            productId,
            clientId
        } = this.props;

        return (
            <button type="submit" className="btn btn-primary"
                    id={'btnPost'}
                    disabled={!((projectId && reportId && !isClient) || (isClient && productId && clientId && reportId))}
                    onClick={this.onSubmit.bind(this)}>Post Message</button>
        );
    }
}