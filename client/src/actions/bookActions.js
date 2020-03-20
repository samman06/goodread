import {GET_BOOKS, ADD_BOOK, BOOKS_LOADING, CLEAR_ERRORS, DELETE_BOOK, GET_ERRORS} from "./types";
import axios from "axios";

export const getBooks = () => async (dispatch) => {
    dispatch({type: BOOKS_LOADING});
    dispatch({type: CLEAR_ERRORS});
    try {
        const {data} = await axios.get('http://localhost:4000/books/');
        return dispatch({type: GET_BOOKS, payload: data.books});
    } catch (e) {
        return dispatch({type: GET_BOOKS, payload: []});
    }
};
export const addBook = (bookData) => async (dispatch) => {
    try {
        console.log(bookData);
        dispatch({type: CLEAR_ERRORS});
        const {data} = await axios.post('http://localhost:4000/books/', bookData);
        console.log(data);
        if (data.book) dispatch(getBooks());
        else dispatch({type: GET_ERRORS, payload: data.errors});
        return data.book
    } catch (e) {
        console.log('data will be send later');
    }
};

