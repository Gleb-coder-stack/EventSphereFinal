import React from 'react';
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import classes from './FavouriteCard.module.css'
import dayjs from "dayjs";

const FavouriteCard = ({favourite, onClick, onDelete}) => {
    const dateCreate = dayjs((favourite.event.dateStart)).format('DD-MM-YYYY');
    return (
        <div onClick={() => onClick(favourite.id)} className={classes.card}>
            <div className={classes.mainData}>
                <h3>{favourite.event.name}</h3>
                <p>Дата начала: {dateCreate}</p>
                <p>Статус: {favourite.event.status}</p>
            </div>
            <div>
                <CustomButton onClick={() => (onDelete(favourite.id))}>Удалить из избранного</CustomButton>
            </div>
        </div>
    );
};

export default FavouriteCard;