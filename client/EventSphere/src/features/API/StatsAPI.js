import {$host} from "./index.js";

export const getStats = async (id) => {
    try{
        const {data} = await $host.get(`api/stats/event-stats/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const viewEvent = async (id) => {
    try{
        const {data} = await $host.put(`api/stats/view-event/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const viewOrganizer = async (id) => {
    try{
        const {data} = await $host.put(`api/stats/view-organizer/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}