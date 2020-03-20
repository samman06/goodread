import React, {Component} from 'react';
import {connect} from "react-redux"
import PropTypes from "prop-types";
import BookItem from "./bookItem";
import {getCategories} from "../../actions/categoryActions";
import {getAuthors} from "../../actions/authorActions";
import {getBooks, addBook, deleteBook, editBook} from "../../actions/bookActions";

class BookOperations extends Component {

    componentDidMount = async () => {
        await this.props.getBooks();
        await this.props.getCategories();
        await this.props.getAuthors();
    };

    render() {
        const {books} = this.props.book;
        return (
            <div className='row'>
                <div className='col-sm-12'>
                    <BookItem
                        books={books}
                    />
                </div>
            </div>
        );
    }
}

BookOperations.protoTypes = {
    getCategories: PropTypes.func.isRequired,
    getAuthors: PropTypes.func.isRequired,
    getBooks: PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired,
    editBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
const mapStateToProps = ({auth, errors, book, category, author}) => {
    return {auth, errors, book, author, category}
};
export default connect(mapStateToProps, {
    getBooks, addBook, deleteBook, editBook, getCategories, getAuthors
})(BookOperations);
