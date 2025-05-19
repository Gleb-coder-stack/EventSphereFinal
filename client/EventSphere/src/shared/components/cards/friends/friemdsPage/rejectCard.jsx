import React from 'react';
import {useNavigate} from "react-router-dom";
import {PROFILE_PAGE} from "../../../../constants/const.js";
import classes from './friendCard.module.css'

const RejectCard = ({data}) => {
    const navigate = useNavigate();
    const clickToCard = () => {
        navigate(PROFILE_PAGE + `?id=${data.idRequester}&type=participant`)
    }
    return (
        <div onClick={clickToCard} className={classes.card}>
            <h4>{data.requester?.nickname}</h4>
        </div>
    );
};

export default RejectCard;