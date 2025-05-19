import React from 'react';
import dayjs from "dayjs";
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import classes from './RecallCard.module.css'

const MainRecallCard = ({recall, addFriend}) => {
    const DateRecall  = dayjs((recall.createdAt)).format('DD-MM-YYYY');
    const click = () => {
        addFriend(recall.idParticipant)
    }
    return (
        <div className={classes.card}>
            <h4>{recall?.participant?.nickname}</h4>
            <p>Откликнулся: {DateRecall}</p>
            <CustomButton onClick={click}>Добавить друга</CustomButton>
        </div>
    );
};

export default MainRecallCard;