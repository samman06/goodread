import React, {Component} from 'react';
import {Modal, ModalHeader} from "reactstrap";

class addAuthorModal extends Component {
    addAuthorModal = () => this.props.addAuthorModal();
    onChange = ({target}) => this.props.onChange(target);
    addAuthor = () => this.props.addAuthor();

    render() {
        const {isOpen, errors} = this.props;
        return (
            <div>
                <button onClick={this.addAuthorModal} className='btn btn-info offset-10 mt-1 mb-1'>
                    Add Author +
                </button>
                <Modal isOpen={isOpen} toggle={this.addAuthorModal}>
                    <ModalHeader toggle={this.addAuthorModal}>Add Author</ModalHeader>
                    <div className="modal-body">
                        <div className="form-group">
                            <input className="form-control" type="name" name="firstName"
                                   onChange={this.onChange} placeholder="First Name"/>
                            {errors.firstName && <span>{errors.firstName}</span>}
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="name" name="lastName"
                                   onChange={this.onChange} placeholder="Last Name"/>
                            {errors.lastName && <span>{errors.lastName}</span>}
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="date" name="dateOfBirth" onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <label>Upload Image</label>
                            <input className="form-control" type="file" name="photo" onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary mr-1" onClick={this.addAuthorModal && this.addAuthor}>
                            Add Author
                        </button>
                        <button className="btn btn-warning" onClick={this.addAuthorModal}>cancel</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default addAuthorModal;
