import React from 'react';
import CustomButton from "../../../../UI/Button/CustomButton.jsx";
import {useNavigate} from "react-router-dom";
import {PROFILE_PAGE} from "../../../../constants/const.js";
import classes from './friendCard.module.css'

const RequstCard = ({data, approveRequest, deleteFriend}) => {
    const navigate = useNavigate();
    const approve = () => {
        approveRequest(data.id)
    }
    const reject = () => {
        deleteFriend(data.id)
    }
    const clickToCard = () => {
        navigate(PROFILE_PAGE + `?id=${data.idRequester}&type=participant`)
    }
    return (
        <div onClick={clickToCard} className={classes.card}>
            <h4>{data.requester?.nickname}</h4>
            <div className={classes.buttonsContainer}>
                <CustomButton onClick={approve}>Добавить друга</CustomButton>
                <CustomButton onClick={reject}>Отклонить заявку</CustomButton>
            </div>
        </div>
    );
};

export default RequstCard;