import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../app/context.js";
import {
    createModerator,
    deleteModerator,
    getModeratorsAPI,
    updateModerator
} from "../../../features/API/ModeratorAPI.js";
import {toast} from "react-toastify";
import CustomButton from "../../UI/Button/CustomButton.jsx";
import ModeratorCard from "../cards/moderator/ModeratorCard.jsx";
import ModeratorModal from "../modals/moderator/ModeratorModal.jsx";
import classes from './moderEvent.module.css'


const ModeratorControll = observer(() => {
    const {moderator} = useContext(Context);
    const [trigger, setTrigger] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [moderForUpdate, setModerForUpdate] = useState(undefined);
    useEffect(() => {
        getModeratorsAPI().then(moderators =>( moderator.setAllModers(moderators))).catch(error => (toast.error(error.message)));
    }, [trigger]);
    const deleteModeratorFromCard = async (moderatorId) => {
        try{
            const result = await deleteModerator(moderatorId)
            toast.success(result.message)
            setTrigger(!trigger)
        }catch(err){
            toast.error(err.response.data.message || 'Что то пошло не так');
        }
    }
    const updateModerInCard = (moder) => {
        setModerForUpdate(moder);
        setIsUpdate(true);
    }
    const updateModerFunc = async (id, login, password) => {
        try{
            const result = await updateModerator(id, {login, password});
            toast.success(result.message)
            setTrigger(!trigger);
        }catch (err){
            toast.error(err.response.data.message || 'Что то пошло не так')
        }
    }
    const createModerFunc = async (login, password) => {
        try{
            const result = await createModerator({login, password});
            toast.success(result.message)
            setTrigger(!trigger);
        }catch (err){
            toast.error(err.response.data.message || 'Что то пошло не так')
        }
    }
    return (
        <div className={classes.containeer}>
            <div>
                <CustomButton onClick={() => (setIsUpdate(true))}>Создать модератора</CustomButton>
            </div>
            <div className={classes.modersContainer}>
                {moderator.allModers.length > 0 ? (
                    moderator.allModers.map(moderatorData => (<ModeratorCard key={moderatorData.id} moderator={moderatorData} update={updateModerInCard} deleteFunc={deleteModeratorFromCard} />))
                ) : <p>Модераторы не найдены</p>}
            </div>
            {isUpdate && (<ModeratorModal oldData={moderForUpdate} onClose={() => setIsUpdate(false)} create={createModerFunc} update={updateModerFunc} />)}
        </div>
    );
});

export default ModeratorControll;