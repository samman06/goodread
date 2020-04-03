import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types"
import {
    getAuthorBooks, setRateAndGetAuthorBooks, setReadingStatusAndGetAuthorBooks, removeUserBookAndGetAuthorBooks
} from "../../actions/bookActions"
import StarRating from "../StarRating";
import '../../Styles/authorbook.css';

class AuthorBooks extends Component {
    componentDidMount = async () => await this.props.getAuthorBooks(this.props.authorId);
    setRate = async (bookId, rate, shelve = "Read") => {
        console.log(1);
        await this.props.setRateAndGetAuthorBooks({shelve, rate, bookId}, this.props.authorId);
    };
    setReadingStatus = async (rateId, bookId, {target}) => {
        let shelve = target.value;
        if (shelve === "Remove") await this.props.removeUserBookAndGetAuthorBooks(this.props.authorId, rateId);
        else await this.props.setReadingStatusAndGetAuthorBooks({shelve, bookId, rate: null}, this.props.authorId);
    };

    render() {
        const {books} = this.props.book;
        let authorBooks, shelveStatus;
        if (books) {
            authorBooks = books.map(({_id, photo, userBook, name, rate}) =>
                <div key={_id}>
                    <div className="row">
                        <div className="col-1">
                            <img style={{width: 100, height: 100}}
                                 src={"http://localhost:4000/" + photo}
                                 alt="Book Image"/>
                        </div>
                        <div className="col-md-8 row">
                            <div className="col-12">
                                <h2>{name}</h2>
                            </div>
                            <div className="col-12 row">
                                <div className="col-3">
                                    {userBook ?
                                        <StarRating onClick={this.setRate} rate={userBook.rate || 0} rateId={_id}/>
                                        : <StarRating onClick={this.setRate} rate={0} rateId={_id}/>
                                    }
                                </div>
                                <div className="col-3">
                                    <span>{"Book Rate:- " + rate}</span>

                                </div>
                                <div className="col-3">
                                    <span>300 Rate</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <select className="form-control" name="status"
                                    onChange={userBook ?
                                        (event) => this.setReadingStatus(userBook._id, _id, event) :
                                        (event) => this.setReadingStatus(null, _id, event)
                                    }
                            >
                                {userBook ?
                                    <option value={userBook.shelve}>{userBook.shelve}</option>
                                    : <option value="chose">chose</option>
                                }
                                {userBook ?
                                    (shelveStatus = ['Reading', 'Will Read', 'Read', 'Remove']) &&
                                    shelveStatus.splice(shelveStatus.indexOf(userBook.shelve), 1)
                                    : (shelveStatus = ['Reading', 'Will Read', 'Read'])
                                }
                                {shelveStatus.map(shelve => <option key={shelve} value={shelve}>{shelve}</option>)}

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
    setRateAndGetAuthorBooks: PropTypes.func.isRequired,
    setReadingStatusAndGetAuthorBooks: PropTypes.func.isRequired,
    removeUserBookAndGetAuthorBooks: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
};
const mapStateToProps = ({book}) => ({book});

export default connect(mapStateToProps, {
    getAuthorBooks, setRateAndGetAuthorBooks, setReadingStatusAndGetAuthorBooks, removeUserBookAndGetAuthorBooks
})(AuthorBooks);
