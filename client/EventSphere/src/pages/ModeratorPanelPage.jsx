import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../app/context.js";
import ModerationEvents from "../shared/components/moderation/ModerationEvents.jsx";
import Tags from "../shared/components/moderation/Tags.jsx";
import ModeratorControll from "../shared/components/moderation/ModeratorControll.jsx";
import classes from '../styles/friendsPage.module.css'
import AccreditedComponent from "../shared/components/moderation/AccreditedComponent.jsx";

const ModeratorPanelPage = observer(() => {
    const {user} = useContext(Context)
    const [activeTab, setActiveTab] = useState('Модерация мероприятий');
    const isAdmin = user.role === 'admin';
    const menu = {
        'Модерация мероприятий' : <ModerationEvents />,
        'Панель тегов' : <Tags />,
        'Аккредитации': <AccreditedComponent />,
        ...(isAdmin && {'Управление модераторами' : <ModeratorControll />,})
    }
    return (
        <div className={classes.page}>
            <h1>Модерация</h1>
            <div className={classes.navigationContainer}>
                {Object.keys(menu).map((key) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}

                    >
                        {key}
                    </button>
                ))}
            </div>
            <p>{activeTab}</p>
            <div>
                {menu[activeTab]}
            </div>
        </div>
    );
});

export default ModeratorPanelPage;