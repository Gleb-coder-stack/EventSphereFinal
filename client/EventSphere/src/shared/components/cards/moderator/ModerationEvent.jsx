import React from 'react';
import {useNavigate} from "react-router-dom";
import {EVENT_PAGE} from "../../../constants/const.js";
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import dayjs from "dayjs";
import classes from './ModerEvent.module.css'

const ModerationEvent = ({event, approve, reject}) => {
    const navigate = useNavigate();
    const clickToCard = () => {
        navigate(EVENT_PAGE.replace(':id', event.id));
    }
    const approveEvevnt = (e) => {
        e.stopPropagation();
        approve(event.id);

    }
    const rejectEvevnt = (e) => {
        e.stopPropagation();
        reject(event.id);
    }
    const datePosting = dayjs((event.createdAt)).format('DD-MM-YYYY');
    const dateStart = dayjs((event.dateStart)).format('DD-MM-YYYY');
    const dateEnd = dayjs((event.dateEnd)).format('DD-MM-YYYY');
    return (
        <div onClick={clickToCard} className={classes.card}>
            <div>
                {event?.medias[0]?.nameMedia && (
                    <img height={'200px'} src={`http://localhost:5000/` + event?.medias[0]?.nameMedia} alt="media"/>)}

            </div>
            <div className={classes.mainDataContainer}>
            <h4>{event.name}</h4>
                <p>Размещенно: {datePosting}</p>
                <p>Проходит с {dateStart} по {dateEnd}</p>
            </div>
            <div className={classes.organizerContainer}>
                <p>От {event.organizer.name}</p>
            </div>
            <div className={classes.buttonContainer}>
                <CustomButton onClick={approveEvevnt}>Одобрить</CustomButton>
                <CustomButton onClick={rejectEvevnt}>Отклонить</CustomButton>
            </div>
        </div>
    );
};

export default ModerationEvent;