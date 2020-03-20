import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import categoryReducer from './categoryReducer';
import authorReducer from './authorReducer';
import bookReducer from './bookReducer';
import userBooksReducer from './userBooksReducer';
import reviewReducer from './reviewReducer';


export default combineReducers({
    auth: authReducer,
    errors:errorReducer,
    category:categoryReducer,
    author:authorReducer,
    book:bookReducer,
    userBooks:userBooksReducer,
    review:reviewReducer,
});
