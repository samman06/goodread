import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types"
import {Progress} from 'reactstrap';
import SideBar from "./SideBar";
import {Link} from "react-router-dom";

import {getUserBooksStatus, getUserBooks, setReadingStatus} from "../../actions/userBooksActions";


class TableContent extends Component {
    constructor(props) {
        super(props);
        this.userId = this.props.auth.user._id;
    }

    componentDidMount = async () => await this.props.getUserBooks(this.userId);
    all = async () => await this.props.getUserBooks(this.userId);
    read = async () => console.log("read");
    currentlyRead = async () => console.log("current");
    wantToRead = async () => console.log("willRead");


    render() {
        const {books} = this.props.userBooks;
        let currentBooks;
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
                        <select className="form-control" name="status">
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
                        <table className="table">
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
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

TableContent.protoTypes = {
    getUserBooks: PropTypes.func.isRequired,
    getUserBooksStatus: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    userBooks: PropTypes.object.isRequired,
};

const mapStateToProps = ({auth, userBooks}) => ({auth, userBooks});
export default connect(mapStateToProps, {getUserBooksStatus, getUserBooks, setReadingStatus})(TableContent)
