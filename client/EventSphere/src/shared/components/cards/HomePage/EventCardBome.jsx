import React from 'react';
import classes from "../moderator/ModerEvent.module.css";
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {EVENT_PAGE} from "../../../constants/const.js";


const EventCardBome = ({event}) => {
    const navigate = useNavigate();
    const datePosting = dayjs((event.createdAt)).format('DD-MM-YYYY');
    const dateStart = dayjs((event.dateStart)).format('DD-MM-YYYY');
    const dateEnd = dayjs((event.dateEnd)).format('DD-MM-YYYY');
    const click = () => {
        navigate(EVENT_PAGE.replace(':id', event.id));
    }
    return (
        <div className={classes.card} onClick={click}>
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
        </div>
    );
};

export default EventCardBome;