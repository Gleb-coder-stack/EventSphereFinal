import React, {useContext, useEffect, useState} from 'react';
import CustomButton from "../shared/UI/Button/CustomButton.jsx";
import {observer} from "mobx-react-lite";
import {clearFavourites, deleteFavourById, getMyFavourites} from "../features/API/FavouritesAPI.js";
import {Context} from "../app/context.js";
import {toast} from "react-toastify";
import FavouriteCard from "../shared/components/cards/Favourite/FavouriteCard.jsx";
import {useNavigate} from "react-router-dom";
import {EVENT_PAGE} from "../shared/constants/const.js";
import classes from '../styles/friendsPage.module.css'

const FavouritesPage = observer(() => {
    const {favourite} = useContext(Context);
const [trigger, setTrigger] = useState(false);
const navigate = useNavigate();
    useEffect(() => {
        getMyFavourites().then((favourites) => (favourite.setMYFavourite(favourites))).catch((err) => toast.error(err.message));
    }, [trigger]);

    const deleteFavour = async (id) => {
        try{
            const data = await deleteFavourById(id)
            toast.success(data.message)
            setTrigger(!trigger)
        }catch(err){
            toast.error(err.response.data.message || 'Что-то пошло не так');
        }
    }
    const clean = async () => {
        try {
            const data = await clearFavourites()
            toast.success(data.message)
            setTrigger(!trigger)
        }catch(err){
            toast.error(err.response.data.message || 'Что-то пошло не так');
        }
    }

    const clickToCard = (id) => {
        console.log(id)
        navigate(EVENT_PAGE.replace(':id', id))
    }
    return (
        <div className={classes.page}>
            <div className={classes.navigationContainer}>
                <h1>Ваши избранные мероприятия</h1>
                <CustomButton onClick={clean}>Очистить все</CustomButton>
            </div>
            <div className={classes.cardsContainer}>
                {
                    favourite.myFavourites.length > 0 ? (
                        favourite.myFavourites.map((favourite) => (
                            <FavouriteCard favourite={favourite} key={favourite.id} onDelete={deleteFavour} onClick={clickToCard}/>
                        ))
                    ) : (<p>Избранных мероприятий пока нет</p>)
                }
            </div>

        </div>
    );
})


export default FavouritesPage;