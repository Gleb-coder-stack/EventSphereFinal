import React, {useContext, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import { createEvent, updateEvent } from '../../../../features/API/EventAPI.js';
import { YMaps, Map, Placemark } from '@iminside/react-yandex-maps';
import axios from 'axios';
import {observer} from "mobx-react-lite";
import {Context} from "../../../../app/context.js";
import {getAllTags} from "../../../../features/API/TagAPI.js";
import classes from "./CUEvent.module.css";
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import CustomInput from "../../../UI/Input/CustomInput.jsx";

const CreateUpdateEvent = observer(({ oldData, onClose}) => {
    const {tag } = useContext(Context);
    const [name, setName] = useState(oldData?.name || '');
    const [description, setDescription] = useState(oldData?.description || '');
    const [dateStart, setDateStart] = useState(oldData?.dateStart || '');
    const [dateEnd, setDateEnd] = useState(oldData?.dateEnd || '');
    const [latitude, setLatitude] = useState(oldData?.latitude || null);
    const [longitude, setLongitude] = useState(oldData?.longitude || null);
    const [files, setFiles] = useState([]);
    const [tags, setTags] = useState(oldData?.tags?.map(tag => tag.id) || []);  // Устанавливаем теги
    const [address, setAddress] = useState(oldData?.address || '');
    useEffect(() => {
        getAllTags()
            .then((data) => tag.setTags(data))
            .catch((err) => toast.error(err.message));
    }, []);

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };
    const toggleTag = (tagId) => {
        setTags((prev) =>
            prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
        );
    };
    const handleMapClick = async (e) => {
        const coords = e.get('coords');
        setLatitude(coords[0]);
        setLongitude(coords[1]);

        try {
            const res = await axios.get(`https://geocode-maps.yandex.ru/1.x/`, {
                params: {
                    apikey: '4b4e362a-2835-4a2d-b747-7eff66cc1e23', // можешь убрать, если в демо режиме
                    format: 'json',
                    geocode: `${coords[1]},${coords[0]}`,
                },
            });

            const geoObject = res.data.response.GeoObjectCollection.featureMember[0]?.GeoObject;
            if (geoObject) {
                setAddress(geoObject.name + ', ' + geoObject.description);
            } else {
                setAddress('');
            }
        } catch (err) {
            console.error(err);
            setAddress('');
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('dateStart', dateStart);
            formData.append('dateEnd', dateEnd);
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);
            files.forEach(file => formData.append('files', file));
            tags.forEach(tag => formData.append('tagIds', tag));
            oldData ? await updateEvent(oldData.id, formData) : await createEvent(formData);
            toast.success("Событие успешно отправлено");
            onClose()
        } catch (error) {
            toast.error(error?.response?.data?.message || "Что-то пошло не так");
        }
    };

    return (
        <div className={classes.modalOverlay}>
            <div className={classes.container}>
                <button onClick={() => onClose()} className={classes.closeBtn}>X</button>
                <form className={classes.form}>
                    <div className={classes.mainDataContainer}>
                        <CustomInput type="text" placeholder="Название" value={name}
                                     onChange={e => setName(e.target.value)}/>
                        <textarea placeholder="Описание" value={description}
                                  onChange={e => setDescription(e.target.value)}/>
                        <CustomInput type="date" value={dateStart} onChange={e => setDateStart(e.target.value)}/>
                        <CustomInput type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)}/>
                        <p>Выбирете теги</p>
                        <div className={classes.tagContainer}>

                            {tag.Tags.map((t) => (
                                <label key={t.id} style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                                    <input
                                        type="checkbox"
                                        value={t.id}
                                        checked={tags.includes(t.id)}
                                        onChange={() => toggleTag(t.id)}
                                    />
                                    {t.Name}
                                </label>
                            ))}
                        </div>
                        <CustomInput type="file" multiple onChange={handleFileChange}/>

                        <div>
                            <p>Адрес: {address}</p>
                        </div>
                        <CustomButton onClick={handleSubmit}>Сохранить</CustomButton>
                    </div>
                    <div className={classes.mapContainer}>
                        <div className={classes.map}>
                            <YMaps>
                                <Map
                                    defaultState={{center: [55.75, 37.57], zoom: 9}}
                                    width="100%" height="100%"
                                    onClick={handleMapClick}
                                    state={latitude && longitude ? {
                                        center: [latitude, longitude],
                                        zoom: 14
                                    } : undefined}
                                >
                                    {latitude && longitude && (<Placemark geometry={[latitude, longitude]}/>)}
                                </Map>
                            </YMaps>
                        </div>
                    </div>


                </form>
            </div>
        </div>
    );
});

export default CreateUpdateEvent;
