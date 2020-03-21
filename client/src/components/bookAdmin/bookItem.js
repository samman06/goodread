import React, {Component} from 'react';

class bookItem extends Component {
    editBookModal = ({target}) => this.props.editBookModal(target);

    render() {
        const {books} = this.props;
        let allBooks;
        if (books) {
            allBooks = books.map((book, index) =>
                <tr key={index}>
                    <th>{index + 1}</th>
                    <th key={index}>
                        <img src={"http://localhost:4000/" + book.photo}
                             width="50" height="50" alt="error image"/>
                    </th>
                    <th>{book.name}</th>
                    <th>{book.categoryId.name}</th>
                    <th>{book.authorId.firstName + " " + book.authorId.lastName}</th>
                    <th>
                        <button value={JSON.stringify(book)} type="button"
                                className="btn btn-info" name="edit"
                                onClick={this.editBookModal}>
                            Edit
                        </button>
                        {" "}
                        <button value={index} onClick={() => this.deleteBook(book._id)}
                                type="button" className="btn btn-danger">Delete
                        </button>
                    </th>
                </tr>)
        }
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <thead>
                {allBooks}
                </thead>
            </table>
        );
    }
}

export default bookItem;
