import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {applyAcc, getAllAcc, rejectAcc} from "../../../features/API/RequestAccredited.js";
import {Context} from "../../../app/context.js";
import {toast} from "react-toastify";
import classes from './moderEvent.module.css'
import AccreditadeCard from "../cards/moderator/AccreditadeCard.jsx";

const AccreditedComponent = observer(() => {
    const [trigger, setTrigger] = useState(false);
    const {request} = useContext(Context)
    useEffect(() => {
        getAllAcc().then((acc) => (request.setModerationRequests(acc))).catch((err) => (toast.error(err.message)))
    },[trigger]);
    const approveAcc = async (id) => {
        try{
            const result = await applyAcc(id)
            toast.success(result.message)
            setTrigger(!trigger)
        }catch(err){
            toast.error(err.response.data.message || 'Что-то пошло не так');
        }
    }
    const rejectAccFunc = async (id) => {
        try{
            const result = await rejectAcc(id)
            toast.success(result.message)
            setTrigger(!trigger)
        }catch(err){
            toast.error(err.response.data.message || 'Что-то пошло не так');
        }
    }
    return (
        <div className={classes.containeer}>
            {request.moderationRequests.length > 0 ? (
                request.moderationRequests.map((moderationReq) => (<AccreditadeCard key={moderationReq.id} data={moderationReq} onReject={rejectAccFunc} onAccept={approveAcc} onCancel={rejectAccFunc} />

                ))
            ) : <p>Заявки на аккредитацию не найдены</p>}
        </div>
    );
});

export default AccreditedComponent;