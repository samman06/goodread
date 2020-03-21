import React, {Component} from 'react';
import {FormGroup, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

class EditModal extends Component {
    openCategoryModal = ({target}) => this.props.openCategoryModal(target);
    onChange = (event) => this.props.onChange(event);
    editCategory = () => this.props.editCategory();

    render() {
        const {isOpen, name, errors} = this.props;
        return (
            <div>
                <Modal isOpen={isOpen} toggle={this.openEditModal}>
                    <ModalHeader toggle={this.openEditModal}>Edit Category</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <input
                                type="name" name="name"
                                placeholder="Category Name"
                                value={name}
                                onChange={this.onChange}
                            />
                            {errors.name && <span>{errors.name}</span>}
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <button onClick={this.openCategoryModal && this.editCategory}>
                            Edit
                        </button>
                        {' '}
                        <button color="secondary" onClick={this.editCategory}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default EditModal;
