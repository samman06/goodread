import { GET_CATEGORY, GET_CATEGORIES, CATEGORIES_LOADING, ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY_BOOKS } from "../actions/types";

const initialState = { category: null, books: [], categories: null, loading: false };
export default function (state = initialState, action) {
    switch (action.type) {
        case CATEGORIES_LOADING:
            return { ...state, loading: true };
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                loading: false
            };
        case GET_CATEGORY_BOOKS:
            return {
                ...state,
                books: action.payload,
                loading: false
            };
        case ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload],
                loading: false
            };
        default:
            return state;
    }

}
