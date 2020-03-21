import React, {Component} from 'react';
import {FormGroup, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

class editAuthorModal extends Component {
    openAuthorModal = ({target}) => this.props.openAuthorModal(target);
    onChange = ({target}) => this.props.onChange(target);
    editAuthor = () => this.props.editAuthor();

    render() {
        const {isOpen, author, errors} = this.props;
        return (
            <div>
                <Modal isOpen={isOpen} toggle={this.editAuthorModal}>
                    <ModalHeader toggle={this.editAuthorModal}>Edit Author</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <input
                                type="text" name="firstName"
                                placeholder="First Name"
                                value={author.firstName}
                                onChange={this.onChange}
                            />
                            {errors.firstName && <span>{errors.firstName}</span>}
                        </FormGroup>
                        <FormGroup>
                            <input
                                type="text" name="lastName"
                                placeholder="Last Name"
                                value={author.lastName}
                                onChange={this.onChange}
                            />
                            {errors.lastName && <span>{errors.lastName}</span>}
                        </FormGroup>
                        <FormGroup>
                            <input
                                type="date" name="dateOfBirth"
                                value={author.dateOfBirth}
                                onChange={this.onChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Upload Image</label>
                            <input
                                type="file" name="photo"
                                onChange={this.onChange}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary" onClick={this.openAuthorModal  && this.editAuthor}>
                            Edit
                        </button>
                        {' '}
                        <button className="btn btn-secondary" onClick={this.openAuthorModal}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default editAuthorModal;
