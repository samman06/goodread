import React, {Component} from 'react';
import {connect} from "react-redux"
import PropTypes from "prop-types";
import BookItem from "./bookItem";
import AddBookModal from "./addBookModal";
import EditBookModal from "./editBookModal";
import {getCategories} from "../../actions/categoryActions";
import {getAuthors} from "../../actions/authorActions";
import {getBooks, addBook, deleteBook, editBook} from "../../actions/bookActions";

class BookOperations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModal: false, editModal: false, newBook: {},
            name: "", categoryId: "", authorId: "", bookId: "", photo: ""
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
    parseBookData = (target) => {
        if (target.name === "edit") {
            const {name, categoryId, authorId, _id} = JSON.parse(target.value);
            this.setState({bookId: _id, name, categoryId, authorId});
        }
    };
    editBookModal = (target) => {
        this.parseBookData(target);
        const editModal = !this.state.editModal;
        this.setState({editModal});
    };
    addBook = async () => {
        const {name, categoryId, authorId, photo} = this.state;
        console.log(categoryId);
        const book = await this.props.addBook({name, categoryId, authorId, photo});
        if (book) this.setState({name: "", photo: "", addModal: false});
    };
    editBook = async () => {
        let {name, categoryId, authorId, bookId, photo} = this.state;
        const bookData = {name, categoryId, authorId, photo};
        const {errors} = await this.props.editBook(bookId, bookData);
        if (errors) {
            this.setState({errors});
        } else {
            const books = await this.props.editBook();
            let name = categoryId = authorId = bookId = "";
            this.setState({
                books, name, categoryId, authorId, bookId, photo, editModal: false, errors: {}
            });
        }
    };
    deleteBook = async (id) => {
        const {message} = await this.props.deleteBook(id);
        const books = await this.state.books.filter(({_id}) => _id !== id);
        if (message) this.setState({books});
    };
    render() {
        const {name, categoryId, authorId, addModal, editModal} = this.state;
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
                    <EditBookModal
                        book={{categoryId, authorId, name}}
                        onChange={this.onChange}
                        editBookModal={this.editBookModal}
                        editBook={this.editBook}
                        authors={authors} categories={categories}
                        errors={errors} isOpen={editModal}
                    />
                    <BookItem
                        books={books}
                        editBookModal={this.editBookModal}
                        deleteBook={this.deleteBook}
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
