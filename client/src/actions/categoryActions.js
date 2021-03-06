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
export const getCategoryBooks = (categoryId) => async (dispatch) => {
    dispatch({ type: CATEGORIES_LOADING });
    dispatch({ type: CLEAR_ERRORS });
    try {
        const { data } = await axios.get(`http://localhost:4000/books/category/${categoryId}`);
        return dispatch({ type: GET_CATEGORY_BOOKS, payload: data.books ,categoryId});
    } catch (e) {
        console.log(e);
        return dispatch({ type: GET_CATEGORIES, payload: [] });
    }
};
export const addCategory = (authorData) => async (dispatch) => {
    try {
        console.log(axios.defaults.headers.common['Authorization'])
        dispatch({ type: CLEAR_ERRORS });
        const { data } = await axios.post('http://localhost:4000/categories/', authorData);
        if (data.category) return dispatch({ type: ADD_CATEGORY, payload: data.category });
        else return dispatch({ type: GET_ERRORS, payload: data.errors });
    } catch (e) {
        console.log('data will be send later');
    }
};
export const deleteCategory = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`http://localhost:4000/categories/${id}`);
        if (data.message) return dispatch({ type: DELETE_CATEGORY, payload: id })
    } catch (e) {
        console.log('data not deleted');
    }
};
export const editCategory = (id, categoryData) => async (dispatch) => {
    try {
        let { data } = await axios.put(`http://localhost:4000/categories/${id}`, categoryData);
        if (!data.message) dispatch({ type: GET_ERRORS, payload: data });
        else await dispatch(getCategories());
        return data
    } catch (e) {
        console.log('data not edited');
    }
};
