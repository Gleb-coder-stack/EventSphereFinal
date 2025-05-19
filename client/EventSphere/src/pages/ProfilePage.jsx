import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {useLocation, useSearchParams} from "react-router-dom";
import {Context} from "../app/context.js";
import ParticipantProfile from "../shared/components/profile/ParticipantProfile.jsx";
import OrganizerProfile from "../shared/components/profile/OrganizerProfile.jsx";
import classes from '../styles/profilePage.module.css'

const ProfilePage = observer(() => {
    const location = useLocation();
    const {user} = useContext(Context);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const type = searchParams.get('type');
    return (
        <div className={classes.page}>
            {location.pathname  === '/my-profile' ? ((user.role === 'participant' ? (<ParticipantProfile isMy={true} />) : (<OrganizerProfile isMy={true} />))) : (id && type && (type === 'participant' ? (<ParticipantProfile isMy={false} id={id}/>) : (<OrganizerProfile isMy={false} id={id}/>)))}
        </div>
    );
});

export default ProfilePage;