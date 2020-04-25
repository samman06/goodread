import React, {Component} from 'react';
import {Modal, ModalHeader} from "reactstrap";

class addBookModal extends Component {
    bookModal = () => this.props.addBookModal();
    onChange = ({target}) => this.props.onChange(target);
    addBook = () => this.props.addBook();

    render() {
        const {authors, categories, isOpen, errors} = this.props;
        let allCategories, allAuthors;
        if (authors)
            allAuthors = authors.map(({_id, firstName, lastName}) =>
                <option value={_id} key={_id}>{firstName + " " + lastName}</option>);
        if (categories)
            allCategories = categories.map(({_id, name}) => <option key={_id} value={_id}>{name}</option>);
        return (
            <div>
                <button
                    onClick={this.bookModal} className='btn btn-info offset-10 mt-1 mb-1'>
                    Add Book +
                </button>
                <Modal isOpen={isOpen} toggle={this.bookModal}>
                    <ModalHeader toggle={this.bookModal}>Add Book</ModalHeader>
                    <div className="modal-body">
                        <div className="form-group">
                            <input className="form-control" name="name" id="name"
                                   placeholder="Book name" onChange={this.onChange}/>
                            {errors.name && <span>{errors.name}</span>}
                        </div>
                        <div className="form-group">
                            <select className="form-control" name="categoryId" onChange={this.onChange}>
                                <option value="0">Select Category</option>
                                {allCategories}
                            </select>
                            {errors.categoryId && <span>{errors.categoryId}</span>}
                        </div>
                        <div className="form-group">
                            <select className="form-control" name="authorId" onChange={this.onChange}>
                                <option value="0">Select Author</option>
                                {allAuthors}
                            </select>
                            {errors.authorId && <span>{errors.authorId}</span>}
                        </div>
                        <div className="form-group">
                            <label>Upload Image</label>
                            <input type="file" name="photo" onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary mr-1" onClick={this.bookModal && this.addBook}>
                            Add Book
                        </button>
                        <button className="btn btn-warning" onClick={this.bookModal}>
                            Cancel
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default addBookModal;
