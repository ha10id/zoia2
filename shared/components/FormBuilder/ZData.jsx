/* eslint react/prop-types:0 */

import React, { Component } from 'react';

export default class ZData extends Component {
    focus = () => {}

    getData = () => this.props.view && typeof this.props.view === 'function' ? this.props.values.map(v => this.props.view(v)) : null;

    render = () => (<div className={this.props.cname}>
        <label className="uk-form-label" htmlFor={this.props.id}>{this.props.label}{this.props.mandatory ? <span className="zform-mandatory">*</span> : null}</label>
        <div className="uk-form-controls">
            {this.props.buttons}
            <div>
                {this.getData()}
            </div>
            {this.props.error && this.props.errorMessage ? <div><span className="uk-label uk-label-danger">{this.props.errorMessage}</span></div> : null}
            {this.props.helpText ? <div className="uk-text-small uk-text-muted">{this.props.helpText}</div> : null}
        </div>
    </div>);
}