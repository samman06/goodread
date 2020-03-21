import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {getBooks,setReadingStatus} from "../../actions/bookActions";

import StarRating from "../StarRating";

class Books extends Component {
    componentDidMount = async () => await this.props.getBooks();
    setRate = async (rateId, rate) => {
        await this.props.setReadingStatus({shelve: "read", rate, bookId:rateId});
        await this.props.getBooks()
    };
    render() {
        const {books} = this.props.book;
        let allBooks;
        if (books) {
            allBooks = books.map((book, index) =>
                <div className="thumb" key={index}>
                    <div className="card">
                        <img style={{width: "100%", height: 100}} alt="book image"
                             src={"http://localhost:4000/" + book.photo}
                        />
                        <div className="card-body">
                            <Link to={"http://localhost:4000/" + book.photo}>
                                {book.name}
                            </Link>
                            <StarRating
                                onClick={this.setRate}
                                rate={book.rate || 0} rateId={book._id}
                            />
                            <div className="card-title">
                                <button className="btn btn-warning">
                                    want to read
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                {allBooks}
            </div>
        );
    }
}

Books.protoTypes = {
    gstBooks: PropTypes.func.isRequired,
    setReadingStatus: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
};
const mapStateToProps = ({book}) => ({book});

export default connect(mapStateToProps, {getBooks,setReadingStatus})(Books);
// 60
