import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types"
import {Progress, Table} from 'reactstrap';
import SideBar from "./SideBar";
import StarRating from "../StarRating";
import {getUserBooksStatus, getUserBooks, removeUserBook,setReadingStatus} from "../../actions/userBooksActions";
import {Link} from "react-router-dom";

class TableContent extends Component {
    constructor(props) {
        super(props);
        this.userId = this.props.auth.user._id;
    }

    componentDidMount = async () => await this.props.getUserBooks(this.userId);

    all = async () => await this.props.getUserBooks(this.userId);
    read = async () => await this.props.getUserBooksStatus(this.userId, "read");
    currentlyRead = async () => await this.props.getUserBooksStatus(this.userId, "Reading");
    wantToRead = async () => await this.props.getUserBooksStatus(this.userId, "willRead");

    setReadingStatus = async (rateId, {target}) => {
        let shelve = target.value;
        if (shelve==="Remove"){
            await this.props.removeUserBook(this.userId,rateId)
        }else {
            await this.props.setReadingStatus(this.userId,{shelve, rateId});
        }
    };
    setRate = async (rateId, rate) => {
        await this.props.setReadingStatus({shelve: "Read", rate, rateId});
        await this.all()
    };

    render() {
        const {books} = this.props.userBooks;
        let shelveStatus, currentBooks;
        if (books) {
            currentBooks = books.map(({shelve, _id, bookId, rate}, index) =>
                <tr key={_id}>
                    <th scope="row">{index}</th>
                    <td>
                        <img src={`http://localhost:4000/${bookId.photo}`}
                             width="50" height="50" alt="error image"/>
                    </td>
                    <td>
                        <Link to={`/books/${bookId._id}`}>{bookId.name}</Link>
                    </td>
                    <td>
                        <Link to={`/authors/${bookId.authorId._id}`}>
                            {bookId.authorId.firstName + " " + bookId.authorId.lastName}
                        </Link>

                    </td>
                    <td>
                        <Progress value={rate}/>
                    </td>
                    <td>
                        <StarRating
                            onClick={this.setRate}
                            rate={rate || 0} rateId={_id}
                        />
                    </td>
                    <td>
                        <select className="form-control" name="status"
                                onChange={(event) => this.setReadingStatus(_id, event)}
                        >
                            <option value={shelve}>{shelve}</option>
                            {
                                (shelveStatus = ['Reading', 'Will Read', 'Read', 'Remove']) &&
                                shelveStatus.splice(shelveStatus.indexOf(shelve), 1) &&
                                shelveStatus.map(shelve => <option key={shelve} value={shelve}>{shelve}</option>)
                            }
                        </select>
                    </td>
                </tr>
            )
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3">
                        <SideBar all={this.all} read={this.read}
                                 currentlyRead={this.currentlyRead}
                                 wantToRead={this.wantToRead}
                        />
                    </div>
                    <div className="col-lg-9">
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Cover</th>
                                <th>Name</th>
                                <th>Author</th>
                                <th>Avg Rate</th>
                                <th>Rating</th>
                                <th>shelve</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentBooks}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

TableContent.protoTypes = {
    getUserBooks: PropTypes.func.isRequired,
    removeUserBook: PropTypes.func.isRequired,
    getUserBooksStatus: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    userBooks: PropTypes.object.isRequired,
};
const mapStateToProps = ({auth, userBooks}) => ({auth, userBooks});
export default connect(mapStateToProps, {getUserBooks, getUserBooksStatus, setReadingStatus,removeUserBook})(TableContent)
