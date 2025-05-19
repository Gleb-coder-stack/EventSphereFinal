import {makeAutoObservable} from "mobx";

export default class ViewHistoryStore {
    constructor() {
        this._viewHistory=[]
        makeAutoObservable(this)
    }

    setViewHistory(viewHistory) {
        this._viewHistory = viewHistory;
    }
    get getViewHistory() {
        return this._viewHistory;
    }
}