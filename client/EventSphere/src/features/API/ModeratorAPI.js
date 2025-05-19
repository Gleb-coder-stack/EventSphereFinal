import {$authHost, $host} from "./index.js";
import {jwtDecode} from "jwt-decode";


export const getModeratorsAPI = async (newData) => {
    try{
        const {data} = await $authHost.get(`api/moderator/moderators`, newData);
        return data;
    }catch(error){
        throw error;
    }
}

export const createModerator = async (newData) => {
    try{
        const {data} = await $authHost.post(`api/moderator/create-moderator`, newData);
        return data;
    }catch(error){
        throw error;
    }
}

export const loginModerator = async ({login, password}) => {
    try{
        const {data} = await $host.post(`api/moderator/login`, {login, password});
        localStorage.setItem("token", data.token);
        return ({token: jwtDecode(data.token), message: data.message})
    }catch(error){
        throw error;
    }
}

export const updateModerator = async (id, newData) => {
    try{
        const {data} = await $authHost.put(`api/moderator/update-moderator/${id}`, newData);
        return data;
    }catch(error){
        throw error;
    }
}

export const deleteModerator = async (id) => {
    try{
        const {data} = await $authHost.delete(`api/moderator/delete-moderator/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const checkVersionJwtModerator = async ({id, versionJwt}) => {
    try{
        const {data} = await $host.post(`api/moderator/checkJwt`, {id, versionJwt});
        return data;
    }catch(error){
        throw error;
    }
}