import {makeAutoObservable} from "mobx";
import {jwtDecode} from "jwt-decode";
import checkJwtVersion from "../../shared/functions/checkJwt.js";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._userId = null
        this._role = ''
        this._entry = 'participant'
        this._email = ''
        makeAutoObservable(this, {}, { autoBind: true });
    }
    setEmail(email) {
        this._email = email;
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(userId) {
        this._userId = userId
    }
    setRole(role) {
        this._role = role
    }
    setEntry(entry) {
        this._entry = entry
    }
    get entry() {
        return this._entry
    }
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._userId
    }
    get role() {
        return this._role
    }

    get userEmail(){
        return this._email
    }

    setDefault(){
        this.setIsAuth(false)
        this.setUser(null)
        this.setRole('')
        this.setEntry('participant')
        this.setEmail('')
        localStorage.removeItem('token')
    }

    async checkToken(){

        const token = localStorage.getItem("token");

        if(!token){
            this.setDefault()
            return
        }
        const decoded = jwtDecode(token);

        const resultCheck = await checkJwtVersion(token)

        if(!resultCheck){
            console.log('failed to verify token')
            this.setDefault()
            return
        }
        console.log('verify token')
        const {id, role} = decoded;
        this.setIsAuth(true)
        this.setRole(role)
        this.setUser(id)
    }
}