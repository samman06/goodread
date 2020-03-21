import React, {Component} from 'react';
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {getAuthors, editAuthor, addAuthor, deleteAuthor} from "../../actions/authorActions";
import AddAuthorModal from "./addAuthorModal"
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
    onChange = (target) => this.setState({[target.name]: target.value});

    addAuthorModal = () => {
        let addModal = !this.state.addModal;
        this.setState({addModal});
    };
    addAuthor = async () => {
        const {firstName, lastName, dateOfBirth, photo} = this.state;
        const {payload} = await this.props.addAuthor({firstName, lastName, dateOfBirth, photo});
        if (payload._id) this.setState({firstName: "", lastName: "", dateOfBirth: "", photo: "", addModal: false});
    };

    render() {
        const {addModal} = this.state;
        const {authors} = this.props.author;
        const {errors} = this.props;

        return (
            <div className="col-sm-12">
                <AddAuthorModal
                    onChange={this.onChange}
                    isOpen={addModal} errors={errors}
                    addAuthorModal={this.addAuthorModal}
                    addAuthor={this.addAuthor}
                />
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

