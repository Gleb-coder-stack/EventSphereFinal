import React, {useCallback, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import { toast } from 'react-toastify';
import {changeConfidentialParticipant, getById, getMe} from "../../../features/API/ParticipantAPI.js";
import {Context} from "../../../app/context.js";
import CustomButton from "../../UI/Button/CustomButton.jsx";
import dayjs from "dayjs";
import sendInviteIcon from '../../../assets/sendInvitetoFriend.png';
import RecallCard from "../cards/recallCard/RecallCard.jsx";
import classes from './profile.module.css'
import UpdateParticipantProfileModal from "../modals/profileModal/updateParticipantProfileModal.jsx";
import {useNavigate} from "react-router-dom";
import {FRIENDS_PAGE} from "../../constants/const.js";
import {sendInvite} from "../../../features/API/FriendsAPI.js";
import ChangePasswordModal from "../modals/profileModal/changePasswordModal.jsx";

const ParticipantProfile = observer(({isMy, id}) => {
    const { participant, user } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const [update, setUpdate] = useState(false);
    const [pass, setPass] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (isMy) {
            getMe()
                .then(res => {
                    participant.setMyProfile(res.participant); // или res, если так
                    setIsLoading(false);
                })
                .catch(err => {
                    toast.error(err?.response?.data?.message || "Что-то пошло не так при загрузке профиля");
                    setIsLoading(false);
                });
        } else {
            getById(id)
                .then(res => {
                    participant.setAnotherProfile(res.participant); // или res
                    setIsLoading(false);
                })
                .catch(err => {
                    toast.error(err?.response?.data?.message || "Не удалось загрузить профиль участника");
                    setIsLoading(false);
                });
        }
    }, [id, isMy, participant, trigger]);
    const participantData = isMy ? participant.myProfile : participant.anotherProfile;

    if (isLoading || !participantData) {
        return <div>Загрузка профиля...</div>;
    }
    const clickToAddFriend = async () => {
        try{
            await sendInvite(id).then(res=>{toast.success(res.message)}).catch(err=>{toast.error(err?.response?.data?.message || "Ошибка при добалвении в друзья");})
        }catch (err){
            toast.error(err?.response?.data?.message || "Ошибка при добалвении в друзья");
        }
    }
    const changeConf = async () => {
        try{
            await changeConfidentialParticipant().then(res=>{toast.success(res.message)}).catch(err=>{toast.error(err?.response?.data?.message || "Ошибка при смене статуса");})
            setTrigger(!trigger);
        }catch (err){
            toast.error(err?.response?.data?.message || "Ошибка при смене статуса");
        }
    }
    const dateCreate = dayjs((participantData.createdAt)).format('DD-MM-YYYY');
    return (
        <div className={classes.container}>
            <div>
                <h2>Профиль участника</h2>
            </div>
            <div className={classes.page}>
                <div className={classes.logoContainer}>
                    <img height={200} width={200} style={{borderRadius: '50%'}}
                         src={`http://localhost:5000/` + participantData?.logo} alt={participant.nickname || "Фото"}/>
                    {participantData?.isConfidential ? <p>Открытый профиль</p> : <p>Закрытый профиль</p>}
                    {participantData.address ? <p>{participantData.address}</p> : null}
                    {isMy ? <>
                        <CustomButton onClick={() => (setUpdate(true))}>Редактировать</CustomButton>
                        <CustomButton onClick={() => (setPass(true))}>Сменить пароль</CustomButton>
                        <CustomButton onClick={changeConf}>Изменить конфиденциальность</CustomButton>
                        <CustomButton onClick={() => (navigate(FRIENDS_PAGE))}>Друзья</CustomButton> </> : null}

                </div>
                <div >
                    <div className={classes.nameContainer}>
                        <div className={classes.nameElement}>
                            <h3>{participantData.nickname || 'Имя'}</h3>
                            <p>на сайте с: <i>{dateCreate}</i></p>
                        </div>
                        <div className={classes.nameElement}>
                            <p>Список мероприятий</p>
                            {!isMy && (
                                <img onClick={clickToAddFriend} height={40} width={40} src={sendInviteIcon} alt="Добавить друга"/>
                            )}
                        </div>
                    </div>
                    <div className={classes.cardsContainer}>
                        {participantData.recalls?.length > 0 ? (
                            participantData.recalls?.map(recall => (
                                <RecallCard key={recall.id} recall={recall}/>
                            ))
                        ) : (
                            isMy
                                ? <p>Откликов пока нет</p>
                                : <p>Участник скрыл свои отклики</p>
                        )}
                    </div>
                </div>
            </div>
            {update && (<UpdateParticipantProfileModal trigger={() => setTrigger(!trigger)} onClose={() => setUpdate(false)} oldData={participantData}/>)}
            {pass && (<ChangePasswordModal onClose={() => (setPass(false))} role={user.role}/>)}
        </div>
    );
});

export default ParticipantProfile;