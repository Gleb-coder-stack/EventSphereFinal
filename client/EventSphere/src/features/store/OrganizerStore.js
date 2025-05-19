import {makeAutoObservable} from "mobx";

export default class OrganizerStore {
    constructor() {
        this._anotherProfile = {}
        this._myProfile = {}
        makeAutoObservable(this)
    }

    setMyProfile(newProfile) {
        this._myProfile = newProfile
    }
    setAnotherProfile(newAnotherProfile) {
        this._anotherProfile = newAnotherProfile
    }
    get anotherProfile() {
        return this._anotherProfile
    }
    get myProfile() {
        return this._myProfile
    }
}