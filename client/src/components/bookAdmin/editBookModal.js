import React, {Component} from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

class editBookModal extends Component {
    bookModal = ({target}) => this.props.editBookModal(target);
    onChange = ({target}) => this.props.onChange(target);
    editBook = () => this.props.editBook();

    render() {
        const {authors, categories, isOpen, errors, book} = this.props;
        let allCategories, allAuthors;
        if (authors)
            allAuthors = authors.map(({_id, firstName, lastName}) =>
                <option key={_id} value={_id}>{firstName + " " + lastName}</option>);
        if (categories)
            allCategories =
                categories.map(({_id, name}) => <option key={_id} value={_id}>{name}</option>);

        return (
            <div>
                <Modal isOpen={isOpen} toggle={this.editBookModal}
                       className={this.props.className}>
                    <ModalHeader toggle={this.bookModal}>Edit Book</ModalHeader>
                    <ModalBody>
                        <form>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="name" name="name" value={book.name} onChange={this.onChange}/>
                                {errors.name && <span>{errors.name}</span>}
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select value={book.categoryId}  name="categoryId" onChange={this.onChange}>
                                    {allCategories}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Author</label>
                                <select name="authorId" value={book.authorId} onChange={this.onChange}>
                                    {allAuthors}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Edit Image</label>
                                <input type="file" name="file" onChange={this.onChange}/>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary mr-1" onClick={this.bookModal && this.editBook}>
                            Edit
                        </button>
                        <button className="btn btn-warning" onClick={this.bookModal}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default editBookModal;
