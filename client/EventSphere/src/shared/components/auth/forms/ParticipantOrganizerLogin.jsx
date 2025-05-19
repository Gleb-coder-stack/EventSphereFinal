import React, {useContext, useState} from 'react';
import LoginForm from "./LoginForm.jsx";
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import {toast} from "react-toastify";
import {loginParticipant} from "../../../../features/API/ParticipantAPI.js";
import {loginOrganizer} from "../../../../features/API/OrganizerAPI.js";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../app/context.js";
import classes from '../login/loginCom.module.css'

const ParticipantOrganizerLogin = observer(({
                                     isRegister,
                                     setStep,
                                                clickToOrganizer,
                                     clickToModerator,
                                                clickToParticipant,
                                     clickToForgotPassword,
                                                changeDefaultUser       }) => {
    const {user} = useContext(Context);


    const rendersButtons = () => {
        switch(changeDefaultUser) {
            case 'participant': return <> <CustomButton onClick={() => (clickToOrganizer())}>Я организатор</CustomButton>
                <CustomButton onClick={() => (clickToModerator())}>Я модератор</CustomButton></>
            case 'organizer': return <> <CustomButton onClick={() => (clickToParticipant())}>Я участник</CustomButton>
                <CustomButton onClick={() => (clickToModerator())}>Я модератор</CustomButton></>
        }
    }
    const entryIsParticipant = () => {
        return changeDefaultUser === 'participant'
    }
    const dataInForm = async (email, password) => {
        let data
        try{
            const resCheck = entryIsParticipant()
            console.log(resCheck)
            resCheck ? data = await loginParticipant({email, password}) : data = await loginOrganizer({email, password})
            console.log('data')
            user.setEmail(data.email)
            toast.info(data.message)
            setStep('2fa')
        }catch(err){
            toast.error(err.response?.data?.message || 'Что то пошло не так')
        }
    }
    const clickToRegister = () => {
        isRegister()
    }
    return (
        <div>
            <div className={classes.mainContainer}>
                <h2>Вход {changeDefaultUser === 'participant' ? 'учатсника' : 'организатора'}</h2>
                <LoginForm onClickToEntry={dataInForm} idAdmin={false}/>
                <CustomButton onClick={clickToRegister}>Зарегистрироваться</CustomButton>
                <CustomButton onClick={clickToForgotPassword}>Забыли пароль?</CustomButton>
            </div>
            <div className={classes.buttons}>
                {rendersButtons()}
            </div>
        </div>
    );
});

export default ParticipantOrganizerLogin;