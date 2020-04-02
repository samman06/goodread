import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types"
import {getAuthorBooks} from "../../actions/bookActions"
import StarRating from "../StarRating";
import '../../Styles/authorbook.css';

class AuthorBooks extends Component {
    componentDidMount = async () => await this.props.getAuthorBooks(this.props.authorId);

    render() {
        const {books} = this.props.book;
        let authorBooks;
        if (books) {
            authorBooks = books.map((book, index) =>
                <div key={book._id}>
                    <div className="row">
                        <div key={index} className="col-1">
                            <img style={{width: 100, height: 100}}
                                 src={"http://localhost:4000/" + book.photo}
                                 alt="Book Image"/>
                        </div>
                        <div className="col-md-8 row">
                            <div className="col-12">
                                <h2>{book.name}</h2>
                            </div>
                            <div className="col-12 row">
                                <div className="col-3">
                                    <StarRating/>

                                </div>
                                <div className="col-3">
                                    <span>{"Book Rate:- " + book.rate}</span>

                                </div>
                                <div className="col-3">
                                    <span>300 Rate</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <select className="form-control" name="status">
                                <option>want to read</option>
                                <option>reading</option>
                                <option>read</option>
                            </select>
                        </div>
                    </div>
                    <hr style={{border: "1px solid black"}}/>
                </div>
            )
        }
        return (
            <div className="BookInfo">
                <div className="HeaderBook">
                    <h2>Author's Books</h2>
                </div>
                {authorBooks}

            </div>
        );
    }
}

AuthorBooks.proopTypes = {
    getAuthorBooks: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
};
const mapStateToProps = ({book}) => ({book});

export default connect(mapStateToProps, {getAuthorBooks})(AuthorBooks);
//74
