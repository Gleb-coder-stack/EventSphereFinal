import {$authHost, $host} from "./index.js";

export const getMyFriends = async () => {
    try{
        const {data} = await $authHost.get(`api/friends/friend`);
        return data;
    }catch(error){
        throw error;
    }
}

export const getInvitesForMe = async () => {
    try{
        const {data} = await $authHost.get(`api/friends/invites-to-friend`);
        return data;
    }catch(error){
        throw error;
    }
}

export const getRejectedInvites = async () => {
    try{
        const {data} = await $authHost.get(`api/friends/rejected-invites`);
        return data;
    }catch(error){
        throw error;
    }
}

export const getMyInvites = async () => {
    try{
        const {data} = await $authHost.get(`api/friends/my-invites`);
        return data;
    }catch(error){
        throw error;
    }
}

export const sendInvite = async (id) => {
    try{
        const {data} = await $authHost.post(`api/friends/send-invite/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const addToFriends = async (id) => {
    try{
        const {data} = await $authHost.put(`api/friends/add-to-friends/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const deleteFromFriends = async (id) => {
    try{
        const {data} = await $authHost.put(`api/friends/delete-from-friends/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

