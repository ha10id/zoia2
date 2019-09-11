import axios from 'axios';
import config from '../../etc/config.json';
import {
    APP_DATA_RUNTIME_SET_CONFIG,
    APP_DATA_RUNTIME_SET_CONFIG_ERROR
} from '../constants/core';

export default () => async (dispatch, getState) => {
    if (!Object.keys(getState().appDataRuntime.config).length) {
        axios.post(`${config.apiURL}/api/config/load`, {}).then(res => {
            if (res && res.data && res.data.statusCode === 200 && res.data.config) {
                dispatch({
                    type: APP_DATA_RUNTIME_SET_CONFIG,
                    payload: res.data.config
                });
                return;
            }
            dispatch({
                type: APP_DATA_RUNTIME_SET_CONFIG_ERROR
            });
        }).catch(() => {
            dispatch({
                type: APP_DATA_RUNTIME_SET_CONFIG_ERROR
            });
        });
    }
};