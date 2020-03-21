import React, {Component} from 'react';
import {Progress, CardBody, Input} from 'reactstrap';
import {connect} from "react-redux"
import PropTypys from "prop-types"
import {getBookById, setReadingStatus} from "../../actions/bookActions";
import '../../Styles/bookprofile.css';
// import SetStatusReading from "../../service/updateReadingStatus";
// import BookReview from "./BookReview";
// import BookReviewAlready from "./bookReviewAlready";
// import BookAthor from "./book_author";


class BookProfile extends Component {

    constructor(props) {
        super(props);
        this.bookId = this.props.match.params.id;
        this.state = {
            currentBook: '',
            author: '',
            category: '',
        };
    }

    componentDidMount = async () => await this.props.getBookById(this.bookId);


    setReadingStatus = async (rateId, {target}) => {
        let shelve = target.value;
        if (shelve === "Remove") {
            await this.props.removeUserBook(this.bookId, rateId)
        } else {
            await this.props.setReadingStatus(this.bookId, {shelve, rateId});
        }
    };

    render() {
        const {book} = this.props.book;
        let currentBook, shelveStatus;
        if (book) {
            const {authorId, categoryId} = book;
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
                                onChange={(event) => this.setReadingStatus(book._id, event)}
                                className="form-control" name="status">
                                <option value={book.shelve}>{book.shelve}</option>
                                {
                                    (shelveStatus = ['Reading', 'Will Read', 'Read', 'Remove']) &&
                                    shelveStatus.splice(shelveStatus.indexOf(book.shelve), 1) &&
                                    shelveStatus.map(shelve => <option key={shelve} value={shelve}>{shelve}</option>)
                                }
                            </select>
                            <div className="card-body">
                                <p>User Evaluation</p>
                            </div>
                        </div>
                    </div>

                    <div className="col_downloads BookData">
                        <h1>{book.name}</h1>
                        <h3>
                            <a href={`/authors/${authorId._id}`}>
                                {`by ${authorId.firstName} ${authorId.lastName}`}
                            </a>
                        </h3>
                        <h3>
                            <a href={`/categories/${categoryId._id}`}>
                                {categoryId.name} Category
                            </a>
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
    setReadingStatus: PropTypys.func.isRequired,
};

const mapStateToProps = ({book}) => ({book});
export default connect(mapStateToProps, {getBookById, setReadingStatus})(BookProfile);
