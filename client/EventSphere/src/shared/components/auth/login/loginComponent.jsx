import React, {useContext, useState} from 'react';
import LoginForm from "../forms/LoginForm.jsx";
import {observer} from "mobx-react-lite";
import EntryDefaultUsers from "./EntryDefaultUsers.jsx";
import EntryOrganizer from "./EntryOrganizer.jsx";
import EntryModerator from "./EntryModerator.jsx";
import classes from './loginCom.module.css'



const LoginComponent = observer(({isRegister, step, setStep, changeDefaultUser, setChangeDefaultUser}) => {

    const [whoIsEntry, setWhoIsEntry] = useState('defaultUser');


    const sharedSteps ={whoIsEntry, setWhoIsEntry, step,  setStep, isRegister, changeDefaultUser, setChangeDefaultUser};

    return (
        <div className={classes.loginComponent}>
            {whoIsEntry === 'defaultUser' && <EntryDefaultUsers {...sharedSteps}  />}
            {whoIsEntry === 'moderator' && <EntryModerator setRoleToEntry={setWhoIsEntry} isRegistration={isRegister}/>}
        </div>
    );
});

export default LoginComponent;