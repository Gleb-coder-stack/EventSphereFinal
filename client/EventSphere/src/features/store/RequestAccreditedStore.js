import {makeAutoObservable} from "mobx";

export default class RequestAccreditedStore{
    constructor(){
        this._moderationRequests = []
        makeAutoObservable(this)
    }
    setModerationRequests(moderationRequests){
        this._moderationRequests = moderationRequests
    }
    get moderationRequests(){
        return this._moderationRequests
    }
}