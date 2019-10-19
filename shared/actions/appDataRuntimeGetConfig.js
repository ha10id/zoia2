import axios from 'axios';
import api from '../../static/etc/api.json';
import {
    APP_DATA_RUNTIME_SET_CONFIG,
    APP_DATA_RUNTIME_SET_CONFIG_ERROR
} from '../constants/core';

export default () => async (dispatch, getState) => {
    if (Object.keys(getState().appDataRuntime.config).length < 2) {
        try {
            const res = await axios.post(`${api.url}/api/config/load`, {});
            if (res && res.data && res.data.statusCode === 200 && res.data.config) {
                dispatch({
                    type: APP_DATA_RUNTIME_SET_CONFIG,
                    payload: res.data
                });
                return;
            }
            dispatch({
                type: APP_DATA_RUNTIME_SET_CONFIG_ERROR
            });
        } catch (e) {
            dispatch({
                type: APP_DATA_RUNTIME_SET_CONFIG_ERROR
            });
        }
    }
};
