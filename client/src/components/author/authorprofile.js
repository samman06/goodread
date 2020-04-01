import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types"
import '../../Styles/bookprofile.css';
import {getAuthorById} from "../../actions/authorActions";

class AuthorProfile extends Component {
    constructor(props) {
        super(props);
        this.authorId = this.props.match.params.id
    }

    componentDidMount = async () => await this.props.getAuthorById(this.authorId);

    render() {
        const {author} = this.props.author;
        let currentAuthor;
        if (author) {
            currentAuthor = (
                <div className="row AuthorProfile">
                    <div className="col-2 authorImg">
                        <div className="Img">
                            <img style={{width: 200, height: 200}}
                                 src={"http://localhost:4000/" + author.photo}
                                 alt="Card image cap"/>
                        </div>
                    </div>
                    <div className="col-9">
                        <p className="h1">{author.firstName + " " + author.lastName}</p>
                        <h3>{("" + author.dateOfBirth).substr(0, 10)}</h3>
                    </div>
                </div>
            )
        }
        return (
            <div className="container-fluid">
                {currentAuthor}
            </div>
        );
    }
}

AuthorProfile.protoType = {
    getAuthorById: PropTypes.func.isRequired,
    author: PropTypes.object.isRequired,
};
const mapStateToProps = ({author}) => ({author});
export default connect(mapStateToProps, {getAuthorById})(AuthorProfile);
