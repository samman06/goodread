import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import {GET_ERRORS, SET_CURRENT_USER} from './types';
import store from "../store";

export const LoginAdmin = (userData) => async (dispatch) => {
    try {
        const {data} = await axios.post('http://localhost:4000/admin/', userData);
        const {token} = data;
        if (token) {
            localStorage.setItem('adminToken', token);
            setAuthToken(token);
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


// Log user out
export const logoutAdmin = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('adminToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};


export const checkForAdminToken= ()=>{
    if (localStorage.adminToken) {
        // Set auth token header auth
        setAuthToken(localStorage.adminToken);
        // Decode token and get user info and exp
        const decoded = jwt_decode(localStorage.adminToken);
        // Set user and isAuthenticated
        store.dispatch(setCurrentAdmin(decoded));

        // Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            // Logout user
            store.dispatch(logoutUser());
            // TODO: Clear current Profile
            // store.dispatch(clearCurrentProfile());
            // Redirect to login
            window.location.href = '/admin';
        }
    }
};