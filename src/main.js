/* punto de inicio de la aplicacion */

import { createApp, nextTick } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'/* componente que renderiza las demas vistas o componentes */
import router from './router'
import './assets/css/app.css'/* importar hojas de estilos global */
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' 
import { authStore } from "@/stores/auth";
import axios from 'axios'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

const store = authStore();

axios.interceptors.request.use(
    request => {
        if (store.getIsLoggedIn){
            if(new Date(store.getTokenExpiration) < new Date()){
                console.log("here2")
                store.refreshAccessToken().then(() => {
                    console.log("refreshed")
                })
            }
            request.headers['Authorization'] = store.getToken;
        }
        return request;
    }
);


app.mount('#app')



