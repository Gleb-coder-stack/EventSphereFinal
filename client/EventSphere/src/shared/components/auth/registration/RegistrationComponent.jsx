import React, {useState} from 'react';

import RegistrationParticipant from "./RegistrationParticipant.jsx";
import RegistrationOrganizer from "./RegistrationOrganizer.jsx";
import classes from '../login/loginCom.module.css'

const RegistrationComponent = ({isRegister, setStep, changeDefaultUser, setChangeDefaultUser}) => {
    const [whoIsEntry, setWhoIsEntry] = useState('participant');
    const registrationIsAccess = (role) => {
        isRegister()
        setStep('2fa')
        setChangeDefaultUser(role)
    }
    return (
        <div  className={classes.loginComponent}>
            {whoIsEntry === 'participant' &&
                <RegistrationParticipant setRoleToEntry={setWhoIsEntry} isLogin={isRegister} isAccess={registrationIsAccess} />}
            {whoIsEntry === 'organizer' && <RegistrationOrganizer setRoleToEntry={setWhoIsEntry} isLogin={isRegister} isAccess={registrationIsAccess}/>}
        </div>
    );
};

export default RegistrationComponent;