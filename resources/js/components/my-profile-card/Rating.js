import React from "react";
import ReactStars from "react-rating-stars-component";

function Rating(props) {
    const { ratingVal, comment } = props;
    return (
        <div className="col-12 col-lg-3">
            <ReactStars
                count={5}
                size={24}
                isHalf={false}
                emptyIcon={<i className="far fa-star"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
                value={ratingVal}
                edit={false}
            />
            <p className="comment">{comment}</p>
        </div>
    );
}

export default Rating;
