import axios from "axios";
import {GET_REVIEWS, ADD_REVIEW, REMOVE_REVIEW} from "./types";


export const addReview = (bookId, review) => async (dispatch) => {
    try {
        const {data} = await axios.post(`http://localhost:4000/review/`, {bookId, review});
        if (data.review) return dispatch({type: ADD_REVIEW, payload: data.review})
    } catch (e) {
        console.log("error");
    }
};

export const getReviews = (bookId) => async (dispatch) => {
    try {
        const {data} = await axios.get(`http://localhost:4000/review/${bookId}`);
        if (data.reviews) dispatch(dispatch({type: GET_REVIEWS, payload: data.reviews}))
    } catch (e) {
        console.log("error");
    }
};
export const removeReview = (reviewId) => async (dispatch) => {
    try {
        const {data} = await axios.delete(`http://localhost:4000/review/${reviewId}`);
        if (data.message) dispatch(dispatch({type: REMOVE_REVIEW, payload: reviewId}))
    } catch (e) {
        console.log("error");
    }
};
