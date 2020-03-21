import React, {Component} from 'react';
import {Table} from "reactstrap";

class authorItem extends Component {
    editAuthorModal = ({target}) => this.props.editAuthorModal(target);
    deleteAuthor = async (id) => await this.props.deleteAuthor(id);

    render() {
        const {authors} = this.props;
        let allAuthors;
        if (authors) {
            allAuthors = authors.map((author, index) =>
                <tr key={author._id}>
                    <th>{index + 1}</th>
                    <th>
                        <img src={"http://localhost:4000/" + author.photo}
                             width="50" height="50" alt="error image"/>
                    </th>
                    <th>{author.firstName}</th>
                    <th>{author.lastName}</th>
                    <th>{author.dateOfBirth.substr(0, 10)}</th>
                    <th>
                        <button value={JSON.stringify(author)} type="button"
                                className="btn btn-info" name="edit"
                                onClick={this.editAuthorModal}
                        >
                            Edit
                        </button>
                        {" "}
                        <button value={index} type="button" className="btn btn-danger"
                                onClick={() => this.deleteAuthor(author._id)}
                        >
                            Delete
                        </button>
                    </th>
                </tr>
            );
        }
        return (
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Photo</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Date of Birth</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <thead>
                {allAuthors}
                </thead>
            </Table>
        );
    }
}

export default authorItem;
