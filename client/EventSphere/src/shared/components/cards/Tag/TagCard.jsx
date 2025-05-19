import React from 'react';
import classes from './TagCard.module.css'

const TagCard = ({Tag}) => {
    const setColor = () => {
        let color
        if(Tag.isSystem) {
            color = '#f27276'
            return color
        }
        color = '#91a4fa'
        return color
    }
    const background = setColor()
    return (
        <div className={classes.card} style={{ backgroundColor: background }}>
            <p>{Tag.Name}</p>
        </div>
    );
};

export default TagCard;