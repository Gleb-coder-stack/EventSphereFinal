import React, {useState} from 'react';
import {toast} from "react-toastify";
import {sendAcc} from "../../../../features/API/RequestAccredited.js";
import classes from "./updateModal.module.css";
import CustomInput from "../../../UI/Input/CustomInput.jsx";
import CustomButton from "../../../UI/Button/CustomButton.jsx";

const SendAccredited = ({onClose}) => {
    const [links, setLinks] = useState('');
    const [file, setFile] = useState(null);
    const selectFile = e => {
        setFile(e.target.files[0])
    }
    const sendAccreditedFunc = async(e) => {
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append('links', links);
            formData.append('file', file);
            const result = await sendAcc(formData);
            toast.success(result.message);
            onClose()
        }catch(err){
            toast.error(err.response.data.message || 'Что-то пошло не так')
        }
    }
    return (
        <div className={classes.modalOverlay}>
            <div className={classes.container}>
                <button onClick={() => onClose()} className={classes.closeBtn}>X</button>
                <form className={classes.form}>
                    <label>Ссылки на соц. сети</label>
                    <CustomInput type="text" placeholder='Укажите ссылки' value={links}
                                 onChange={(e) => setLinks(e.target.value)}/>
                    <label>Файлы</label>
                    <CustomInput type="file" placeholder='Прикрепите файл' onChange={selectFile}/>
                    <CustomButton onClick={(event) => {
                        sendAccreditedFunc(event)
                    }}>Отправить</CustomButton>
                </form>
            </div>
        </div>
    );
};

export default SendAccredited;