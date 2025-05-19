import React, {useState} from 'react';
import CustomInput from "../../../UI/Input/CustomInput.jsx";
import {updateParticipant} from "../../../../features/API/ParticipantAPI.js";
import { toast } from 'react-toastify';
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import classes from './updateModal.module.css'

const UpdateParticipantProfileModal = ({oldData, onClose, trigger}) => {
    const [nickname, setNickname] = useState( oldData?.nickname ||'');
    const [logo, setLogo] = useState(oldData?.logo || null);
    const [address, setAddress] = useState(oldData?.address ||'');
    const selectFile = e => {
        setLogo(e.target.files[0])
    }

    const saveChange = async (e) => {
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append('nickname', nickname);
            formData.append('address', address);
            formData.append('logo', logo);
            const data = await updateParticipant(formData);
            toast.success(data.message);
            trigger(prev => prev + 1);
            onClose()
        }catch(err){
            toast.error(err?.response?.data?.message || "Что то пошло не так");
        }
    }
    return (
        <div className={classes.modalOverlay}>
            <div className={classes.container}>
                <button onClick={() => onClose()} className={classes.closeBtn}>X</button>
                <form className={classes.form}>
                    <label>Никнейм</label>
                    <CustomInput type="text" placeholder='Введите никнейм' value={nickname}
                                 onChange={(e) => setNickname(e.target.value)}/>
                    <label>Адрес</label>
                    <CustomInput type="text" placeholder='Введите адрес' value={address}
                                 onChange={(e) => setAddress(e.target.value)}/>
                    <label>Логотип</label>
                    <CustomInput type="file" placeholder='Прикрепите логотип' onChange={selectFile}/>
                    <CustomButton onClick={(event) => {
                        saveChange(event)
                    }}>Сохранить</CustomButton>
                </form>
            </div>
        </div>
    );
};

export default UpdateParticipantProfileModal;