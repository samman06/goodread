import {GET_REVIEWS, ADD_REVIEW, REMOVE_REVIEW} from "../actions/types";

const initialState = {reviews: [], loading: false};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_REVIEWS:
            return {
                ...state,
                reviews: action.payload,
                loading: false
            };
        case ADD_REVIEW:
            return {
                ...state,
                reviews: [...state.reviews, action.payload],
                loading: false
            };
        case REMOVE_REVIEW:
            let reviews = state.reviews.filter(({_id}) => _id !== action.payload);
            return {reviews, loading: false};
        default:
            return state;
    }

}

