/* eslint-disable react/prop-types */

import React, { lazy, Component } from 'react';
import { I18n } from '@lingui/react';
import { connect } from 'react-redux';
import { remove as removeCookie } from 'es-cookie';
import UIkit from 'uikit';
import axios from 'axios';
import { Trans, t } from '@lingui/macro';
import { history } from '../../../../shared/store/configureStore';
import FormBuilder from '../../../../shared/components/FormBuilder/index.jsx';
import appDataRuntimeSetToken from '../../../../shared/actions/appDataRuntimeSetToken';
import appDataSetUser from '../../../../shared/actions/appDataSetUser';
import config from '../../../../etc/config.json';

const AdminPanel = lazy(() => import(/* webpackChunkName: 'UsersEdit" */ '../../../../shared/components/AdminPanel/AdminPanel.jsx'));

class UsersEdit extends Component {
    constructor(props) {
        super(props);
        this.editUserForm = React.createRef();
    }

    state = {
        loadingError: false
    }

    componentDidMount = () => {
        if (!this.props.appDataRuntime.token) {
            history.push('/users/auth?redirect=/admin/users');
        }
    }

    deauthorize = () => {
        this.props.appDataRuntimeSetTokenAction(null);
        this.props.appDataSetUserAction({});
        removeCookie(`${config.siteId}_auth`);
        history.push(`/users/auth?redirect=/admin/users`);
    }

    onUsersTableLoadError = data => {
        if (data && data.statusCode === 403) {
            this.deauthorize();
        }
    }

    onSaveSuccessHandler = res => {
        console.log(res);
    }

    getEditForm = i18n => (<FormBuilder
        ref={this.editUserForm}
        prefix="editUserForm"        
        UIkit={UIkit}
        axios={axios}
        data={
            [
                [
                    {
                        id: 'username',
                        type: 'text',
                        css: 'uk-form-width-medium',
                        label: `${i18n._(t`Username`)}:`,
                        helpText: i18n._(t`Latin chars/_/-, length: 4-32`),
                        autofocus: true
                    },
                    {
                        id: 'email',
                        type: 'text',
                        css: 'uk-form-width-large',
                        label: `${i18n._(t`E-mail`)}:`,
                        helpText: i18n._(t`Example: username@zoiajs.org`)
                    },
                    {
                        id: 'active',
                        type: 'select',
                        label: `${i18n._(t`Status`)}:`,
                        css: 'uk-form-width-small',
                        values: {
                            0: i18n._(t`Inactive`),
                            1: i18n._(t`Active`)
                        }
                    },
                    {
                        id: 'admin',
                        type: 'select',
                        label: `${i18n._(t`Permissions`)}:`,
                        css: 'uk-form-width-small',
                        values: {
                            0: i18n._(t`Normal User`),
                            1: i18n._(t`Administrator`)
                        }
                    }
                ],
                [{
                    id: 'password',
                    type: 'password',
                    css: 'uk-width-small',
                    label: `${i18n._(t`Password`)}:`,
                },
                {
                    id: 'password2',
                    type: 'password',
                    css: 'uk-width-small',
                    label: `${i18n._(t`Repeat Password`)}:`,
                }],
                {
                    id: 'divider1',
                    type: 'divider'
                },
                [
                    {
                        id: 'btnCancel',
                        type: 'button',
                        buttonType: 'button',
                        css: 'uk-button-default uk-margin-small-right',
                        label: i18n._(t`Cancel`)
                    }, {
                        id: 'btnSave',
                        type: 'button',
                        buttonType: 'submit',
                        css: 'uk-button-primary',
                        label: i18n._(t`Save`)
                    }
                ]
            ]
        }
        validation={
            {
                username: {
                    mandatory: true,
                    regexp: /^[a-zA-Z0-9_-]{4,32}$/
                },
                email: {
                    mandatory: true,
                    // eslint-disable-next-line no-control-regex
                    regexp: /^(?:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-])+@(?:[a-zA-Z0-9]|[^\u0000-\u007F])(?:(?:[a-zA-Z0-9-]|[^\u0000-\u007F]){0,61}(?:[a-zA-Z0-9]|[^\u0000-\u007F]))?(?:\.(?:[a-zA-Z0-9]|[^\u0000-\u007F])(?:(?:[a-zA-Z0-9-]|[^\u0000-\u007F]){0,61}(?:[a-zA-Z0-9]|[^\u0000-\u007F]))?)*$/
                },
                password: {
                    shouldMatch: 'password2'
                },
                password2: {
                    shouldMatch: 'password'
                }
            }
        }
        lang={{
            ERR_VMANDATORY: i18n._(t`Field is required`),
            ERR_VFORMAT: i18n._(t`Invalid format`),
            ERR_VNOMATCH: i18n._(t`Passwords do not match`),
            ERR_LOAD: i18n._(t`Could not load data from server`),
            ERR_SAVE: i18n._(t`Could not save data`),
            WILL_BE_DELETED: i18n._(t`will be deleted. Are you sure?`),
            YES: i18n._(t`Yes`),
            CANCEL: i18n._(t`Cancel`)
        }}
        save={{
            url: `${config.apiURL}/api/users/saveUser`,
            method: 'POST',
            extras: {
                id: this.props.match.params.id,
                token: this.props.appDataRuntime.token
            }
        }}
        load={this.props.match.params.id ? {
            url: `${config.apiURL}/api/users/loadUser`,
            method: 'POST',
            extras: {
                id: this.props.match.params.id,
                token: this.props.appDataRuntime.token
            }
        } : null}
        onSaveSuccess={response => this.onSaveSuccessHandler(response)}
        onLoadError={() => this.setState({ loadingError: true })}
        onLoadSuccess={() => this.setState({ loadingError: false })}
    />);

    reloadEditFormData = e => {
        e.preventDefault();
        this.setState({ loadingError: false });
    }

    render = () => (
        <AdminPanel>
            <I18n>
                {({ i18n }) => (
                    <>
                        <h1>{this.props.match.params.id ? <Trans>Edit User</Trans> : <Trans>Create User</Trans>}</h1>
                        {this.state.loadingError ? <div className="uk-alert-danger" uk-alert="true">
                            <Trans>Could not load data from server. Please check your URL or try to <a href="" onClick={this.reloadEditFormData}>reload</a> data.</Trans>
                        </div> : this.getEditForm(i18n)}
                    </>
                )}
            </I18n>
        </AdminPanel>
    );
}

export default connect(store => ({
    appData: store.appData,
    appDataRuntime: store.appDataRuntime,
    appLingui: store.appLingui
}),
    dispatch => ({
        appDataRuntimeSetTokenAction: token => dispatch(appDataRuntimeSetToken(token)),
        appDataSetUserAction: user => dispatch(appDataSetUser(user))
    }))(UsersEdit);
