import React, {Component} from 'react';
import '../../Styles/AdminPanel.css';

class BookReview extends Component {
    onChange = ({target}) => this.props.onChange(target);
    addReview = async () => await this.props.addReview();


    render() {
        const {reviews, review} = this.props;
        let allReviews = reviews.map(review => (<div className="input-group mb-3" key={review._id}>
            <span className="form-control">{review.review}</span>
            <div className="input-group-prepend">
                <button className="btn btn-danger">
                    Remove
                </button>
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

export default BookReview;
