import { defineStore } from 'pinia'
import axiosInstance from '@/helpers/axiosInstance'
import jwt_decode from 'jwt-decode'
    
export const authStore = defineStore({
    id: 'auth',
    state: () => ({
        isLoggedIn: false,
        userId: null,
        userRoles: [],
        rToken: null,
        token: null,
        tokenExpiration: null,
    }),
    getters: {
        getIsLoggedIn: (state) => state.isLoggedIn,
        getUserId: (state) => state.userId,
        getUserRoles: (state) => state.userRoles,
        getToken: (state) => state.token,
        getRefreshToken: (state) => state.rToken,
        getIsAdmin: (state) => state.userRoles.indexOf(1) >= 0,
        getTokenExpiration: (state) => state.tokenExpiration,
    },
    actions:{
        login(payload){
            return new Promise((resolve, reject) => {
                axiosInstance.post(import.meta.env.VITE_API_URL + '/api/auth/login', payload)
                    .then(response => {
                        const token = response.data.accessToken;
                        const rToken = response.data.refreshToken;
                        const {userId, roles, exp} = jwt_decode(token);
                        this.isLoggedIn = true;
                        this.userId = userId;
                        this.userRoles = roles;
                        this.token = token;
                        this.rToken = rToken;
                        this.tokenExpiration = new Date(exp * 1000);
                        resolve(response);
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
                
            })
        },
        logout(){
            return new Promise((resolve, reject) => {
                axiosInstance.post(import.meta.env.VITE_API_URL + '/api/auth/logout', {
                    refreshToken: this.rToken
                })
                    .then(response => {
                        this.isLoggedIn = false;
                        this.userId = null;
                        this.userRoles = [];
                        this.token = null;
                        this.rToken = null;
                        this.tokenExpiration = null;

                        resolve(response);
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        refreshAccessToken(){
            return new Promise((resolve, reject) => {
                axiosInstance.post(import.meta.env.VITE_API_URL + '/api/auth/refreshToken', {
                    refreshToken: this.rToken
                })
                    .then(response => {
                        const token = response.data.accessToken;
                        const {userId, roles, exp} = jwt_decode(token);
                        const decoded = jwt_decode(token);
                        console.log(decoded)
                        this.userId = userId;
                        this.userRoles = roles;
                        this.token = token;
                        this.tokenExpiration = new Date(exp*1000);
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        }
    },
    persist: true
})

