import {$authHost} from "./index.js";

export const getHistory = async () => {
    try{
        const {data} = await $authHost.get(`api/history/`);
        return data;
    }catch(error){
        throw error;
    }
}

export const addToHistory = async (id) => {
    try{
        const {data} = await $authHost.post(`api/history/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}