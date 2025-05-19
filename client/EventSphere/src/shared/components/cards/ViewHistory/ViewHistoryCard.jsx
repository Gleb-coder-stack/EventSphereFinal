import React from 'react';
import dayjs from "dayjs";
import classes from './ViewHistoryCard.module.css'

const ViewHistoryCard = ({history, onClickToCard}) => {
    const dateCreate = dayjs((history.createdAt)).format('DD-MM-YYYY');
    return (
        <div className={classes.card}>
            <h2>{history.event.name}</h2>
            <p>Посещено {dateCreate}</p>
        </div>
    );
};

export default ViewHistoryCard;