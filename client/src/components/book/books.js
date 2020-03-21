import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {getBooks, setReadingStatus, getBooksAndRattedBooks} from "../../actions/bookActions";

import StarRating from "../StarRating";

class Books extends Component {
    componentDidMount = async () => await this.props.getBooksAndRattedBooks();
    setRate = async (rateId, rate, shelve = "Read") => {
        await this.props.setReadingStatus({shelve, rate, bookId: rateId});
        await this.props.getBooksAndRattedBooks()
    };
    setReadingStatus = async (rateId) => {
        await this.props.setReadingStatus({shelve: "willRead", bookId:rateId});
        await this.all()
    };

    render() {
        const {books} = this.props.book;
        let allBooks;
        if (books) {
            allBooks = books.map(({name, _id, photo, shelve, userBook}) =>
                <div className="thumb" key={_id}>
                    <div className="card">
                        <img style={{width: "100%", height: 100}} alt="book image"
                             src={"http://localhost:4000/" + photo}
                        />
                        <div className="card-body">
                            <Link to={_id}>
                                {name}
                            </Link>
                            {userBook &&
                            <div>
                                <StarRating
                                    onClick={this.setRate}
                                    rate={userBook.rate || 0} rateId={_id}
                                />
                                <div className="card-title">
                                    <button className="btn btn-success">
                                        {userBook.shelve}
                                    </button>
                                </div>
                            </div>
                            }
                            {!userBook &&
                            <div>
                                <StarRating
                                    onClick={this.setRate}
                                    rate={0} rateId={_id}
                                />
                                <div className="card-title">
                                    <button className="btn btn-warning"
                                            onClick={() => this.setRate(_id, null, "Will Read")}
                                    >
                                        Want To Read
                                    </button>
                                </div>
                            </div>
                            }
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
    getBooksAndRattedBooks: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
};
const mapStateToProps = ({book}) => ({book});

export default connect(mapStateToProps, {getBooks, setReadingStatus, getBooksAndRattedBooks})(Books);
