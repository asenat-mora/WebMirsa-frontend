import { defineStore } from 'pinia'
import axiosInstance from '@/helpers/axiosInstance'
import jwt_decode from 'jwt-decode'


/* Almacena el estado global de la aplicacion */
export const authStore = defineStore({
    id: 'auth',
    state: () => ({/* estado inicial del estado */
        isLoggedIn: false,/* variables de usuario que se guardan */
        userId: null,
        userRoles: [],
        rToken: null,
        token: null,
        tokenExpiration: null,
    }),
    getters: {/* para acceder a las valores del estado */
        getIsLoggedIn: (state) => state.isLoggedIn,
        getUserId: (state) => state.userId,
        getUserRoles: (state) => state.userRoles,
        getToken: (state) => state.token,
        getRefreshToken: (state) => state.rToken,
        getIsAdmin: (state) => state.userRoles.indexOf(1) >= 0,
        getTokenExpiration: (state) => state.tokenExpiration,
    },
    actions:{/* acciones que modifican el estado */
        login(payload){/* para guardar la info del usuario en el store */
            return new Promise((resolve, reject) => {
                axiosInstance.post(import.meta.env.VITE_API_URL + '/api/auth/login', payload)/* axiosInstance para no interceptar peticiones  */
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
        logout(){/* para borrar los datos del usuario del store */
            return new Promise((resolve, reject) => {
                axiosInstance.post(import.meta.env.VITE_API_URL + '/api/auth/logout', {
                    refreshToken: this.rToken/* envia una peticion para cerrar sesion */
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
        refreshAccessToken(){/* Cuando el token expira y solicita uno nuevo */
            return new Promise((resolve, reject) => {
                axiosInstance.post(import.meta.env.VITE_API_URL + '/api/auth/refreshToken', {
                    refreshToken: this.rToken/* requiere de un token de refresco para generar un nuevo token de acceso */
                })
                    .then(response => {
                        const token = response.data.accessToken;
                        const {userId, roles, exp} = jwt_decode(token);
                        this.userId = userId;
                        this.userRoles = roles;
                        this.token = token;
                        this.tokenExpiration = new Date(exp);
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

