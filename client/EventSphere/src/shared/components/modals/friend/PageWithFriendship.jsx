import React, {useContext, useEffect} from 'react';
import {toast} from "react-toastify";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../app/context.js";
import {
    addToFriends, deleteFromFriends,
    getInvitesForMe,
    getMyFriends,
    getMyInvites,
    getRejectedInvites
} from "../../../../features/API/FriendsAPI.js";
import classes from '../../../../styles/friendsPage.module.css'
import RequstCard from "../../cards/friends/friemdsPage/requstCard.jsx";
import RejectCard from "../../cards/friends/friemdsPage/rejectCard.jsx";
import MyRequest from "../../cards/friends/friemdsPage/myRequest.jsx";
import MainFriendCard from "../../cards/friends/friemdsPage/friendCard.jsx";

const PageWithFriendship = observer(({type}) => {
    const {friends} = useContext(Context);
    const loadData = async () => {
        try{
            if(type === 'Друзья'){
                getMyFriends().then(data => {friends.setMyFriends(data)}).catch(error => toast.error(error.response.data.message));
            }
            if(type === 'Заявки в друзья'){
                getInvitesForMe().then(data => {friends.setInvitesForMe(data)}).catch(error => toast.error(error.response.data.message));
            }
            if(type === 'Отклоненные заявки'){
                getRejectedInvites().then(data => {friends.setRejectedInvites(data)}).catch(error => toast.error(error.response.data.message));
            }
            if(type === 'Мои заявки'){
                getMyInvites().then(data => {friends.setMyInvites(data)}).catch(error => toast.error(error.response.data.message));
            }
        }catch(err){
            toast.error(err.response.data.message || 'Что-то пошло не так');
        }
    }
    useEffect(() => {
        loadData()
    }, [type]);
    const dataMap = {
        'Друзья': friends.myFriends,
        'Заявки в друзья': friends.invitesForMe,
        'Отклоненные заявки': friends.rejectedInvites,
        'Мои заявки': friends.myInvites,
    };

    const componentMap = {
        'Друзья': MainFriendCard,
        'Заявки в друзья': RequstCard,
        'Отклоненные заявки': RejectCard,
        'Мои заявки': MyRequest,
    };
    const data = dataMap[type] || [];
    const CardComponent = componentMap[type] || (() => <div>Нет данных</div>);
    const addprove = async(id) => {
        try{
            const result = await addToFriends(id)
            toast.success(result.message)
        }catch(err){
            toast.error(err.response.data.message || 'Что-то пошло не так');
        }
    }
    const reject = async(id) => {
        try{
            const result = await deleteFromFriends(id)
            toast.success(result.message)
        }catch(err){
            toast.error(err.response.data.error || 'Что-то пошло не так');
        }
    }

    return (
        <div className={classes.cardsContainer}>
            <h3>{type}</h3>
            {data.length > 0 ? (
                data.map(item => <CardComponent key={item.id} data={item} deleteFriend={reject} approveRequest={addprove}/>)
            ) : (
                <div>Ничего не найдено</div>
            )}
        </div>
    );
});

export default PageWithFriendship;