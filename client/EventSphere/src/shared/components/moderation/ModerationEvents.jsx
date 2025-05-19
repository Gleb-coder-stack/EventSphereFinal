import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../app/context.js";
import {applyModerEvent, getModeration, rejectModerEvent} from "../../../features/API/EventAPI.js";
import {toast} from "react-toastify";
import ModerationEvent from "../cards/moderator/ModerationEvent.jsx";
import classes from './moderEvent.module.css'

const ModerationEvents = observer(() => {
    const {event} = useContext(Context)
    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        getModeration().then((data) => (event.setModerationEvents(data))).catch((error) => (toast.error(error.message)));
    }, [trigger]);
    const approveEvevnt = async (id) => {
        try{
            const result = await applyModerEvent(id)
            toast.success(result.message)
            setTrigger(!trigger)
        }catch(err){
            toast.error(err.response.data.message || 'Что-то пошло не так');
        }
    }
    const rejectEvevnt = async (id) => {
        try{
            const result = await rejectModerEvent(id)
            toast.success(result.message)
            setTrigger(!trigger)
        }catch(err){
            toast.error(err.response.data.message || 'Что-то пошло не так');
        }
    }
    return (
        <div className={classes.containeer}>
            {event.moderationEvents.length > 0 ? (
                event.moderationEvents.map((moderationEvent) => (<ModerationEvent key={moderationEvent.id} event={moderationEvent} approve={approveEvevnt} reject={rejectEvevnt} />))
            ) : <p>Мероприятий на модерации нет</p>}
        </div>
    );
});

export default ModerationEvents;