import {$authHost, $host} from "./index.js";
import {jwtDecode} from "jwt-decode";

export const getMe = async () => {
    try{
        const {data} = await $authHost.get(`api/participant/me`);
        return data;
    }catch(error){
        throw error;
    }
}

export const getById = async (id) => {
    try{
        const {data} = await $host.get(`api/participant/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const registration = async (newData) => {
    try{
        const {data} = await $host.post(`api/participant/registration`, newData);
        return data;
    }catch(error){
        throw error;
    }
}

export const loginParticipant = async ({email, password}) => {
    try{
        const {data} = await $host.post(`api/participant/login`, {email, password});
        return data;
    }catch(error){
        throw error;
    }
}

export const secondFactorParticipant = async (newData) => {
    try{
        const {data} = await $host.post(`api/participant/twoFaAuth`, newData);
        localStorage.setItem("token", data.token);
        return ({token: jwtDecode(data.token), message: data.message})
    }catch(error){
        throw error;
    }
}


export const checkVersionJwtParticipant = async ({id, versionJwt}) => {
    try{
        const {data} = await $host.post(`api/participant/checkJwt`, {id, versionJwt});
        return data;
    }catch(error){
        throw error;
    }
}

export const updateParticipant = async (newData) => {
    try{
        const {data} = await $authHost.put(`api/participant/update`, newData);
        return data;
    }catch(error){
        throw error;
    }
}

export const changePasswordParticipant = async ({oldPassword, newPassword}) => {
    try{
        const {data} = await $authHost.put(`api/participant/change-password`, {oldPassword, newPassword});
        return data;
    }catch(error){
        throw error;
    }
}

export const resetPasswordParticipant = async (newData) => {
    try{
        const {data} = await $host.post(`api/participant/reset-password`, newData);
        return data;
    }catch(error){
        throw error;
    }
}

export const setNewPasswordParticipant = async (newData) => {
    try{
        const {data} = await $host.put(`api/participant/set-new-password`, newData);
        return data;
    }catch(error){
        throw error;
    }
}


export const changeConfidentialParticipant = async () => {
    try{
        const {data} = await $authHost.put(`api/participant/change-confidential`);
        return data;
    }catch(error){
        throw error;
    }
}

export const deleteParticipant = async () => {
    try{
        const {data} = await $authHost.delete(`api/participant/delete`);
        return data;
    }catch(error){
        throw error;
    }
}