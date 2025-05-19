import {makeAutoObservable} from "mobx";

export default class InviteStore {
    constructor () {
        this._invitesForMe = []
        makeAutoObservable(this)
    }
    setInvitesForMe (invites) {
        this._invitesForMe = invites
    }

    get invitesForMe () {
        return this._invitesForMe
    }
}