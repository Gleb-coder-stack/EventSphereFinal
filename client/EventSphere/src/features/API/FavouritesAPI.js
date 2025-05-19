import {$authHost} from "./index.js";

export const getMyFavourites = async () => {
    try{
        const {data} = await $authHost.get(`api/favourites/my`);
        return data;
    }catch(error){
        throw error;
    }
}

export const addToFavourites = async (newData) => {
    try{
        const {data} = await $authHost.post(`api/favourites/`, newData);
        return data;
    }catch(error){
        throw error;
    }
}
export const clearFavourites = async () => {
    try{
        const {data} = await $authHost.delete(`api/favourites/clear`);
        return data;
    }catch(error){
        throw error;
    }
}
export const deleteFavourById = async (id) => {
    try{
        const {data} = await $authHost.delete(`api/favourites/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

