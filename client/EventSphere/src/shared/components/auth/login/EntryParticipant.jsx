import React, {useContext, useState} from 'react';
import LoginForm from "../forms/LoginForm.jsx";
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import {loginParticipant} from '../../../../features/API/ParticipantAPI.js'
import {observer} from "mobx-react-lite";
import {Context} from "../../../../app/context.js";
import {useNavigate} from "react-router-dom";
import {HOME_PAGE} from "../../../constants/const.js";
import { toast } from 'react-toastify';
import classes from './loginCom.module.css'

const EntryParticipant = observer(({setRoleToEntry, isRegistration}) => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const dataInForm = async (email, password) => {
        try{
            const data = await loginParticipant({email, password});
            user.setUser(data.id);
            user.setRole(data.role);
            user.setIsAuth(true)
            toast.success(data.message);
            navigate(HOME_PAGE)
        }catch(err){
            toast.error(err?.response?.data?.message || "Что то пошло не так");
        }
    }
    const clickToOrganizer = () => {
        setRoleToEntry('organizer')
    }
    const clickToModerator = () => {
        setRoleToEntry('moderator')
    }
    const clickToRegister = () => {
        isRegistration()
    }
    return (
        <div className={classes.container}>
            <div className={classes.mainContainer}>
                <h2>Вход участника</h2>
                <LoginForm onClickToEntry={dataInForm} idAdmin={false}/>
                <CustomButton onClick={clickToRegister}>Зарегистрироваться</CustomButton>
            </div>

            <div className={classes.buttons}>
                <CustomButton onClick={clickToOrganizer}>Я организатор</CustomButton>
                <CustomButton onClick={clickToModerator}>Я модератор</CustomButton>
            </div>
        </div>
    );
});

export default EntryParticipant;