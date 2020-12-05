import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({rating,numReviews,color}) => {

    // const starRating = (rating) =>{
    //         for (let index = 0; index < rating; index++) {
    //            (
    //                  <span>
    //                      <i className={rating<=index?'fas fa star':rating<index+1?'fas fa-star-half-alt':'far fa star'} ></i>
    //                  </span>
    //            )  
    //         }
    // }

    return (
        <div>
             
            <div className="my-3">
               Rating :
               <span>
                         <i style={{color}} className={rating>=1?'fas fa-star':rating>=0.5?'fas fa-star-half-alt':'far fa-star'} ></i>
                </span>
               <span>
                         <i style={{color}} className={rating>=2?'fas fa-star':rating>=1.5?'fas fa-star-half-alt':'far fa-star'} ></i>
                </span>

                <span>
                         <i style={{color}} className={rating>=3?'fas fa-star':rating>=2.5?'fas fa-star-half-alt':'far fa-star'} ></i>
                </span>
               <span>
                         <i style={{color}} className={rating>=4?'fas fa-star':rating>=3.5?'fas fa-star-half-alt':'far fa-star'} ></i>
                </span>

                <span>
                         <i style={{color}} className={rating===5?'fas fa-star':rating>=4.5?'fas fa-star-half-alt':'far fa-star'} ></i>
                </span>
              <span>  from {numReviews} text reviews</span>
               
            </div>
        </div>
    )
}

Rating.defaultProps = {
    color:"#8bcdcd"
}

Rating.prototype ={
    rating:PropTypes.number.isRequired,
    numReviews:PropTypes.string.isRequired,
    color:PropTypes.string
}
export default Rating
