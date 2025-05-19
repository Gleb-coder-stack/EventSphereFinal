import {makeAutoObservable} from "mobx";

export default class StatsStore {
    constructor() {

        this._statsEvent = {}

        makeAutoObservable(this);
    }

    setStats(state) {
        this._statsEvent = state;
    }

    get stats() {
        return this._statsEvent;
    }
}