import {GET_USER_BOOKS, BOOKS_LOADING, GET_USER_BOOKS_STATUS} from "../actions/types";

const initialState = {books: [], userBooks: [], loading: false};
export default function (state = initialState, action) {
    let {status, type, payload} = action;
    switch (type) {
        case BOOKS_LOADING:
            return {...state, loading: true};
        case GET_USER_BOOKS:
            return {books: payload, userBooks: payload, loading: false};
        case GET_USER_BOOKS_STATUS:
            let {userBooks} = state;
            let books = (status === "all") ? userBooks : filterStatusBooks(userBooks, status);
            return {...state, books, loading: false};
        default:
            return state;
    }
}

const filterStatusBooks = (books, status) => books.filter(({shelve}) => shelve === status);

