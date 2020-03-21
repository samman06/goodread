import axios from 'axios';
import {GET_USER_BOOKS, GET_USER_BOOKS_STATUS} from './types';

export const getUserBooks = (id) => async (dispatch) => {
    try {
        const {data} = await axios.get(`http://localhost:4000/userbook/${id}`);
        console.log(1);
        console.log(data);
        if (data.books) dispatch({type: GET_USER_BOOKS, payload: data.books});
    } catch (e) {
        console.log("No Book 4 U");
    }
};

export const removeUserBook = (userId,id) => async (dispatch) => {
    try {
        const {data} = await axios.delete(`http://localhost:4000/userbook/${id}`);
        if (data.message) dispatch(getUserBooks(userId));
    } catch (e) {
        console.log("No Book 4 U");
    }
};


export const setReadingStatus = (userId,userBook) => async (dispatch) => {
    try {
        const {data} = await axios.put(`http://localhost:4000/userbook/`, userBook);
        if (data.book) dispatch(getUserBooks(userId));
    } catch (e) {
        console.log("No Book 4 U");
    }
};
export const getUserBooksStatus = (id, status) => async (dispatch) => dispatch({type: GET_USER_BOOKS_STATUS, status});
