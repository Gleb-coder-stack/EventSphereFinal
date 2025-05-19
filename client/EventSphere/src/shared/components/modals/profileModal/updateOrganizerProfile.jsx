import React, {useState} from 'react';
import {toast} from "react-toastify";
import classes from "./updateModal.module.css";
import CustomInput from "../../../UI/Input/CustomInput.jsx";
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import {updateOrganizer} from "../../../../features/API/OrganizerAPI.js";

const UpdateOrganizerProfile = ({oldData, onClose, trigger}) => {
    const [name, setName] = useState( oldData?.name ||'');
    const [logo, setLogo] = useState(oldData?.logo || null);
    const selectFile = e => {
        setLogo(e.target.files[0])
    }

    const saveChange = async (e) => {
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append('name', name);
            formData.append('logo', logo);
            const data = await updateOrganizer(formData);
            toast.success(data.message);
            trigger();
            onClose()
        }catch(err){
            toast.error(err?.response?.data?.message || "Что-то пошло не так");
        }
    }
    return (
        <div className={classes.modalOverlay}>
            <div className={classes.container}>
                <button onClick={() => onClose()} className={classes.closeBtn}>X</button>
                <form className={classes.form}>
                    <label>Название</label>
                    <CustomInput type="text" placeholder='Введите никнейм' value={name}
                                 onChange={(e) => setName(e.target.value)}/>
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
export default UpdateOrganizerProfile;