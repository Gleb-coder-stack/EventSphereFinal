import {makeAutoObservable} from "mobx";

export default class FriendsStore {
    constructor() {
        this._myFriends = []
        this._invitesForMe = []
        this._rejectedInvites = []
        this._myInvites = []
        makeAutoObservable(this)
    }

    setMyFriends(friends) {
        this._myFriends = friends
    }

    setInvitesForMe(invitesForMe) {
        this._invitesForMe = invitesForMe
    }

    setRejectedInvites(rejectedInvites) {
        this._rejectedInvites = rejectedInvites
    }

    setMyInvites(invites) {
        this._myInvites = invites
    }

    get invitesForMe() {
        return this._invitesForMe
    }
    get rejectedInvites() {
        return this._rejectedInvites
    }

    get myInvites() {
        return this._myInvites
    }
    get myFriends() {
        return this._myFriends
    }
}