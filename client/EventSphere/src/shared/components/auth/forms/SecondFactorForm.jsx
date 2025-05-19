import React, {useContext, useRef, useState} from 'react';
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import CustomInput from "../../../UI/Input/CustomInput.jsx";
import {secondFactorParticipant} from "../../../../features/API/ParticipantAPI.js";
import {toast} from "react-toastify";
import {HOME_PAGE} from "../../../constants/const.js";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../app/context.js";
import {useNavigate} from "react-router-dom";
import {secondFactorOrganizer} from "../../../../features/API/OrganizerAPI.js";
import classes from './formStyles.module.css'

const SecondFactorForm = observer(({role}) => {
    const countCode = 6
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const [code, setCode] = useState(Array(countCode).fill(""));
    const inputsRef = useRef([]);

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return; // только цифры и максимум 1 символ
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // автофокус на следующий инпут
        if (value && index < countCode - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        try{
            const fullCode = code.join("");
            console.log(fullCode )

            const email = user.userEmail
            console.log(email)
            let data
            role === 'participant' ? data = await secondFactorParticipant({email, code: fullCode}) : data = await secondFactorOrganizer({email, code:fullCode})
            user.setUser(data.id);
            user.setRole(data.role);
            user.setIsAuth(true)
            toast.success(data.message);
            navigate(HOME_PAGE)
        }catch (error) {
            toast.error(error?.response?.data?.message || 'Что то пошло не так');
        }

    };

    return (
        <div className={classes.mainContainer}>
            <h1>Введите код с почты</h1>
            <div className={classes.secondFactorContainer}>
                {
                    code.map((code, index) => (<CustomInput
                        style={{width: '44px', height: '44px'}}
                        key={index}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputsRef.current[index] = el)}
                    />))
                }
            </div>
            <CustomButton onClick={handleSubmit}>Отправить</CustomButton>
        </div>
    );
});

export default SecondFactorForm;