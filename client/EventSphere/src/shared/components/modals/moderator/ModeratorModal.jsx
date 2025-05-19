import React, {useState} from 'react';
import classes from '../profileModal/updateModal.module.css'
import CustomInput from "../../../UI/Input/CustomInput.jsx";
import CustomButton from "../../../UI/Button/CustomButton.jsx";

const ModeratorModal = ({oldData, create, update, onClose}) => {
    const [login, setLogin] = useState(oldData?.login || '');
    const [password, setPassword] = useState('');
    const saveChange = (e) => {
        e.preventDefault();
        console.log(oldData)
        !oldData ? create(login, password) : update(oldData.id ,login, password);
        onClose();
    }
    return (
        <div className={classes.modalOverlay}>
            <div className={classes.container}>
                <button onClick={() => onClose()} className={classes.closeBtn}>X</button>
                <form className={classes.form}>
                    <label>Логин</label>
                    <CustomInput type="text" placeholder='Введите логин' value={login}
                                 onChange={(e) => setLogin(e.target.value)}/>
                    <label>Пароль (не указываете, чтобы оставить прошлый):</label>
                    <CustomInput type="password" placeholder='Введите пароль' value={password}
                                 onChange={(e) => setPassword(e.target.value)}/>
                    <CustomButton onClick={(event) => {
                        saveChange(event)
                    }}>Сохранить</CustomButton>
                </form>
            </div>
        </div>
    );
};

export default ModeratorModal;