import React, {useState} from 'react';
import {createFeedback, updateFeedback} from "../../../../features/API/FeedbackAPI.js";
import {toast} from "react-toastify";
import CustomInput from "../../../UI/Input/CustomInput.jsx";
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import ClickToRateStars from "./ClickToRateStars.jsx";
import classes from './FeedbackModal.module.css'

const FeedbackModal = ({oldData, onClose, idOrganizer, trigger}) => {
    const [feedbacksBody, setFeedbacksBody] = useState(oldData?.feedbacksBody || '');
    const [rate, setRate] = useState(Number(oldData?.rate) || 0);


    const updateThisFeedback = async (e) => {
        e.preventDefault();
        try{
            console.log(oldData.id)
            const data = await updateFeedback(oldData.id, {feedbacksBody, rate});
            trigger();
            toast.success(data.message);
            onClose();
        }catch(err){
            toast.error(err?.response?.data?.message || err.message|| 'Что то пошло не так');

        }
    }

    const createThisFeedback = async (e) => {
        e.preventDefault();
        try{
            const data = await createFeedback({feedbacksBody, idOrganizer, rate});
            trigger();
            toast.success(data.message);
            onClose();
        }catch(err){
            toast.error(err.response.data.error || err.response.data.message || 'Что то пошло не так');
        }
    }

    return (
        <div className={classes.modalOverlay}>
            <div className={classes.container}>
                <button onClick={() => onClose()} className={classes.closeBtn}>X</button>
                <form className={classes.form}>
                    <ClickToRateStars setRating={setRate} initialRating={rate}/>
                    <CustomInput type='text' placeholder='Введите текст отзыва' value={feedbacksBody}
                                 onChange={e => setFeedbacksBody(e.target.value)}/>
                    {oldData ? (<CustomButton onClick={(event) => {
                        updateThisFeedback(event)
                    }}>Отредактировать</CustomButton>) : (<CustomButton onClick={(event) => {
                        createThisFeedback(event)
                    }}>Добавить отзыв</CustomButton>)}
                </form>
            </div>

        </div>
    );
};

export default FeedbackModal;