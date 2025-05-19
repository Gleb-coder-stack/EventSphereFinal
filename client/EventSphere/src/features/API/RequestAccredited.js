import {$authHost, $host} from "./index.js";

export const getAllAcc = async () => {
    try{
        const {data} = await $authHost.get(`api/request-accredited/`);
        return data;
    }catch(error){
        throw error;
    }
}

export const sendAcc = async (newData) => {
    try{
        const {data} = await $authHost.post(`api/request-accredited/`, newData);
        return data;
    }catch(error){
        throw error;
    }
}

export const applyAcc = async (id) => {
    try{
        const {data} = await $authHost.put(`api/request-accredited/apply/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const rejectAcc = async (id) => {
    try{
        const {data} = await $authHost.put(`api/request-accredited/reject/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}