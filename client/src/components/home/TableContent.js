import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types"
import SideBar from "./SideBar";

class TableContent extends Component {
    constructor(props) {
        super(props);
        this.userId = this.props.auth.user._id;
    }


    all = async () => console.log("all");
    read = async () => console.log("read");
    currentlyRead = async () => console.log("current");
    wantToRead = async () => console.log("willRead");


    render() {
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
export default connect(mapStateToProps, {})(TableContent)
