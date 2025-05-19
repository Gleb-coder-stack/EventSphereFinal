import {makeAutoObservable} from "mobx";

export default class TagStore {
    constructor () {
        this._tags = []
        makeAutoObservable(this)
    }
    setTags (tags) {
        this._tags = tags
    }

    get Tags () {
        return this._tags
    }
}