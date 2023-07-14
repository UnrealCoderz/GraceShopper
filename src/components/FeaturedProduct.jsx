import React from 'react';
import './featuredproduct.css'
const FeaturedProduct = (props) => {
    const featuredProductName = props.featuredProductName;
    return (
        <div>
            <h2>Today's featured product:</h2>
            <h3>{featuredProductName}</h3>
            <img src='../images/placeholder_img.PNG' alt="Placeholder" />
            <p>This is a placeholder description, I'm sure we'll add more later</p>
        </div>
    );
};

export default FeaturedProduct;
