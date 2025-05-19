import React from 'react';
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import classes from './ModerEvent.module.css'

const TagCard = ({tag, update, deleteTagFunc}) => {
    const redact = () => {
        update(tag)
    }
    const deleteClick = () => {
        deleteTagFunc(tag.id)
    }
    const resultType = () => {
        let result = ''
        tag.isSystem ? result = 'системный' : result =  'пользовательский'
        return result
    }
    return (
        <div className={classes.card}>
            <div className={classes.mainDataContainer}>
                <h4>{tag.Name}</h4>
                <p>Тип: {resultType()}</p>
            </div>

            <div className={classes.buttonContainer}>
                <CustomButton onClick={redact}>Редактировать</CustomButton>
                <CustomButton onClick={deleteClick}>Удалить</CustomButton>
            </div>
        </div>
    );
};

export default TagCard;