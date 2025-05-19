import React from 'react';
import classes from './EventMediaCard.module.css'

const EventMediaCard = ({image}) => {
    return (
        <div className={classes.card}>
            <img height={200} width={200}
                 src={`http://localhost:5000/` + image.nameMedia} alt={"Фото"}/>
        </div>
    );
};

export default EventMediaCard;