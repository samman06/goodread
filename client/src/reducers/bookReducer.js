import {
    GET_BOOKS,
    ADD_BOOK,
    GET_BOOK,
    BOOKS_LOADING,
    GET_READ_BOOKS,
    DELETE_BOOK,
    GET_READING_BOOKS,
    GET_WILL_READ_BOOKS
} from "../actions/types";

const initialState = {book: null, books: null, loading: false};
export default function (state = initialState, action) {
    switch (action.type) {
        case BOOKS_LOADING:
            return {...state, loading: true};

        case GET_BOOKS:
            return {
                ...state,
                books: action.payload,
                loading: false
            };
        case ADD_BOOK:
            return {
                ...state,
                books: [...state.books, action.payload],
                loading: false
            };
        case GET_BOOK:
            return {
                ...state,
                book: action.payload,
                loading: false
            };
        case DELETE_BOOK:
            let books = state.books.filter(({_id}) => _id !== action.payload);
            return {...state, books, loading: false};
        default:
            return state;
    }

}

