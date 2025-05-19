import {$authHost, $host} from "./index.js";
export const getAll = async (query = {}) => {
    try {
        const { isMap = false, selectedTagIds = [], name = '' } = query;
        const params = {
            isMap,
            selectedTagIds: selectedTagIds.join(','), // Преобразуем массив в строку
            name,
        };
        const { data } = await $host.get('api/event/', { params });
        return data;
    } catch (error) {
        throw error;
    }
};

export const getMy = async (name) => {
    try{
        const {data} = await $authHost.get(`api/event/my`, {params: {name}});
        return data;
    }catch(error){
        throw error;
    }
}

export const getModeration = async () => {
    try{
        const {data} = await $authHost.get(`api/event/moderation`);
        return data;
    }catch(error){
        throw error;
    }
}

export const getEventOfModer = async (id) => {
    try{
        const {data} = await $authHost.get(`api/event/owner/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const getEventById = async (id) => {
    try{
        const {data} = await $host.get(`api/event/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const getRecommendedEvents = async () => {
    try{
        const {data} = await $authHost.get(`api/event/recommended`);
        return data;
    }catch(error){
        throw error;
    }
}


export const createEvent = async (newData) => {
    try{
        console.log(newData);
        const {data} = await $authHost.post(`api/event/create-event`, newData);
        return data;
    }catch(error){
        throw error;
    }
}

export const applyModerEvent = async (id) => {
    try{
        const {data} = await $authHost.put(`api/event/apply/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const rejectModerEvent = async (id) => {
    try{
        const {data} = await $authHost.put(`api/event/reject/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const startEvent = async (id) => {
    try{
        const {data} = await $authHost.put(`api/event/start/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const finishEvent = async (id) => {
    try{

        const {data} = await $authHost.put(`api/event/finish/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const changeStatusEvent = async (id) => {
    try{
        const {data} = await $authHost.put(`api/event/changeStatus/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const updateEvent = async (id, newData) => {
    try{
        const {data} = await $authHost.put(`api/event/update/${id}`, newData);
        return data;
    }catch(error){
        throw error;
    }
}

export const deleteEvent = async (id) => {
    try{
        const {data} = await $authHost.delete(`api/event/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

