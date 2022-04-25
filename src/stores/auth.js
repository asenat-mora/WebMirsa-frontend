import { defineStore } from 'pinia'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export const authStore = defineStore({
    id: 'auth',
    state: () => ({
        isLoggedIn: false,
        user: null,
        token: null,
        refreshToken: null,
    }),
    getters: {
        getIsLoggedIn: (state) => state.isLoggedIn,
        getUser: (state) => state.user,
        getToken: (state) => state.token,
        getRefreshToken: (state) => state.refreshToken,
        getIsAdmin: (state) => state.user.roles.indexOf(1) >= 0
    },
    actions:{
        login(payload){
            return new Promise((resolve, reject) => {
                axios.post(import.meta.env.VITE_API_URL + '/api/auth/login', payload)
                    .then(response => {
                        console.log(response)
                        const token = response.data.accessToken;
                        const refreshToken = response.data.refreshToken;
                        
                        const {userId, roles} = jwt_decode(token);

                        this.isLoggedIn = true;
                        this.user = {
                            id: userId,
                            roles: roles
                        };
                        this.token = token;
                        this.refreshToken = refreshToken;
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
                axios.post(import.meta.env.VITE_API_URL + '/api/auth/logout', {
                    refreshToken: this.refreshToken
                })
                    .then(response => {
                        this.isLoggedIn = false;
                        this.user = null;
                        this.token = null;
                        this.refreshToken = null;
                        resolve(response);
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        }
    }
})

