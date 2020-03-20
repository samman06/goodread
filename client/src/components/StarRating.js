import StarRatings from 'react-star-ratings';
import React, {Component} from 'react';

export default class StarRating extends Component {
    changeRating = (Average) => {
        let {rateId }= this.props;
        this.props.onClick(rateId,Average);
    };

    render() {
        const {rate} = this.props;
        console.log(rate);
        return (
            <div>

                <StarRatings
                    rating={rate}
                    starRatedColor="blue"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="3px"
                    name='Average'
                />
            </div>

        );
    }
}

