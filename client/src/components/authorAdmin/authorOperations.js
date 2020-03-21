import React, {Component} from 'react';
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {getAuthors, editAuthor, addAuthor, deleteAuthor} from "../../actions/authorActions";
import AuthorItem from "./authorItem"

class AuthorOperations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModal: false, editModal: false, firstName: "",
            lastName: "", dateOfBirth: "", photo: "", authorId: "",
        };
    }

    componentDidMount = async () => await this.props.getAuthors();

    render() {
        const {authors} = this.props.author;
        return (
            <div className="col-sm-12">
                <AuthorItem
                    authors={authors}
                />
            </div>
        );
    }
}

AuthorOperations.propTypes = {
    getAuthors: PropTypes.func.isRequired,
    addAuthor: PropTypes.func.isRequired,
    deleteAuthor: PropTypes.func.isRequired,
    editAuthor: PropTypes.func.isRequired,
    author: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    author: state.author,
    errors: state.errors,
    auth: state.auth
});
export default connect(mapStateToProps, {getAuthors, addAuthor, deleteAuthor, editAuthor})(AuthorOperations);

