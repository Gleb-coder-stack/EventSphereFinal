import React, {useContext, useState} from 'react';
import LoginForm from "../forms/LoginForm.jsx";
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import {loginModerator} from '../../../../features/API/ModeratorAPI.js'
import {observer} from "mobx-react-lite";
import {Context} from "../../../../app/context.js";
import {useNavigate} from "react-router-dom";
import {HOME_PAGE} from "../../../constants/const.js";
import { toast } from 'react-toastify';
import {loginOrganizer} from "../../../../features/API/OrganizerAPI.js";
import classes from './loginCom.module.css'

const EntryModerator = observer(({setRoleToEntry, isRegistration}) => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const dataInForm = async (email, password) => {
        try{
            const data = await loginModerator({login:email, password});
            user.setUser(data.token.id);
            user.setRole(data.token.role);
            user.setIsAuth(true)
            toast.success(data.message);
            navigate(HOME_PAGE)
        }catch(err){
            toast.error(err?.response?.data?.message || "Что то пошло не так");
        }
    }
    const clickToAnotherUser = () => {
        setRoleToEntry('defaultUser')
    }
    const clickToRegister = () => {
        isRegistration()
    }
    return (
        <div className={classes.container}>
            <div className={classes.mainContainer}>
                <h2>Вход модератора</h2>
                <LoginForm onClickToEntry={dataInForm} idAdmin={true}/>
                <CustomButton onClick={clickToRegister}>Зарегистрироваться</CustomButton>
            </div>
            <div className={classes.buttons}>
                <CustomButton onClick={clickToAnotherUser}>Я участник</CustomButton>
                <CustomButton onClick={clickToAnotherUser}>Я организатор</CustomButton>
            </div>
        </div>
    );
});

export default EntryModerator;