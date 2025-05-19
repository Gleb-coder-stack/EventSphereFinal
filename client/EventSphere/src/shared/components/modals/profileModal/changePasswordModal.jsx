import React, {useState} from 'react';
import CustomInput from "../../../UI/Input/CustomInput.jsx";
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import { toast } from 'react-toastify';
import classes from './updateModal.module.css'
import {changePasswordParticipant} from "../../../../features/API/ParticipantAPI.js";
import {changePasswordOrganizer} from "../../../../features/API/OrganizerAPI.js";


const ChangePasswordModal = ({role, onClose}) => {
    const [oldPassword, setOldPassword] = useState( '');
    const [newPassword, setNewPassword] = useState(  null);

    const saveChange = async (e) => {
        e.preventDefault();
        try{
            if(role === 'participant'){
                const result = await changePasswordParticipant({oldPassword, newPassword});
                toast.success(result.message);
                onClose();
            }
            if(role === 'organizer'){
                const result = await changePasswordOrganizer({oldPassword, newPassword});
                toast.success(result.message);
                onClose();
            }
        }catch(err){
            toast.error(err.response.data.message || 'Ошибка при смене пароля');
        }
    }

    return (
        <div className={classes.modalOverlay}>
            <div className={classes.container}>
                <button onClick={() => onClose()} className={classes.closeBtn}>X</button>
                <form className={classes.form}>
                    <label>Старый пароль</label>
                    <CustomInput type="password" placeholder='Введите старый пароль' value={oldPassword}
                                 onChange={(e) => setOldPassword(e.target.value)}/>
                    <label>Новый пароль</label>
                    <CustomInput type="password" placeholder='Введите новый пароль' value={newPassword}
                                 onChange={(e) => setNewPassword(e.target.value)}/>
                    <CustomButton onClick={(event) => {
                        saveChange(event)
                    }}>Сохранить</CustomButton>
                </form>
            </div>
        </div>
    );
};


export default ChangePasswordModal;