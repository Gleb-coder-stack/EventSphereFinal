import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {getAllRecallsBYEvent} from "../features/API/RecallAPI.js";
import {Context} from "../app/context.js";
import {toast} from "react-toastify";
import MainRecallCard from "../shared/components/cards/recallCard/MainRecallCard.jsx";
import {sendInvite} from "../features/API/FriendsAPI.js";
import classes from '../styles/RecallsPage.module.css'

const RecallsPage = observer(() => {
    const {id} = useParams();
    const {recalls} = useContext(Context);
    useEffect(() => {
        getAllRecallsBYEvent(id).then((data) => {recalls.setRecallsByEvent(data);}).catch(error => (toast.error(error.response.data.message || 'Что-то пошло не так')));
    }, [id])
    const recallsData = recalls.recallsByEvent;
    const addFriendFunc = async (id) => {
        try{
            const result = await sendInvite(id)
            toast.success(result.message)
        }catch(err){
            toast.error(err.response.data.message || 'Что-то пошло не так');
        }
    }
    return (
        <div className={classes.page}>
            <h2>Участники мероприятия</h2>
            <div className={classes.recallsContainer}>
                {recallsData.length > 0 ? (recallsData.map(recall => (<MainRecallCard key={recall.id} recall={recall} addFriend={addFriendFunc}/>))) : <p>Откликнувшихся участников нет</p>}
            </div>
        </div>
    );
});

export default RecallsPage;