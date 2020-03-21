import axios from 'axios'
import {ADD_AUTHOR, GET_AUTHORS, AUTHORS_LOADING, GET_ERRORS, CLEAR_ERRORS, DELETE_AUTHOR} from "./types";

export const getAuthors = () => async (dispatch) => {
    dispatch({type: AUTHORS_LOADING});
    dispatch({type: CLEAR_ERRORS});
    try {
        const {data} = await axios.get('http://localhost:4000/authors/');
        return dispatch({type: GET_AUTHORS, payload: data});
    } catch (e) {
        return dispatch({type: GET_AUTHORS, payload: []});
    }
};
