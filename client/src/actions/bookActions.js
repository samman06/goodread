import axios from "axios";
import {GET_BOOKS, BOOKS_LOADING, CLEAR_ERRORS, DELETE_BOOK, GET_ERRORS, GET_BOOK} from "./types";

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

export const getBookById = (bookID) => async (dispatch) => {
    dispatch({type: BOOKS_LOADING});
    dispatch({type: CLEAR_ERRORS});
    try {
        const {data} = await axios.get(`http://localhost:4000/books/${bookID}`);
        return dispatch({type: GET_BOOK, payload: data.book});
    } catch (e) {
        return dispatch({type: GET_BOOKS, payload: []});
    }
};

export const getAuthorBooks = (authorId) => async (dispatch) => {
    dispatch({type: BOOKS_LOADING});
    dispatch({type: CLEAR_ERRORS});
    try {
        const {data} = await axios.get(`http://localhost:4000/books/author/${authorId}`);
        return dispatch({type: GET_BOOKS, payload: data.books});
    } catch (e) {
        return dispatch({type: GET_BOOKS, payload: []});
    }
};


export const setRateAndGetAuthorBooks = (userBook, authorId) => async (dispatch) => {
    try {
        const {data} = await axios.put(`http://localhost:4000/userbook/book/`, userBook);
        if (data.book) dispatch(getAuthorBooks(authorId));
    } catch (e) {
        console.log("No Book 4 U");
    }
};

export const getBooksAndRattedBooks = () => async (dispatch) => {
    dispatch({type: BOOKS_LOADING});
    dispatch({type: CLEAR_ERRORS});
    try {
        const {data} = await axios.get('http://localhost:4000/books/user');
        return dispatch({type: GET_BOOKS, payload: data.books});
    } catch (e) {
        return dispatch({type: GET_BOOKS, payload: []});
    }
};
export const addBook = (bookData) => async (dispatch) => {
    try {
        dispatch({type: CLEAR_ERRORS});
        const {data} = await axios.post('http://localhost:4000/books/', bookData);
        if (data.book) dispatch(getBooks());
        else dispatch({type: GET_ERRORS, payload: data.errors});
        return data.book
    } catch (e) {
        console.log('data will be send later');
    }
};
export const deleteBook = (id) => async (dispatch) => {
    try {
        const {data} = await axios.delete(`http://localhost:4000/books/${id}`);
        if (data.message) return dispatch({type: DELETE_BOOK, payload: id})
    } catch (e) {
        console.log('data not deleted');
    }
};
export const editBook = (id, bookData) => async (dispatch) => {
    try {
        let {data} = await axios.put(`http://localhost:4000/books/${id}`, bookData);
        if (!data.message) dispatch({type: GET_ERRORS, payload: data});
        else await dispatch(getBooks());
        return data
    } catch (e) {
        console.log('data not edited');
    }
};

export const setReadingStatusAndGetAuthorBooks = (userBook, authorId) => async (dispatch) => {
    try {
        const {data} = await axios.put(`http://localhost:4000/userbook/book/`, userBook);
        if (data.book) dispatch(getAuthorBooks(authorId));
    } catch (e) {
        console.log("No Book 4 U");
    }
};
export const setReadingStatus = (userBook) => async (dispatch) => {
    try {
        const {data} = await axios.put(`http://localhost:4000/userbook/book/`, userBook);
        if (data.book) dispatch(getBooksAndRattedBooks());
    } catch (e) {
        console.log("No Book 4 U");
    }
};
export const setReadingStatusBookProfile = (bookId, userBook) => async (dispatch) => {
    try {
        const {data} = await axios.put(`http://localhost:4000/userbook/book/`, userBook);
        if (data.book) dispatch(getBookById(bookId));
    } catch (e) {
        console.log("No Book 4 U");
    }
};

export const removeUserBook = (bookId, id) => async (dispatch) => {
    try {
        const {data} = await axios.delete(`http://localhost:4000/userbook/${id}`);
        if (data.message) dispatch(getBookById(bookId));
    } catch (e) {
        console.log("No Book 4 U");
    }
};
export const removeUserBookAndGetAuthorBooks = (authorId, id) => async (dispatch) => {
    try {
        const {data} = await axios.delete(`http://localhost:4000/userbook/${id}`);
        if (data.message) dispatch(getAuthorBooks(authorId));
    } catch (e) {
        console.log("No Book 4 U");
    }
};
