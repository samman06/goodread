import React, {Component} from 'react';
import {Progress} from 'reactstrap';
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import PropTypys from "prop-types"
import {getBookById, setReadingStatusBookProfile, removeUserBook} from "../../actions/bookActions";
import StarRating from "../StarRating";
import '../../Styles/bookprofile.css';

class BookProfile extends Component {
    constructor(props) {
        super(props);
        this.bookId = this.props.match.params.id;
    }

    componentDidMount = async () => await this.props.getBookById(this.bookId);
    setReadingStatus = async (rateId, {target}) => {
        let shelve = target.value;
        if (shelve === "Remove") await this.props.removeUserBook(this.bookId, rateId);
        else await this.props.setReadingStatusBookProfile(this.bookId, {shelve, bookId: this.bookId, rate: null});
    };
    setRate = async (bookId, rate) => {
        await this.props.setReadingStatusBookProfile(this.bookId, {shelve: "Read", rate, bookId});
    };

    render() {
        const {book} = this.props.book;
        let currentBook, rateId, shelveStatus;
        if (book) {
            const {authorId, categoryId, bookUser} = book;
            if (bookUser) rateId = bookUser._id;
            currentBook = (
                <div className="row BookPage">
                    <div className="col_trainings BookImg">
                        <div className="Img">
                            <img style={{width: 150, height: 200}}
                                 src={"http://localhost:4000/" + book.photo}
                                 alt="Card image cap"/>
                        </div>
                        <div>
                            <select
                                onChange={(event) => this.setReadingStatus(rateId, event)}
                                className="form-control" name="status">
                                {bookUser ? <option value={bookUser.shelve}>{bookUser.shelve}</option> :
                                    <option value="chose">chose</option>
                                }
                                {bookUser ?
                                    (shelveStatus = ['Reading', 'Will Read', 'Read', 'Remove']) &&
                                    shelveStatus.splice(shelveStatus.indexOf(bookUser.shelve), 1)
                                    : (shelveStatus = ['Reading', 'Will Read', 'Read'])
                                }
                                {shelveStatus.map(shelve => <option key={shelve} value={shelve}>{shelve}</option>)}
                            </select>
                            <div className="card-body">
                                <p>User Evaluation</p>
                                {bookUser ? <StarRating
                                    onClick={this.setRate}
                                    rate={bookUser.rate || 0} rateId={book._id}
                                /> : <StarRating
                                    onClick={this.setRate}
                                    rate={0} rateId={book._id}
                                />}
                            </div>
                        </div>
                    </div>

                    <div className="col_downloads BookData">
                        <h1>{book.name}</h1>
                        <h3>
                            By <Link to={`/authors/${authorId._id}`}>
                            {`${authorId.firstName} ${authorId.lastName}`}
                        </Link>
                        </h3>
                        <h3>
                            Category <Link to={`/categories/${categoryId._id}`}>
                            {categoryId.name}
                        </Link>
                        </h3>
                        <div className="text-center">{book.rate} %</div>
                        <Progress value={book.rate}/>
                    </div>
                </div>
            )
        }
        return (
            <div className="container-fluid">
                {currentBook}
            </div>
        );
    }
}

BookProfile.protoTypes = {
    getBookById: PropTypys.func.isRequired,
    setReadingStatusBookProfile: PropTypys.func.isRequired,
    removeUserBook: PropTypys.func.isRequired,
};

const mapStateToProps = ({book}) => ({book});
export default connect(mapStateToProps, {getBookById, setReadingStatusBookProfile, removeUserBook})(BookProfile);
