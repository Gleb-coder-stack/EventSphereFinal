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
import SecondFactorForm from "../forms/SecondFactorForm.jsx";
import SendEmailToRecoverPassword from "../forms/SendEmailToRecoverPassword.jsx";
import WriteNewPassword from "../forms/WriteNewPassword.jsx";
import ParticipantOrganizerLogin from "../forms/ParticipantOrganizerLogin.jsx";

const EntryDefaultUsers = observer(({changeDefaultUser, setChangeDefaultUser, setWhoIsEntry, step,  setStep, isRegister}) => {
    const clickToModerator = () => {
        setWhoIsEntry('moderator')
    }
    const clickToRegister = () => {
        isRegister(true)
    }

    const clickToOrganizer = () => {
        setChangeDefaultUser('organizer');
    }
    const clickToParticipant = () => {
        setChangeDefaultUser('participant');
    }
    const emailToResetPasswordIsAccess = () => {
        setStep('newPass')
    }
    const clickToForgotPassword = () => {
        setStep('resetPass')
    }
    return (
        <div className={classes.container}>
            {
                step === 'login' && (<ParticipantOrganizerLogin
                    clickToModerator={clickToModerator}
                    changeDefaultUser={changeDefaultUser}
                    clickToParticipant={clickToParticipant
                } clickToOrganizer={clickToOrganizer}
                    setStep={setStep}
                    isRegister={clickToRegister} clickToForgotPassword={clickToForgotPassword}/>)
            }
            {
                step === '2fa' && (<SecondFactorForm role={changeDefaultUser} />)
            }
            {
                step ==='resetPass' && (<SendEmailToRecoverPassword role={changeDefaultUser} nextStep={emailToResetPasswordIsAccess} setStep={setStep}/>)
            }
            {
                step === 'newPass' && (<WriteNewPassword role={changeDefaultUser}/>)
            }
        </div>
    );
});

export default EntryDefaultUsers;