import {$authHost, $host} from "./index.js";

export const getMyRecalls = async () => {
    try{
        const {data} = await $authHost.get(`api/recall/my`);
        return data;
    }catch(error){
        throw error;
    }
}

export const getAllRecallsBYEvent = async (id) => {
    try{
        const {data} = await $authHost.get(`api/recall/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const sendRecalls = async (id) => {
    try{
        const {data} = await $authHost.post(`api/recall/send-recall/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const deleteRecalls = async (id) => {
    try{
        const {data} = await $authHost.delete(`api/recall/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

