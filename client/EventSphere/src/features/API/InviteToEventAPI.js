import {$authHost, $host} from "./index.js";

export const getInvitesForMe = async () => {
    try{
        const {data} = await $authHost.get(`api/invite-to-event/my`);
        return data;
    }catch(error){
        throw error;
    }
}

export const sendInviteToEvent = async (idParticipant, idEvent) => {
    try{
        const {data} = await $authHost.post(`api/invite-to-event/`, {idParticipant, idEvent});
        return data;
    }catch(error){
        throw error;
    }
}

export const approveInviteAPI = async (id) => {
    try{
        const {data} = await $authHost.put(`api/invite-to-event/approve/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const rejectInviteAPI = async (id) => {
    try{
        console.log(id)
        const {data} = await $authHost.put(`api/invite-to-event/reject/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}