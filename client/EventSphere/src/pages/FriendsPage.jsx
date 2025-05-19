import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import PageWithFriendship from "../shared/components/modals/friend/PageWithFriendship.jsx";
import classes from '../styles/friendsPage.module.css'

const FriendsPage = observer(() => {
    const [activeKey, setActiveKey] = useState('Друзья');
    const menu = {
        'Друзья' : <PageWithFriendship type={'Друзья'} />,
        'Заявки в друзья' : <PageWithFriendship type={'Заявки в друзья'}/>,
        'Отклоненные заявки' : <PageWithFriendship type={'Отклоненные заявки'}/>,
        'Мои заявки' : <PageWithFriendship type={'Мои заявки'}/>,
    }
    return (
        <div className={classes.page}>
            <h1>Друзья</h1>
            <div className={classes.navigationContainer}>
                {Object.keys(menu).map((key) => (
                    <button
                        key={key}
                        onClick={() => setActiveKey(key)}

                    >
                        {key}
                    </button>
                ))}
            </div>
            <div>
                {menu[activeKey]}
            </div>
        </div>
    );
});

export default FriendsPage;