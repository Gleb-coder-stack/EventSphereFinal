import React, {useContext} from 'react';
import {Context} from "../../../../app/context.js";
import {useNavigate} from "react-router-dom";
import {registration} from "../../../../features/API/ParticipantAPI.js";
import {toast} from "react-toastify";
import {HOME_PAGE} from "../../../constants/const.js";
import {observer} from "mobx-react-lite";
import RegistrationForm from "../forms/registrationForm.jsx";
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import classes from '../login/loginCom.module.css'

const RegistrationParticipant = observer(({setRoleToEntry, isLogin, isAccess}) => {
    const {user} = useContext(Context);
    const dataInForm = async (nickname, email, password) => {
        try{
            const data = await registration({nickname, email, password});
            user.setEmail(data.email)
            toast.info(data.message);
            isAccess('participant');
        }catch(err){
            toast.error(err?.response?.data?.message || "Что то пошло не так");
        }
    }
    const clickToOrganizer = () => {
        setRoleToEntry('organizer')
    }
    const clickToLogin = () => {
        isLogin()
    }
    return (
        <div className={classes.container}>
            <div className={classes.mainContainer}>
                <h2>Регистрация учатсника</h2>
                <RegistrationForm onClickToEntry={dataInForm}/>
            </div>
            <div className={classes.buttons}>
                <CustomButton onClick={clickToOrganizer}>Регистрация организатора</CustomButton>
                <CustomButton onClick={clickToLogin}>Назад ко входу</CustomButton>
            </div>
        </div>
    );
});

export default RegistrationParticipant;