import React from 'react';
import dayjs from "dayjs";
import classes from './ModerEvent.module.css'
import CustomButton from "../../../UI/Button/CustomButton.jsx";

const AccreditadeCard = ({data, onAccept, onReject}) => {
    const accept = () => {
        onAccept(data.id);
    }
    const reject = () => {
        onReject(data.id);
    }
    const datePosting = dayjs((data.createdAt)).format('DD-MM-YYYY');
    return (
        <div className={classes.card}>
            <div className={classes.fileAndLinks}>
                {data?.filename && (
                    <img height={'200px'} src={`http://localhost:5000/` + data?.filename} alt="file"/>)}
                {
                    data.links && (<p>Ссылки: {data.links}</p>)
                }

            </div>
            <div className={classes.mainDataContainer}>
                <h4>{data.accreditations.name}</h4>
                <p>Размещенно: {datePosting}</p>
            </div>
            <div className={classes.organizerContainer}>
                <p>Статус: {data.status}</p>
            </div>
            <div className={classes.buttonContainer}>
                {data.status === 'pending' && (
                    <>
                        <CustomButton onClick={accept}>Одобрить</CustomButton>
                        <CustomButton onClick={reject}>Отклонить</CustomButton></>
                )}
            </div>
        </div>
    );
};

export default AccreditadeCard;