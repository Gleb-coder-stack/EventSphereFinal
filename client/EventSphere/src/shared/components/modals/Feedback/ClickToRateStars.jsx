import React, {useState} from 'react';

const ClickToRateStars = ({totalStars= 5, initialRating = 1, setRating}) => {
    const [rating, setLocalRating] = useState(initialRating);
    const handleClick = (newRating) => {
        setLocalRating(newRating);
        setRating(newRating);
    };

    return (
        <div>
            {Array.from({ length: totalStars }, (_, index) => (
                <span
                    key={index}
                    style={{
                        cursor: "pointer",
                        fontSize: "30px",
                        color: index < rating ? "gold" : "gray",
                    }}
                    onClick={() => handleClick(index + 1)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default ClickToRateStars;