import {$authHost, $host} from "./index.js";

export const getSecureFeedbacks = async (id) => {
    try{
        const {data} = await $authHost.get(`api/feedback/secure/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const getMyFeedbacks = async () => {
    try{
        const {data} = await $authHost.get(`api/feedback/my`);
        return data;
    }catch(error){
        throw error;
    }
}

export const getFeedbacks = async (id) => {
    try{
        const {data} = await $host.get(`api/feedback/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const createFeedback = async (newData) => {
    try{
        const {data} = await $authHost.post(`api/feedback/`, newData);
        return data;
    }catch(error){
        throw error;
    }
}

export const updateFeedback = async (id, newData) => {
    try{
        const {data} = await $authHost.put(`api/feedback/${id}`, newData);
        return data;
    }catch(error){
        throw error;
    }
}
export const deleteFeedback = async (id) => {
    try{
        const {data} = await $authHost.delete(`api/feedback/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}


