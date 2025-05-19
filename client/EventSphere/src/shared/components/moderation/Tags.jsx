import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../app/context.js";
import {createTag, deleteTagAPI, getAllTags, updateTag} from "../../../features/API/TagAPI.js";
import {toast} from "react-toastify";
import CustomButton from "../../UI/Button/CustomButton.jsx";
import TagCard from "../cards/moderator/TagCard.jsx";
import classes from './moderEvent.module.css'
import TagModal from "../modals/moderator/TagModal.jsx";

const Tags = observer(() => {
    const [trigger, setTrigger] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [tagForUpdate, setTagForUpdate] = useState(undefined);
    const {tag} = useContext(Context);
    useEffect(() => {
        getAllTags().then((data) => (tag.setTags(data))).catch((error) => (toast.error(error.message)));
    }, [trigger]);
    const deleteTag = async (id) => {
        try{
            const result = await deleteTagAPI(id)
            toast.success(result.message)
            setTrigger(!trigger);
        }catch (err){
            toast.error(err.response.data.message || 'Что то пошло не так')
        }
    }
    const updateTagInCard = (tag) => {
        setTagForUpdate(tag);
        setIsUpdate(true);
    }
    const updateTagFunc = async (id, Name, isSystem) => {
        try{
            const result = await updateTag(id, {Name, isSystem});
            toast.success(result.message)
            setTrigger(!trigger);
        }catch (err){
            toast.error(err.response.data.message || 'Что то пошло не так')
        }
    }
    const createTagFunc = async (Name, isSystem) => {
        try{
            const result = await createTag({Name, isSystem});
            toast.success(result.message)
            setTrigger(!trigger);
        }catch (err){
            toast.error(err.response.data.message || 'Что то пошло не так')
        }
    }
    return (
        <div className={classes.containeer}>
            <div>
                <CustomButton onClick={() => (setIsUpdate(true))}>Добавить тег</CustomButton>
            </div>
            <div className={classes.tagContsainer} >
                {tag.Tags.length > 0 ? (
                    tag.Tags.map((tag) => (<TagCard key={tag.id} tag={tag} update={updateTagInCard} deleteTagFunc={deleteTag} />))
                ) : <p>Теги не найдены</p>}
            </div>
            {isUpdate && (<TagModal oldData={tagForUpdate} onClose={() => (setIsUpdate(false))} update={updateTagFunc} create={createTagFunc} />)}
        </div>
    );
});

export default Tags;