import React, {Component} from 'react';
import '../../Styles/AdminPanel.css';

class BookReviews extends Component {
    onChange = ({target}) => this.props.onChange(target);
    addReview = async () => await this.props.addReview();
    removeReview = (reviewId) => this.props.removeReview(reviewId);

    render() {
        const {reviews, review, userId} = this.props;
        let allReviews = reviews.map(review => (<div className="input-group mb-3" key={review._id}>
            <span className="form-control">{review.review}</span>
            <div className="input-group-prepend">
                {userId === review.userId._id ?
                    <button className="btn btn-danger" onClick={() => this.removeReview(review._id)}>
                        Remove
                    </button> : null}
            </div>
        </div>));
        return (
            <div className='container-fluid'>
                <div className="input-group mb-3">

                    <input type="text" className="form-control form-control-lg"
                           placeholder="write your review" name="review"
                           value={review} onChange={this.onChange}/>
                    <div className="input-group-prepend">
                        <button className="btn btn-primary" onClick={this.addReview}>
                            Add Review
                        </button>
                    </div>
                </div>
                {allReviews}
            </div>
        );
    }
}

export default BookReviews;
