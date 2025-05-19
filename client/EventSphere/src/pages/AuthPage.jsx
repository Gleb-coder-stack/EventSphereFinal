import React, {useState} from 'react';
import LoginComponent from "../shared/components/auth/login/loginComponent.jsx";
import RegistrationComponent from "../shared/components/auth/registration/RegistrationComponent.jsx";
import classes from '../styles/authPage.module.css'

const AuthPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [step, setStep] = useState('login');
    const [changeDefaultUser, setChangeDefaultUser] = useState('participant');
    return (
        <div className={classes.page}>
            {!isRegister ? <LoginComponent changeDefaultUser={changeDefaultUser} setChangeDefaultUser={setChangeDefaultUser} step={step} setStep={setStep} isRegister={() => (setIsRegister(true))}/> :
                <RegistrationComponent changeDefaultUser={changeDefaultUser} setChangeDefaultUser={setChangeDefaultUser} setStep={setStep} isRegister={() => (setIsRegister(false))}/>}
        </div>
    );
};

export default AuthPage;