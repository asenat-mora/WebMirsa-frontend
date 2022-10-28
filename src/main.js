/* punto de inicio de la aplicacion */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'/* componente que renderiza las demas vistas o componentes */
import router from './router'
import './assets/css/app.css'/* importar hojas de estilos global */
import { library } from '@fortawesome/fontawesome-svg-core' /* import the fontawesome core */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' /* import font awesome icon component*/ 
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' 
import { authStore } from "@/stores/auth";
import axios from 'axios';
import Notifications from '@kyvg/vue3-notification'
import PrimeVue from 'primevue/config';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Menubar from 'primevue/menubar';
import OrderList from 'primevue/orderlist';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';               
import 'primeicons/primeicons.css'; 

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

library.add(fas, far, fab)

app.use(pinia)
app.use(router)
app.use(Notifications)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(PrimeVue)

app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Dialog', Dialog)
app.component('Menubar', Menubar)
app.component('OrderList', OrderList)


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



