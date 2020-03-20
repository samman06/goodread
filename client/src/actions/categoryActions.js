import { ADD_CATEGORY, CATEGORIES_LOADING, CLEAR_ERRORS, DELETE_CATEGORY, GET_CATEGORIES, GET_CATEGORY_BOOKS, GET_ERRORS } from "./types";
import axios from "axios";

export const getCategories = () => async (dispatch) => {
    dispatch({ type: CATEGORIES_LOADING });
    dispatch({ type: CLEAR_ERRORS });
    try {
        const { data } = await axios.get('http://localhost:4000/categories/');
        return dispatch({ type: GET_CATEGORIES, payload: data });
    } catch (e) {
        return dispatch({ type: GET_CATEGORIES, payload: [] });
    }
};
