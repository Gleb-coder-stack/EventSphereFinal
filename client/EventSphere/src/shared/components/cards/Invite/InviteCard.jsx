import React from 'react';
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import {useNavigate} from "react-router-dom";
import {EVENT_PAGE} from "../../../constants/const.js";
import classes from './inviteCard.module.css'

const InviteCard = ({invite, approve, reject}) => {
    const navigate = useNavigate();
    const clickToCard = () => {
        navigate(EVENT_PAGE.replace(':id', invite.idEvent));
    }
    const approveInvite = (e) => {
        e.stopPropagation()
        approve(invite.id);
    }
    const rejectInvite = (e) => {
        e.stopPropagation()
        reject(invite.id);
    }
    return (
        <div onClick={clickToCard} className={classes.card}>
            <h3>Приглашение</h3>
            <div className={classes.mainContainer}>
                <p>{invite.requester.nickname} приглашает вас на {invite.event?.name}</p>
                <p>Статус приглашения: {invite.status}</p>
                <div className={classes.buttons}>
                    <CustomButton onClick={approveInvite}>Принять приглашение</CustomButton>
                    <CustomButton onClick={rejectInvite}>Отклонить приглашение</CustomButton>
                </div>
            </div>
        </div>
    );
};

export default InviteCard;