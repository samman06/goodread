import {GET_AUTHOR, GET_AUTHORS, AUTHORS_LOADING, ADD_AUTHOR, DELETE_AUTHOR} from "../actions/types";

const initialState = {author: null, authors: null, loading: false};
export default function (state = initialState, action) {
    switch (action.type) {
        case AUTHORS_LOADING:
            return {...state, loading: true};
        case GET_AUTHOR:
            return {
                ...state,
                author: action.payload,
                loading: false
            };
        case GET_AUTHORS:
            return {
                ...state,
                authors: action.payload,
                loading: false
            };
        case ADD_AUTHOR:
            return {
                ...state,
                authors: [...state.authors, action.payload],
                loading: false
            };
        case DELETE_AUTHOR:
            let authors = state.authors.filter(({_id}) => _id !== action.payload);
            return {...state, authors, loading: false};
        default:
            return state;
    }

}
