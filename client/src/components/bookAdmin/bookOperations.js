import React, {Component} from 'react';
import {connect} from "react-redux"
import PropTypes from "prop-types";
import BookItem from "./bookItem";
import AddBookModal from "./addBookModal";
import {getCategories} from "../../actions/categoryActions";
import {getAuthors} from "../../actions/authorActions";
import {getBooks, addBook, deleteBook, editBook} from "../../actions/bookActions";

class BookOperations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editModal: false,
        };
    }
    componentDidMount = async () => {
        await this.props.getBooks();
        await this.props.getCategories();
        await this.props.getAuthors();
    };
    onChange = (target) => this.setState({[target.name]: target.value});
    addBookModal = async () => {
        const addModal = !this.state.addModal;
        this.setState({addModal})
    };
    addBook = async () => {
        const {name, categoryId, authorId, photo} = this.state;
        console.log(categoryId);
        const book = await this.props.addBook({name, categoryId, authorId, photo});
        if (book) this.setState({name: "", photo: "", addModal: false});
    };
    render() {
        const {addModal} = this.state;
        const {books} = this.props.book;
        const {authors} = this.props.author;
        const {categories} = this.props.category;
        const {errors} = this.props;
        return (
            <div className='row'>
                <div className='col-sm-12'>
                    <AddBookModal
                        addBookModal={this.addBookModal}
                        onChange={this.onChange}
                        addBook={this.addBook}
                        errors={errors} categories={categories}
                        authors={authors} isOpen={addModal}
                    />
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
