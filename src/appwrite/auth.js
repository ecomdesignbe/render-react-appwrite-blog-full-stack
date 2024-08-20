// start with appwrite auth service 

import conf from '../conf/conf'
import { Client, Account } from "appwrite";

// code repeat from appwrite
/*
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<PROJECT_ID>');                 // Your project ID

const account = new Account(client);
*/
export class AuthService {
    client = new Client()
    account

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    // createAccount
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(email, password, name))
            if (userAccount) {
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    // login
    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }
    }

    // getCurrentUser
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log('Appwrite service error :: getCurrentUser() :: ', error)          
        }
        return null
    }

    // logout
    async logout() {
        try {
            return await this.account.deleteSessions()            
        } catch (error) {
            console.log('Appwrite service error :: logout() :: ', error)          
            
        }
    }
}

const authService = new AuthService

export default authService

