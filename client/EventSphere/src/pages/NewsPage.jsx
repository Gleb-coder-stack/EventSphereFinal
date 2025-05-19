import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../app/context.js";
import {approveInviteAPI, getInvitesForMe, rejectInviteAPI} from "../features/API/InviteToEventAPI.js";
import {toast} from "react-toastify";
import InviteCard from "../shared/components/cards/Invite/InviteCard.jsx";
import classes from '../styles/InvitesPage.module.css'

const NewsPage = observer(() => {
    const {invite, user} = useContext(Context);
    useEffect(() => {
        getInvitesForMe().then((data) => (invite.setInvitesForMe(data))).catch((error) => (toast.error(error?.response?.data?.message || error?.message || 'Что-то полшло не так')));
        console.log(invite.invitesForMe)
    }, []);
    const approveInvite = async (id) => {
        try{
            const result = await approveInviteAPI(id)
            toast.success(result.message)
        }catch(err){
            toast.error(err.response.data.message || 'Что-то пошло не так');
        }
    }
    const rejectInvite = async (id) => {
        try{
            const result = await rejectInviteAPI(id)
            toast.success(result.message)
        }catch(err){
            toast.error(err.response.data.message || 'Что-то пошло не так');
        }
    }
    return (
        <div className={classes.page}>
            <h1>Приглашения</h1>
            <div className={classes.invitesContainer}>
                {invite.invitesForMe.length > 0 ? (
                    invite.invitesForMe.map((invite) => (<InviteCard key={invite.id} invite={invite} approve={approveInvite} reject={rejectInvite} />))
                ) : <p>Приглашений нет</p>}
            </div>
        </div>
    );
});

export default NewsPage;