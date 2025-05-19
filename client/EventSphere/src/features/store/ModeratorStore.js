import {makeObservable} from "mobx";

export default class ModeratorStore {
    constructor(){
        this._allModers = []
        makeObservable(this)
    }
    setAllModers(allModers){
        this._allModers = allModers;
    }

    get allModers(){
        return this._allModers;
    }
}