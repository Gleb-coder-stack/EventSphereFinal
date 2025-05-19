import {makeAutoObservable} from "mobx";

export default class RecallStore {
    constructor() {
        this._recallsByEvent = [];
        makeAutoObservable(this);
    }

    setRecallsByEvent(recalls) {
        this._recallsByEvent = recalls;
    }

    get recallsByEvent() {
        return this._recallsByEvent;
    }
}