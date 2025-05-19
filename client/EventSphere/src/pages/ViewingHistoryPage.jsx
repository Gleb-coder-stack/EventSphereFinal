import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../app/context.js";
import {getHistory} from "../features/API/ViewHistoryAPI.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {EVENT_PAGE} from "../shared/constants/const.js";
import ViewHistoryCard from "../shared/components/cards/ViewHistory/ViewHistoryCard.jsx";
import classes from '../styles/friendsPage.module.css'

const ViewingHistoryPage = observer(() => {
    const {viewHistory} = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        getHistory().then((data) => {viewHistory.setViewHistory(data)}).catch((err) => (toast.error(err.message)));
    }, []);
    const clickToCard = (id) => {
        navigate(EVENT_PAGE.replace(':id', id));
    }
    return (
        <div>
            <h1>История просмотра</h1>
            <div>
                {
                    viewHistory.getViewHistory.length > 0 ? (
                        viewHistory.getViewHistory.map((viewHistory) => (
                            <ViewHistoryCard onClickToCard={clickToCard} key={viewHistory.id} history={viewHistory} />
                        ))
                    ) : (<p>История просмотра пустая</p>)
                }
            </div>
        </div>
    );
});

export default ViewingHistoryPage;