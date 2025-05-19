import React, {useState} from 'react';
import classes from '../profileModal/updateModal.module.css'
import CustomInput from "../../../UI/Input/CustomInput.jsx";
import CustomButton from "../../../UI/Button/CustomButton.jsx";

const TagModal = ({oldData, create, update, onClose}) => {
    const [Name, setName] = useState(oldData?.Name || '');
    const [isSystem, setIsSystem] = useState(oldData?.isSystem || false);
    const saveChange = (e) => {
        e.preventDefault();
        !oldData ? create(Name, isSystem) : update(oldData.id ,Name, isSystem);
        onClose();
    }
    return (
        <div className={classes.modalOverlay}>
            <div className={classes.container}>
                <button onClick={() => onClose()} className={classes.closeBtn}>X</button>
                <form className={classes.form}>
                    <label>Название тега</label>
                    <CustomInput type="text" placeholder='Введите название тега' value={Name}
                                 onChange={(e) => setName(e.target.value)}/>
                    <label>Системный тег:</label>
                    <CustomInput type="checkbox" checked={isSystem}
                                 onChange={(e) => setIsSystem(e.target.checked)}/>
                    <CustomButton onClick={(event) => {
                        saveChange(event)
                    }}>Сохранить</CustomButton>
                </form>
            </div>
        </div>
    );
};

export default TagModal;