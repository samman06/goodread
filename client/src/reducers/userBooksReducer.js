import {
    GET_USER_BOOKS,
    BOOKS_LOADING,
    GET_USER_BOOKS_STATUS
} from "../actions/types";

const initialState = {books: [], userBooks: [], loading: false};
export default function (state = initialState, action) {
    switch (action.type) {
        case BOOKS_LOADING:
            return {...state, loading: true};
        case GET_USER_BOOKS:
            return {books: action.payload, userBooks: action.payload, loading: false};
        case GET_USER_BOOKS_STATUS:
            let books;
            if (action.status === "all")
                books = state.userBooks;
            else
                books = filterStatusBooks(state.userBooks, action.status);
            return {...state, books, loading: false};
        default:
            return state;
    }

}

const filterStatusBooks = (books, status) => {
    console.log(1);
    console.log(books);
    books = books.filter(book => {
        console.log(book.shelve);
        if (book.shelve === status)
            return book
    });
    return books
};
