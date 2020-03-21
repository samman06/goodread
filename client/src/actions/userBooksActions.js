import axios from 'axios';
import {GET_USER_BOOKS, GET_USER_BOOKS_STATUS} from './types';
import {getBooks} from "./bookActions";


export const getUserBooks = (id) => async (dispatch) => {
    try {
        const {data} = await axios.get(`http://localhost:4000/userbook/${id}`);
        if (data.books) dispatch({type: GET_USER_BOOKS, payload: data.books});
    } catch (e) {
        console.log("No Book 4 U");
    }
};


export const setReadingStatus = (userBook) => async (dispatch) => {
    try {
        const {data} = await axios.put(`http://localhost:4000/userbook/`, userBook);
        if (data.book) dispatch(getBooks());
    } catch (e) {
        console.log("No Book 4 U");
    }
};
export const getUserBooksStatus = (id, status) => async (dispatch) => dispatch({type: GET_USER_BOOKS_STATUS, status});
