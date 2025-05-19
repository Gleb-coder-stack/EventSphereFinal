import React, {useContext, useState} from 'react';
import CustomInput from "../../../UI/Input/CustomInput.jsx";
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import {toast} from "react-toastify";
import {resetPasswordOrganizer} from "../../../../features/API/OrganizerAPI.js";
import {resetPasswordParticipant} from "../../../../features/API/ParticipantAPI.js";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../app/context.js";
import classes from './formStyles.module.css'

const SendEmailToRecoverPassword = observer(({role, nextStep, setStep}) => {
    const [email, setEmail] = useState('');
    const {user} = useContext(Context);
    const click = async (e) => {
        e.preventDefault();
        try{
            let data
            role === 'participant' ? data = await resetPasswordParticipant({email, role}) : data = await resetPasswordOrganizer({email, role})
            toast.info(data.message)
            user.setEmail(email)
            nextStep()
        }catch(e){
            toast.error(e.response.data.message || 'Что то пошло не так');
        }
    }
    const goBack = () => {
        setStep("login");
    }
    return (
        <div className={classes.mainContainer}>
            <form className={classes.formNewPassword}>
                <h2>Восстановление пароля</h2>
                <div className={classes.inputAdnLabel}>
                    <label>Введите почту аккаунта</label>
                    <CustomInput type='email' placeholder='Введите email' value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <CustomButton onClick={click}>Отправить</CustomButton>
                <CustomButton onClick={goBack}>Назад ко входу</CustomButton>
            </form>
        </div>
    );
});

export default SendEmailToRecoverPassword;