import React from 'react';
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import classes from './ModerEvent.module.css'


const ModeratorCard = ({moderator, update, deleteFunc}) => {
    const updateClick = () => {
        console.log(moderator);
        update(moderator);
    }
    const deleteClick = () => {
        deleteFunc(moderator.id);
    }
    return (
        <div className={classes.moderCard}>
            <h4>{moderator.login}</h4>
            <div className={classes.buttonContainer}>
                <CustomButton onClick={updateClick}>Редактировать</CustomButton>
                <CustomButton onClick={deleteClick}>Удалить</CustomButton>
            </div>
        </div>
    );
};

export default ModeratorCard;