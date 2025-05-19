import React from 'react';

const RateStars = ({rate, totalRate=5}) => {
    return (
        <div>
            {Array.from({length: totalRate}, (_, index) => (
                <span
                    key={index}
                    style={{
                        fontSize: "30px",
                        color: index < rate ? "gold" : "gray",

                    }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default RateStars;