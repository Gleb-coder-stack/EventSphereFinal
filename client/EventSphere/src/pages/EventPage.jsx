import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../app/context.js";
import {
    changeStatusEvent,
    deleteEvent,
    finishEvent,
    getEventById,
    getEventOfModer,
    startEvent
} from "../features/API/EventAPI.js";
import {toast} from "react-toastify";
import TagCard from "../shared/components/cards/Tag/TagCard.jsx";
import {HOME_PAGE, RECALLS_PAGE} from "../shared/constants/const.js";
import dayjs from "dayjs";
import classes from '../styles/EventPage.module.css'
import EventMediaCard from "../shared/components/cards/Event/EventMediaCard.jsx";
import CustomButton from "../shared/UI/Button/CustomButton.jsx";
import {sendRecalls} from "../features/API/RecallAPI.js";
import {getMyFriends} from "../features/API/FriendsAPI.js";
import ModalWithMyFriends from "../shared/components/modals/friend/ModalWithMyFriends.jsx";
import CreateUpdateEvent from "../shared/components/modals/Event/CreateUpdateEvent.jsx";
import {getStats, viewEvent} from "../features/API/StatsAPI.js";
import {addToHistory} from "../features/API/ViewHistoryAPI.js";
import {addToFavourites} from "../features/API/FavouritesAPI.js";


const EventPage = observer(() => {
    const {event, user, friends, stats} = useContext(Context);
    const navigate = useNavigate();
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [trigger, setTrigger] = useState(false);
    const [modalInvite, setModalInvite] = useState(false);
    const [createEvent, setCreateEvent] = useState(false);
    useEffect(() => {
        viewEvent(id);
        getStats(id).then(data => (stats.setStats(data))).catch(err => toast.error(err.message));
        user.role === 'participant' && addToHistory(id)
    }, []);
    useEffect(() => {
        user.role !== 'admin' && user.role !== 'moderator' ? (getEventById(id).then((data) => {event.setEventById(data)}).catch(err => {
            toast.error(err?.response?.data?.message || "Что-то пошло не так при загрузке мероприятия");
            setIsLoading(false);
            navigate(HOME_PAGE);
        }).finally(() => {setIsLoading(false)})) : (getEventOfModer(id).then((data) => {event.setEventById(data)}).catch(err => {
            toast.error(err?.response?.data?.message || "Что-то пошло не так при загрузке мероприятия");
            setIsLoading(false);
            navigate(HOME_PAGE);
        }).finally(() => {setIsLoading(false)}));
    }, [id, trigger]);
    if(isLoading) {
        return <p>Загрузка мероприятия...</p>
    }
    const eventData = event.eventByIdId
    const DateStart  = dayjs((eventData.dateStart)).format('DD-MM-YYYY');
    const DateEnd  = dayjs((eventData.dateEnd)).format('DD-MM-YYYY');
    const clickToRecall = () => {
        navigate(RECALLS_PAGE.replace(':id', id));
    }
    const changeStatus = async() => {
        try{
            const result = await changeStatusEvent(id);
            setTrigger(!trigger);
            toast.success(result.message);
        }catch(err){
            toast.error(err.response.data.message);
        }
    }
    const startEventFunc = async() => {
        try{
            const result = await startEvent(id);
            setTrigger(!trigger);
            toast.success(result.message);
        }catch(err){
            toast.error(err.response.data.message);
        }
    }
    const finishEventFunc = async() => {
        try{
            const result = await finishEvent(id);
            setTrigger(!trigger);
            toast.success(result.message);
        }catch(err){
            toast.error(err.response.data.message);
        }
    }
    const deleteEventFunc = async() => {
        try{
            const result = await deleteEvent(id);
            setTrigger(!trigger);
            toast.success(result.message || 'Мероприятие удалено');
        }catch(err){
            toast.error(err.response.data.message);
        }
    }
    const recall = async() => {
        try{
            const result = await sendRecalls(id);
            setTrigger(!trigger);
            toast.success(result.message);
        }catch(err){
            toast.error(err.response.data.message);
        }
    }
    const openInviteModal = async () => {
        try{
            await getMyFriends().then((data) => {friends.setMyFriends(data)}).catch(err => {toast.error(err.response.data.message || 'Что то пошло не так')});

            setModalInvite(true);
        }catch (err){
            toast.error(err.response.data.message || 'Что-то пошло не так');
        }
    }
    const addToFavouriteClick = async () => {
        try{
            const data = await addToFavourites({idEvent: id})
            toast.success(data.message)
        }catch(err){
            toast.error(err.response.data.message || 'Что-то пошло не так');
        }
    }
    return (
        <div className={classes.page}>
            <div className={classes.mainData}>
                <div className={classes.organizerAndStatus}>
                    <h1>{eventData.name}</h1>
                    <p>Мероприятие проходит с {DateStart} по {DateEnd}</p>
                </div>

                <div className={classes.organizerAndStatus}>
                    <p>Разместил: {eventData?.organizer?.name}</p>
                    <p>Статус: {eventData.status}</p>
                </div>
            </div>
            <div className={classes.mediaContainer}>
                {eventData?.medias?.length > 0 ? (
                    eventData?.medias?.map((media) => (<EventMediaCard key={media.id} image={media} />))
                ) : null}
            </div>
            <div className={classes.otherData}>
                <p>Теги:</p>
                <div className={classes.tagsContainer}>
                    {eventData?.tags?.length > 0 ? (eventData?.tags?.map(tag => (
                        <TagCard key={tag.id} Tag={tag}/>))) : null}
                </div>
                <p>{eventData.description}</p>
                <p>В избранном: {stats.stats.favourites}</p>
                <p>Просмотров: {stats.stats.views}</p>
                <p>Участвует: {stats.stats.count}</p>
            </div>
            <div className={classes.buttonsContainer}>
                <CustomButton onClick={clickToRecall}>Посмотреть участников</CustomButton>
                {user.role === 'participant' && (<><CustomButton onClick={recall}>Принять участие</CustomButton>
                    <CustomButton onClick={openInviteModal}>Пригласить друзей</CustomButton>
                <CustomButton onClick={addToFavouriteClick}>Добавить в избранное</CustomButton>
                </>)}
                {(user.role === 'organizer' && user.user === eventData?.idOrganizer) && (<>
                    <CustomButton onClick={changeStatus}>Изменить статус</CustomButton>
                    <CustomButton onClick={startEventFunc}>Начать событие</CustomButton>
                    <CustomButton onClick={finishEventFunc}>Закончить событие</CustomButton>
                    <CustomButton onClick={() => (setCreateEvent(true))}>Редактировать событие</CustomButton>
                    <CustomButton onClick={deleteEventFunc}>Удалить событие</CustomButton>
                </>)}
            </div>
            {modalInvite && (<ModalWithMyFriends friends={friends.myFriends} onClose={() => setModalInvite(false)} idEvent={id}/>)}
            {createEvent && (<CreateUpdateEvent oldData={eventData} onClose={() => setCreateEvent(false)} />)}
        </div>
    );
});


export default EventPage;