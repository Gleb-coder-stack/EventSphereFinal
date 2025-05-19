import {$authHost, $host} from "./index.js";

export const getAllTags = async () => {
    try{
        const {data} = await $host.get(`api/tag/`);
        return data;
    }catch(error){
        throw error;
    }
}

export const createTag = async (newData) => {
    try{
        const {data} = await $authHost.post(`api/tag/`, newData);
        return data;
    }catch(error){
        throw error;
    }
}

export const updateTag = async (id, newData) => {
    try{
        const {data} = await $authHost.put(`api/tag/${id}`, newData);
        return data;
    }catch(error){
        throw error;
    }
}

export const deleteTagAPI = async (id) => {
    try{
        const {data} = await $authHost.delete(`api/tag/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}