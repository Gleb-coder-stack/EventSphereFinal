import {$authHost, $host} from "./index.js";
import {jwtDecode} from "jwt-decode";

export const getMe = async () => {
    try{
        const {data} = await $authHost.get(`api/organizer/me`);
        return data;
    }catch(error){
        throw error;
    }
}

export const getById = async (id) => {
    try{
        const {data} = await $host.get(`api/organizer/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const registration = async (newData) => {
    try{
        const {data} = await $host.post(`api/organizer/registration`, newData);
        return data
    }catch(error){
        throw error;
    }
}

export const loginOrganizer = async ({email, password}) => {
    try{
        const {data} = await $host.post(`api/organizer/login`, {email, password});
        return data
    }catch(error){
        throw error;
    }
}

export const secondFactorOrganizer = async (newData) => {
    try{
        const {data} = await $host.post(`api/organizer/twoFaAuth`, newData);
        localStorage.setItem("token", data.token);
        return ({token: jwtDecode(data.token), message: data.message})
    }catch(error){
        throw error;
    }
}

export const checkVersionJwtOrganizer = async ({id, versionJwt}) => {
    try{
        const {data} = await $host.post(`api/organizer/checkJwt`, {id, versionJwt});
        return data;
    }catch(error){
        throw error;
    }
}

export const updateOrganizer = async (newData) => {
    try{
        const {data} = await $authHost.put(`api/organizer/update`, newData);
        return data;
    }catch(error){
        throw error;
    }
}

export const changePasswordOrganizer = async ({oldPassword, newPassword}) => {
    try{
        const {data} = await $authHost.put(`api/organizer/change-password`, {oldPassword, newPassword});
        return data;
    }catch(error){
        throw error;
    }
}

export const resetPasswordOrganizer = async (newData) => {
    try{
        const {data} = await $host.post(`api/organizer/reset-password`, newData);
        return data;
    }catch(error){
        throw error;
    }
}

export const setNewPasswordOrganizer = async (newData) => {
    try{
        const {data} = await $host.put(`api/organizer/set-new-password`, newData);
        return data;
    }catch(error){
        throw error;
    }
}

export const changeIsHiddenFeedbacks = async () => {
    try{
        const {data} = await $authHost.put(`api/organizer/set-is-hidden-feedbacks`);
        return data;
    }catch(error){
        throw error;
    }
}

export const changeCanCreateFeedbacks = async () => {
    try{
        const {data} = await $authHost.put(`api/organizer/set-can-create-feedback`);
        return data;
    }catch(error){
        throw error;
    }
}

export const deleteOrganizer = async () => {
    try{
        const {data} = await $authHost.delete(`api/organizer/delete`);
        return data;
    }catch(error){
        throw error;
    }
}