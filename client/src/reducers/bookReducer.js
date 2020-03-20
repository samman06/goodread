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
        default:
            return state;
    }

}

