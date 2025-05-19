import {makeAutoObservable} from "mobx";

export default class FavouriteStore {
    constructor () {
        this._myFavourites = []
        makeAutoObservable(this)
    }

    setMYFavourite (favorites) {
        this._myFavourites = favorites;
    }

    get myFavourites () {
        return this._myFavourites;
    }
}