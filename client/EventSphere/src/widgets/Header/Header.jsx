import React, {useContext, useState} from 'react';
import classes from './Header.module.css'
import logo from "../../assets/logo.png"
import menuImg from "../../assets/human-white.png"
import {observer} from "mobx-react-lite";
import {Context} from "../../app/context.js";
import {useNavigate} from "react-router-dom";
import {AUTH_PAGE, HOME_PAGE, MODERATOR_PANEL_PAGE, MY_PROFILE_PAGE} from "../../shared/constants/const.js";

const Header = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const clickToProfile = () => {
        console.log(user.role)
        if (!user.isAuth) {
            navigate(AUTH_PAGE);

        }
        if(user.role === 'moderator' || user.role === 'admin' ){
            navigate(MODERATOR_PANEL_PAGE);

        }
        if(user.role === 'participant' || user.role === 'organizer' ){
            navigate(MY_PROFILE_PAGE);

        }
    }
    const clickToIcon = () => {
        if(user.isAuth === true ){
            setIsOpen(!isOpen)
            return
        }
        navigate(AUTH_PAGE);
    }
    const logout = () => {
        user.setDefault()
        setIsOpen(false);
        navigate(AUTH_PAGE);
    }
    const goHome = () => {
        navigate(HOME_PAGE);
    }
    return (
        <header >
            <div className={classes.container}>
                <img src={logo} alt="EventSphere" className={classes.image} onClick={goHome}/>
                <h1>Event Sphere</h1>
                <img onClick={clickToIcon} src={menuImg} alt="menu" className={classes.image}/>
            </div>
            {isOpen && (
                <div className={classes.dropdownMenu}>
                    <ul>
                        <li className={classes.item} onClick={clickToProfile}>Профиль</li>
                        <li className={classes.item} onClick={logout}>Выйти</li>
                    </ul>
                </div>
            )}

        </header>
    );
});

export default Header;