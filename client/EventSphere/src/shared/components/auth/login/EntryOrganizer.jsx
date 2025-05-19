import React, {useContext, useState} from 'react';
import LoginForm from "../forms/LoginForm.jsx";
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import {loginOrganizer} from '../../../../features/API/OrganizerAPI.js'
import {observer} from "mobx-react-lite";
import {Context} from "../../../../app/context.js";
import {useNavigate} from "react-router-dom";
import {HOME_PAGE} from "../../../constants/const.js";
import { toast } from 'react-toastify';
import classes from './loginCom.module.css'

const EntryOrganizer = observer(({setRoleToEntry,isRegistration}) => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const dataInForm = async (email, password) => {
        try{
            const data = await loginOrganizer({email, password});
            user.setUser(data.id);
            user.setRole(data.role);
            user.setIsAuth(true)
            toast.success(data.message);
            navigate(HOME_PAGE)
        }catch(err){
            toast.error(err?.response?.data?.message || "Что то пошло не так");
        }
    }
    const clickToParticipant = () => {
        setRoleToEntry('participant')
    }
    const clickToModerator = () => {
        setRoleToEntry('moderator')
    }
    const clickToRegister = () => {
        isRegistration()
    }
    return (
        <div className={classes.container} >
            <div className={classes.mainContainer}>
                <h2>Вход организатора</h2>
                <LoginForm onClickToEntry={dataInForm} idAdmin={false}/>
                <CustomButton onClick={clickToRegister}>Зарегистрироваться</CustomButton>

            </div>
            <div className={classes.buttons}>
                <CustomButton onClick={clickToParticipant}>Я участник</CustomButton>
                <CustomButton onClick={clickToModerator}>Я модератор</CustomButton>
            </div>
        </div>
    );
});

export default EntryOrganizer;