import conf from '../conf/conf'

import {Client, Account, ID} from "appwrite";

export class AuthService{
    Client = new Client();
    account;

    constructor(){
        this.Client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId)
            this.account = new Account(this.Client); 
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call other method
                return this.login({email,password})
            } else {
                return userAccount; 
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error
        }
        return null
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}
const authService = new AuthService()

export default authService
