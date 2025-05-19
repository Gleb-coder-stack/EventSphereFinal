import React from 'react';
import EventCardBome from "../cards/HomePage/EventCardBome.jsx";
import classes from './homeContainer.module.css'

const HomeCardsContainer = ({events}) => {

    return (
        <div className={classes.container}>
            <div>
                {events.length > 0 ? (
                    events.map((event) => (<EventCardBome key={event.id} event={event} />))
                ) : <p>Мероприятия не найдены</p>}

            </div>
        </div>
    );
};

export default HomeCardsContainer;