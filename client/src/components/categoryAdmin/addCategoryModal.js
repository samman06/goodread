import React, {Component} from 'react';
import {Modal, ModalHeader} from "reactstrap";

class addCategoryModal extends Component {
    openAddModal = () => this.props.openAddModal();
    onChange = (event) => this.props.onChange(event);
    addCategory = () => this.props.addCategory();

    render() {
        const {isOpen, errors} = this.props;
        return (
            <div>
                <button onClick={this.openAddModal} className='btn btn-info offset-10 mt-1 mb-1'>
                    Add Category +
                </button>
                <Modal isOpen={isOpen} toggle={this.openAddModal}>
                    <ModalHeader toggle={this.openAddModal}>Add Category</ModalHeader>
                    <div className="modal-body">
                        <div className='form-group'>
                            <input className='form-control' type="name" name="name"
                                   onChange={this.onChange} placeholder="Category Name"/>
                            {errors.name && <span>{errors.name}</span>}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-primary mr-1" onClick={this.openAddModal && this.addCategory}>
                            Add Category
                        </button>
                        <button color="secondary" onClick={this.openAddModal}>cancel</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default addCategoryModal;
