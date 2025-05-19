import {makeAutoObservable} from "mobx";

export default class EventStore {
    constructor () {
        this._events = []
        this._myEvents = []
        this._moderationEvents = []
        this._eventById = {}
        this._recommendEvent = []
        makeAutoObservable(this)
    }

    setRecommendEvent (events) {
        this._recommendEvent = events
    }

    setEvents (event) {
        this._events = event
    }

    setModerationEvents (moderationEvents) {
        this._moderationEvents = moderationEvents
    }

    setEventById (event_id) {
        this._eventById = event_id
    }

    setMyEvents (myEvents) {
        this._myEvents = myEvents
    }

    get events () {
        return this._events
    }

    get myEvents () {
        return this._myEvents
    }
    get moderationEvents () {
        return this._moderationEvents
    }

    get eventByIdId () {
        return this._eventById
    }

    get getRecommendEvent () {
        return this._recommendEvent
    }
}