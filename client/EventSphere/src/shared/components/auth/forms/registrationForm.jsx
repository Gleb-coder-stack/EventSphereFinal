import React, {useState} from 'react';
import CustomInput from "../../../UI/Input/CustomInput.jsx";
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import classes from "./formStyles.module.css";

const RegistrationForm = ({onClickToEntry}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const click = (event) => {
        event.preventDefault();
        onClickToEntry(name, email, password);
    }
    return (

            <form className={classes.loginForm}>
                <div>
                    <label>Введите имя</label>
                    <CustomInput type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label>Введите email</label>
                    <CustomInput type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Введите пароль</label>
                    <CustomInput type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <CustomButton onClick={e => (click(e))}>Зарегистрироваться</CustomButton>
            </form>

    );
};

export default RegistrationForm;