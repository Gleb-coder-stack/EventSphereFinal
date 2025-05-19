import React from 'react';
import {Map, Placemark, YMaps} from "@iminside/react-yandex-maps"; // Добавил Map в импорт
import classes from './homeContainer.module.css'

const HomeMap = ({events}) => {
    return (
        <YMaps>
            <div className={classes.container} >
                <Map
                     height="60vh" defaultState={{ center: [55.75, 37.57], zoom: 9 }}>
                    {events.map((event) => (
                        <Placemark
                            key={event.id}
                            modules={["geoObject.addon.balloon"]}
                            geometry={[event.latitude, event.longitude]}
                            properties={{
                                hintContent: event.name, // Появляется при наведении
                                balloonContent: `
            <div>
                <h3>${event.name}</h3>
                <p>${event.description}</p>
            </div>
        `,
                            }}
                            options={{
                                preset: 'islands#blueDotIcon',
                                hideIconOnBalloonOpen: false,
                            }}
                        />
                    ))}
                </Map>
            </div>
        </YMaps>
    );
};

export default HomeMap;