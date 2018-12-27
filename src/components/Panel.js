import React, {Component} from 'react';
import { formatMessage } from '../services/message';
import { parseUrl } from '../services/urlParser';

export default class Panel extends Component {

    constructor(props) {
        super(props);

        const {
            projectId,
            reportId,
            clientId,
            productId,
            query: {
                dataset
            }
        } = parseUrl(props.url);

        this.state = {
            params: {
                projectId: projectId || '',
                reportId: reportId || '',
                productId: productId || '',
                clientId: clientId || '',
                dataset: dataset || '',
                includeObjectsWithTags: '',
                excludeObjectsWithTags: ''
            },
            isClient: false,
            expandQuery: false
        };

        this.onChange = this.onChange.bind(this);
        this.onClientChange = this.onClientChange.bind(this);
        this.postMessage = this.postMessage.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    onChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox'
            ? target.checked
            : (target.value || '');

        this.setState({
            params: {
                ...this.state.params,
                [name]: value
            }
        });
    }

    onClientChange(event) {
        const isChecked = event.target.checked;

        this.setState({
            isClient: isChecked
        });
    }

    postMessage() {
        this.props.onSubmit(this.filterParams());
    }

    getQueryParams() {
        const convert = (value) => (
            value
                ? `[${(value || '').split(',').map(val => val.trim()).join(',')}]`
                : ''
        );
        const {
            dataset,
            includeObjectsWithTags,
            excludeObjectsWithTags
        } = this.state.params;

        return {
            dataset,
            includeObjectsWithTags: convert(includeObjectsWithTags),
            excludeObjectsWithTags: convert(excludeObjectsWithTags)
        }
    }

    filterParams() {
        const {
            productId,
            clientId,
            projectId,
            reportId
        } = this.state.params;
        const queryParams = this.getQueryParams();

        if (this.state.isClient) {
            return {
                productId,
                clientId,
                reportId,
                ...queryParams
            };
        } else {
            return {
                projectId,
                reportId,
                ...queryParams
            };
        }
    }

    getMessage() {
        return formatMessage(this.filterParams());
    }

    toggle() {
        this.setState({
            expandQuery: !this.state.expandQuery
        });
    }

    render() {
        const {
            params: {
                productId,
                clientId,
                projectId,
                reportId,
                dataset,
                includeObjectsWithTags,
                excludeObjectsWithTags
            },
            isClient,
            expandQuery
        } = this.state;

        return (
            <div className={'Panel'}>
                <div className="form-group form-check text-right">
                    <input type="checkbox" className="form-check-input" name='clientIdCb' id="clientCB"
                        onChange={this.onClientChange}/>
                    <label className="form-check-label" htmlFor="clientCB">Open Insight by ClientId</label>
                </div>
                <div className="main-form">
                    {
                        !isClient
                            ?
                            <div className="form-group">
                                <label htmlFor="projectId">Project ID (*)</label>
                                <input type="text" id="projectId" className="form-control" name='projectId'
                                       onChange={this.onChange} value={projectId}  />
                            </div>
                            :
                            <React.Fragment>
                                <div className="form-group">
                                    <label htmlFor="projectId">Product ID (*)</label>
                                    <input type="text" id="productId" className="form-control" name='productId'
                                           onChange={this.onChange} value={productId}  />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="projectId">Client ID (*)</label>
                                    <input type="text" id="clientId" className="form-control" name='clientId'
                                           onChange={this.onChange} value={clientId}  />
                                </div>
                            </React.Fragment>
                    }
                    <div className="form-group">
                        <label htmlFor="reportId">Report ID (*)</label>
                        <input type="text" id="reportId" className="form-control"name='reportId'
                               onChange={this.onChange} value={reportId}/>
                    </div>
                    <div className={'params-toggle pb-3'}>
                        <div className={expandQuery ? 'arrow-down' : 'arrow-right'} />
                        <button type="button" className="btn btn-link"
                                onClick={this.toggle}>Query Params</button>
                    </div>
                    {
                        expandQuery &&
                        <div className={'params-group'}>
                            <div className="form-group">
                                <label htmlFor="dataset">Dataset</label>
                                <input type="text" id="dataset" className="form-control" name='dataset'
                                       onChange={this.onChange} value={dataset} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="includeObjectsWithTags">Include Objects With Tags<small className={'pl-3'}>(Eg: marketing,hr)</small></label>
                                <input title={'Separate tags with a comma'}
                                       type="text" id="includeObjectsWithTags"
                                       className="form-control" name='includeObjectsWithTags'
                                       onChange={this.onChange} value={includeObjectsWithTags} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="excludeObjectsWithTags">Exclude Objects With Tags<small className={'pl-3'}>(Eg: marketing,hr)</small></label>
                                <input title={'Separate tags with a comma'}
                                       type="text" id="excludeObjectsWithTags"
                                       className="form-control" name='excludeObjectsWithTags'
                                       onChange={this.onChange} value={excludeObjectsWithTags} />
                            </div>
                        </div>
                    }
                    <div className="form-group text-right">
                        <button type="submit" className="btn btn-primary"
                                id={'btnPost'}
                                disabled={!((projectId && reportId && !isClient) || (isClient && productId && clientId && reportId))}
                                onClick={this.postMessage}>Post Message</button>
                    </div>
                </div>
                <div className="sub-form mt-4">
                    <div className="form-group">
                        <textarea className="form-control" id="message" rows="16"
                                  readOnly={true}
                                  value={this.getMessage()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}