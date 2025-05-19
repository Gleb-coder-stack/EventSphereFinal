import React from 'react';
import classes from '../recallCard/RecallCard.module.css'
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {EVENT_PAGE} from "../../../constants/const.js";
const EventCardInProfile = ({event}) => {
    const navigate = useNavigate();
    const dateStart = dayjs((event.dateStart)).format('DD-MM-YYYY');
    const dateEnd = dayjs((event.dateEnd)).format('DD-MM-YYYY');
    const click = () => {
        navigate(EVENT_PAGE.replace(':id', event.id));
    }
    return (
        <div className={classes.card} onClick={click}>
            <p>{event.name}</p>
            <p>{event.address}</p>
            <p>{dateStart}</p>
            <p>{dateEnd}</p>
            <p>{event.status}</p>
        </div>
    );
};

export default EventCardInProfile;