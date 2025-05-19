import React from 'react';
import CustomButton from "../../../../UI/Button/CustomButton.jsx";
import {useNavigate} from "react-router-dom";
import {PROFILE_PAGE} from "../../../../constants/const.js";
import classes from './friendCard.module.css'

const MainFriendCard = ({data, deleteFriend}) => {
    const navigate = useNavigate();
    const click = () => {
        deleteFriend(data.id);
    }
    const clickToCard = () => {
        navigate(PROFILE_PAGE + `?id=${data.idRequester}&type=participant`)
    }
    return (
        <div onClick={clickToCard} className={classes.card}>
            <h4>{data.requester?.nickname}</h4>
            <CustomButton onClick={click}>Удалить друга</CustomButton>
        </div>
    );
};

export default MainFriendCard;