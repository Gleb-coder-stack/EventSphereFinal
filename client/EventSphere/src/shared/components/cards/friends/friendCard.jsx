import React from 'react';
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import classes from './friendCard.module.css'

const FriendCard = ({friend, sendInvite}) => {
    const click = () => {
        sendInvite(friend.requester?.id)
    }
    return (
        <div className={classes.card}>
            <h5>{friend?.requester?.nickname}</h5>
            <CustomButton onClick={click}>Пригласить</CustomButton>
        </div>
    );
};

export default FriendCard;