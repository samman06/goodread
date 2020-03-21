import React, {Component} from 'react';
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {getAuthors, editAuthor, addAuthor, deleteAuthor} from "../../actions/authorActions";
import AddAuthorModal from "./addAuthorModal";
import EditAuthorModal from "./editAuthorModal";
import AuthorItem from "./authorItem";

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
    parseAuthorData = async (target) => {
        if (target.name === "edit") {
            const {_id, firstName, lastName, dateOfBirth, photo} = await JSON.parse(target.value);
            this.setState({firstName, lastName, dateOfBirth, photo, authorId: _id});
        }
    };
    editAuthorModal = async (target) => {
        console.log(target);
        await this.parseAuthorData(target);
        let editModal = !this.state.editModal;
        this.setState({editModal});
    };
    addAuthorModal = () => {
        let addModal = !this.state.addModal;
        this.setState({addModal});
    };
    addAuthor = async () => {
        const {firstName, lastName, dateOfBirth, photo} = this.state;
        const {payload} = await this.props.addAuthor({firstName, lastName, dateOfBirth, photo});
        if (payload._id) this.setState({firstName: "", lastName: "", dateOfBirth: "", photo: "", addModal: false});
    };
    editAuthor = async () => {
        const {firstName, lastName, dateOfBirth, photo, authorId} = this.state;
        let authorData = {firstName, lastName, dateOfBirth, photo};
        const {message} = await this.props.editAuthor(authorId, authorData);
        console.log(message);
        if (message)
            this.setState({authorId: "", firstName: "", lastName: "", dateOfBirth: "", photo: "", editModal: false});
    };

    render() {
        const {firstName, lastName, dateOfBirth, editModal, addModal} = this.state;
        const {authors} = this.props.author;
        const {errors} = this.props;
        console.log(editModal);
        return (
            <div className="col-sm-12">
                <AddAuthorModal
                    onChange={this.onChange}
                    isOpen={addModal} errors={errors}
                    addAuthorModal={this.addAuthorModal}
                    addAuthor={this.addAuthor}
                />
                <EditAuthorModal
                    author={{firstName, lastName, dateOfBirth}}
                    isOpen={editModal} errors={errors}
                    onChange={this.onChange}
                    openAuthorModal={this.editAuthorModal}
                    editAuthor={this.editAuthor}
                />
                <AuthorItem
                    authors={authors}
                    editAuthorModal={this.editAuthorModal}
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

