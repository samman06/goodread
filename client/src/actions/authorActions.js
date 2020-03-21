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
export const addAuthor = (authorData) => async (dispatch) => {
    try {
        dispatch({type: CLEAR_ERRORS});
        const {data} = await axios.post('http://localhost:4000/authors/', authorData);
        if (data.author) return dispatch({type: ADD_AUTHOR, payload: data.author});
        else return dispatch({type: GET_ERRORS, payload: data.errors});
    } catch (e) {
        console.log('data will be send later');
    }
};
