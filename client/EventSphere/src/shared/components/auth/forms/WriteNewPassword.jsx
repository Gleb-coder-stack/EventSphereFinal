import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../../app/context.js";
import CustomInput from "../../../UI/Input/CustomInput.jsx";
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import {toast} from "react-toastify";
import {setNewPasswordParticipant} from "../../../../features/API/ParticipantAPI.js";
import {setNewPasswordOrganizer} from "../../../../features/API/OrganizerAPI.js";
import classes from './formStyles.module.css'

const WriteNewPassword = observer(({role, setStep}) => {
    const {user} = useContext(Context);
    const email = user.userEmail
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const click = async (e) => {
        e.preventDefault();
        if(password !== repeatPassword) {
            toast.error("Пароли не совпадают");
        }
        let data
        try{
            role === 'participant' ? data = await setNewPasswordParticipant({email, newPassword: password, role}) : data = await setNewPasswordOrganizer({email, newPassword: password, role});
            toast.success(data.message);
            setStep("login");
        }catch(err){
            toast.error(err.response?.data?.message || "Что то пошло не так");
        }
    }

    const goBack = () => {
        setStep("login");
    }
    return (
        <div className={classes.mainContainer}>
            <form className={classes.formNewPassword}>
                <h1>Восстановление пароля {role === 'participant' ? 'участника' : 'организатора'}</h1>
                <h2>Укажите новый пароль для аккаунта {email} </h2>
                <div className={classes.inputAdnLabel}>
                    <label>Введите новый пароль</label>
                    <CustomInput type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={classes.inputAdnLabel}>
                    <label>Подтвердите пароль</label>
                    <CustomInput type='password' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
                </div>
                <CustomButton onClick={click}>Подтвердить</CustomButton>
                <CustomButton onClick={goBack}>Назад ко входу</CustomButton>
            </form>
        </div>
    );
});

export default WriteNewPassword;