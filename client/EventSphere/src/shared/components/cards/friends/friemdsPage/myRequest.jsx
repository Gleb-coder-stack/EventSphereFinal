import React from 'react';
import {useNavigate} from "react-router-dom";
import {PROFILE_PAGE} from "../../../../constants/const.js";
import classes from './friendCard.module.css'

const MyRequest = ({data}) => {
    const navigate = useNavigate();
    const clickToCard = () => {
        navigate(PROFILE_PAGE + `?id=${data.idReceiver}&type=participant`)
    }
    return (
        <div onClick={clickToCard} className={classes.card}>
           <h4>{data.receiver?.nickname}</h4>
            <p>Статус: {data.status}</p>
        </div>
    );
};

export default MyRequest;