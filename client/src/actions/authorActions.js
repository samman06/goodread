import axios from 'axios'
import {ADD_AUTHOR, GET_AUTHORS, AUTHORS_LOADING, GET_ERRORS, CLEAR_ERRORS, DELETE_AUTHOR, GET_AUTHOR} from "./types";

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

export const getAuthorById = (authorID) => async (dispatch) => {
    try {
        const {data} = await axios.get(`http://localhost:4000/authors/${authorID}`);
        return dispatch({type: GET_AUTHOR, payload: data.author});
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
export const deleteAuthor = (id) => async (dispatch) => {
    try {
        const {data} = await axios.delete(`http://localhost:4000/authors/${id}`);
        if (data.message) return dispatch({type: DELETE_AUTHOR, payload: id})
    } catch (e) {
        console.log('data not deleted');
    }
};
export const editAuthor = (id, userData) => async (dispatch) => {
    try {
        let {data} = await axios.put(`http://localhost:4000/authors/${id}`, userData);
        if (!data.message) dispatch({type: GET_ERRORS, payload: data});
        else dispatch(getAuthors());
        return data
    } catch (e) {
        console.log('data not edited');
    }
};
