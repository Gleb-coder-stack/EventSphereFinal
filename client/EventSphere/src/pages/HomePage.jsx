import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {FAVOURITES_PAGE, NEWS_PAGE, VIEW_HISTORY_PAGE} from "../shared/constants/const.js";
import CustomButton from "../shared/UI/Button/CustomButton.jsx";
import HomeMap from "../shared/components/Home/HomeMap.jsx";
import HomeCardsContainer from "../shared/components/Home/HomeCardsContainer.jsx";
import {toast} from "react-toastify";
import {getAll, getRecommendedEvents} from "../features/API/EventAPI.js";
import {observer} from "mobx-react-lite";
import {Context} from "../app/context.js";
import CustomInput from "../shared/UI/Input/CustomInput.jsx";
import {getAllTags} from "../features/API/TagAPI.js";
import classes from '../styles/HomePage.module.css'
import CreateUpdateEvent from "../shared/components/modals/Event/CreateUpdateEvent.jsx";
import RecomendedEvents from "../shared/components/Home/RecomendedEvents.jsx";

const HomePage = observer(() => {
    const { event, user, tag } = useContext(Context);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('карта');
    const [selectedTagIds, setSelectedTagIds] = useState([]);
    const [searchName, setSearchName] = useState('');

    const menu = {
        'карта': <HomeMap events={event.events} />,
        'список': <HomeCardsContainer events={event.events} />,
        'рекомендуемые': <RecomendedEvents events={event.events}/>
    };
    const [createEvent, setCreateEvent] = useState(false);
    const fetchEvents = () => {
        const isMap = activeTab === 'карта';
        getAll({ isMap, selectedTagIds, name: searchName })
            .then((data) => {
                event.setEvents(data);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || 'Что-то пошло не так');
            });
        user.role === 'participant' && (getRecommendedEvents().then((data) => {event.setRecommendEvent(data)}).catch((err) => {toast.error(err.message)}))
    };

    useEffect(() => {
        fetchEvents();
    }, [activeTab, selectedTagIds, searchName]);

    useEffect(() => {
        getAllTags()
            .then((data) => tag.setTags(data))
            .catch((err) => toast.error(err.message));
    }, []);

    const toggleTag = (tagId) => {
        setSelectedTagIds((prev) =>
            prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
        );
    };

    return (
        <div className={classes.page}>
            <div className={classes.titleContent}>
                <h1>Главная</h1>
                {user.role === 'participant' && (<>
                        <CustomButton onClick={() => navigate(NEWS_PAGE)}>Новости</CustomButton>
                        <CustomButton onClick={() => navigate(VIEW_HISTORY_PAGE)}>История просмотра</CustomButton>
                        <CustomButton onClick={() => navigate(FAVOURITES_PAGE)}>Избранное</CustomButton>
                    </>

                )}
                {user.role === 'organizer' && <CustomButton onClick={() => (setCreateEvent(true))}>Добавить мероприятие</CustomButton>}
            </div>
            <div className={classes.mainContent}>
                <div className={classes.filtersContent}>
                    <h3>Поиск по названию</h3>
                    <CustomInput
                        placeholder="Поиск по названию"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <h3>Выберите теги:</h3>
                    <div>
                        {tag.Tags.map((t) => (
                            <label key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <input
                                    type="checkbox"
                                    value={t.id}
                                    checked={selectedTagIds.includes(t.id)}
                                    onChange={() => toggleTag(t.id)}
                                />
                                {t.Name}
                            </label>
                        ))}
                    </div>
                </div>
                <div className={classes.eventsContainer}>
                    <div className={classes.menuContainer}>
                        {Object.keys(menu).map((key) => (
                            <button key={key} onClick={() => setActiveTab(key)}>
                                {key}
                            </button>
                        ))}
                    </div>
                    <div>{menu[activeTab]}</div>
                </div>
            </div>
            {createEvent && (<CreateUpdateEvent onClose={() => setCreateEvent(false)} />)}
        </div>
    );
});

export default HomePage;