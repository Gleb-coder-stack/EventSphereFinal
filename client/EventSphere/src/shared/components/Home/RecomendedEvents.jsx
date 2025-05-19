import React from 'react';
import classes from './homeContainer.module.css'
import EventCardBome from "../cards/HomePage/EventCardBome.jsx";


const RecomendedEvents = ({events}) => {

    return (
        <div className={classes.container}>
            <div>
                {events.length > 0 ? (
                    events.map((event) => (<EventCardBome key={event.id} event={event}/>))
                ) : <p>Рекомендуемых мероприятий нет</p>}

            </div>
        </div>
    );
};

export default RecomendedEvents;