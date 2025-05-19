import React from 'react';
import dayjs from "dayjs";
import classes from './RecallCard.module.css'
import {useNavigate} from "react-router-dom";
import {EVENT_PAGE} from "../../../constants/const.js";

const RecallCard = ({recall}) => {
    const navigate = useNavigate();
    const dateCreate = dayjs((recall.createdAt)).format('DD-MM-YYYY');
    const click = () => {
        navigate(EVENT_PAGE.replace(':id', recall.idEvent));
    }
    return (
        <div className={classes.card} onClick={click}>
            <p>{recall.event.name}</p>
            <p>Статус события: {recall.event.status}</p>
            <p>Откликнулся: {dateCreate}</p>
        </div>
    );
};

export default RecallCard;