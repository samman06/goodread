import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {GET_ERRORS, SET_CURRENT_USER} from './types';

export const LoginAdmin = (userData) => async (dispatch) => {
    try {
        const {data} = await axios.post('http://localhost:4000/admin/', userData);
        const {token} = data;
        if (token) {
            localStorage.setItem('adminToken', token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        } else {
            dispatch({type: GET_ERRORS, payload: data.errors})
        }
    } catch (err) {
        console.log("no login");
    }
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};