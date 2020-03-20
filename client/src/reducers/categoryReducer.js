import { GET_CATEGORY, GET_CATEGORIES, CATEGORIES_LOADING, ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY_BOOKS } from "../actions/types";

const initialState = { category: null, books: [], categories: null, loading: false };
export default function (state = initialState, action) {
    switch (action.type) {
        case CATEGORIES_LOADING:
            return { ...state, loading: true };
        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload,
                loading: false
            };
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
        case DELETE_CATEGORY:
            let categories = state.categories.filter(({ _id }) => _id !== action.payload);
            return { ...state, categories, loading: false };
        default:
            return state;
    }

}
