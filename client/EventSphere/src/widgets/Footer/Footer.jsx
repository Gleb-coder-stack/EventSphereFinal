import React from 'react';
import {Link} from "react-router-dom";
import classes from "./footer.module.css";

const Footer = () => {
    return (
        <footer>
            <div className={classes.container}>
                <h3 className={classes.title}>© 2025 EventSphere.</h3>
                <p className={classes.otherText}> Платформа для организации и поиска мероприятий по всей стране.
                    Мы объединяем организаторов, участников и волонтёров, создавая пространство для общения,
                    развития и вдохновения.</p>
                <h4 className={classes.otherText}>Сайт использует <Link to='https://yandex.ru/legal/maps_api/'>Яндекс карты</Link></h4>
            </div>
        </footer>
    );
};

export default Footer;