import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getAuthors} from "../../actions/authorActions";

class Authors extends Component {
    componentDidMount = async () => this.props.getAuthors();

    render() {
        const {authors} = this.props.author;
        let allAuthors;
        if (authors) {
            allAuthors = authors.map(author => (
                <div className="thumb" key={author._id}>
                    <div className="card">
                        <img
                            style={{width: 200, height: 150}}
                            src={"http://localhost:4000/" + author.photo}
                            alt="Card image cap"/>
                        <div className="card-body">
                            <div className="card-title">
                                <Link to={'/authors/' + author._id}>
                                    {author.firstName + " " + author.lastName}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ));
        }
        return (
            <div>
                <h1>Authors</h1>
                {allAuthors}
            </div>
        );
    }
}

Authors.protoType = {
    getAuthors: PropTypes.func.isRequired,
    author: PropTypes.object.isRequired,
};
const mapStateToProps = ({author}) => ({author});
export default connect(mapStateToProps, {getAuthors})(Authors);
