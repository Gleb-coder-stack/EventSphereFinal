import React, {useState} from 'react';
import dayjs from "dayjs";
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import classes from './FeedbackCard.module.css'
import RateStars from "./RateStars.jsx";
import FeedbackModal from "../../modals/Feedback/FeedbackModal.jsx";

const FeedbackCard = ({id, role, feedback, onDelete, trigger}) => {
    const [update, setUpdate] = useState(false);
    const dateCreate = dayjs((feedback.createdAt)).format('DD-MM-YYYY');
    const dateUpdate = dayjs((feedback.updatedAt)).format('DD-MM-YYYY');

    const checkToRedact = () => {
        if (role === 'participant' && Number(id) === Number(feedback.idParticipant)) {
            return (
                <>
                    <CustomButton onClick={() => {setUpdate(true)}}>Редактировать отзыв</CustomButton>
                    <CustomButton onClick={() => {onDelete(feedback.id)}}>Удалить отзыв</CustomButton>
                </>
            )
        }
        return null
    }
    const needModal = () => {
        if(role === 'participant' && Number(id) === Number(feedback.idParticipant)) {
            return (
                <>
                    {update ? (<FeedbackModal trigger={trigger} oldData={feedback} onClose={() => {setUpdate(false)}}/>) : null}
                </>
            )
        }
        return null
    }

    return (
        <div className={classes.card}>
            <div className={classes.firstContainer}>
                <div className={classes.title}>
                    <img height={100} width={100} style={{borderRadius: '50%'}}
                         src={`http://localhost:5000/` + feedback?.participant?.logo} alt={feedback.participant.nickname || "Фото"}/>
                    <h3>{feedback.participant.nickname}</h3>
                    <RateStars rate={feedback.rate}/>
                </div>
                <div className={classes.mainDataContainer}>
                    <p>{feedback.feedbacksBody}</p>
                </div>
            </div>

            <div className={classes.mainDataContainer}>
                <div className={classes.firstContainer}>
                    <p>{feedback.description}</p>
                    <p>Размещен: {dateCreate}</p>
                    <p>Последнее обновление: {dateUpdate}</p>
                </div>

                <div className={classes.buttonsContainer}>
                {checkToRedact()}
                </div>
            </div>
            {needModal()}
        </div>
    );
};

export default FeedbackCard;