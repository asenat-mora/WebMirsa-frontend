/* Define las rutas que estaran en la aplicacion */
import { createRouter, createWebHistory } from 'vue-router'
/* Vista cliente */
import HomeView from '../views/HomeView.vue'
import Philosophy from '../views/Philosophy.vue'
import History from '../views/History.vue'
import Products from '../views/Products.vue'
import Cotizacion from '../views/Cotizacion.vue'
import Login from '../views/Login.vue'

/* Usuario */
import AddUser from '../views/AddUser.vue'
import UserEdit from '../views/UserEdit.vue'
import UserList from '../views/UserList.vue'

/* Marcas */
import AddBrand from '../views/AddBrand.vue'
import BrandEdit from '../views/BrandEdit.vue'
import BrandList from '../views/BrandList.vue'
import AddSubBrand from '../views/AddSubBrand.vue'

/* Accesorios */
import AddAccesory from '../views/AddAccesory.vue'
import AccesoryEdit from '../views/AccesoryEdit.vue'
import AccesoryList from '../views/AccesoryList.vue'
/* Productos */
import AddProduct from '../views/AddProduct.vue'
import ProductEdit from '../views/ProductEdit.vue'
import ProductSearch from '../views/ProductSearch.vue'
/* Colores */
import AddColor from '../views/AddColor.vue'
import ColorEdit from '../views/ColorEdit.vue'
import ColorList from '../views/ColorList.vue'

import ArticleList from '../views/ArticleList.vue'

import { authStore } from "@/stores/auth";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/Philosophy",
			name: "Philosophy",
			component: Philosophy,
		},
		{
			path: "/History",
			name: "History",
			component: History,
		},
		{
			path: "/Products",
			name: "Products",
			component: Products,
		},
		{
			path: "/Cotizacion",
			name: "Cotizacion",
			component: Cotizacion,
		},
		{
			path: "/login",
			name: "login",
			component: Login,
		},
		{
			path: "/AddBrand",
			name: "AddBrand",
			component: AddBrand,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/BrandEdit",
			name: "BrandEdit",
			component: BrandEdit,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/BrandList",
			name: "BrandList",
			component: BrandList,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/AddSubBrand",
			name: "AddSubBrand",
			component: AddSubBrand,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/AddAccesory",
			name: "AddAccesory",
			component: AddAccesory,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/AccesoryEdit",
			name: "AccesoryEdit",
			component: AccesoryEdit,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/AccesoryList",
			name: "AccesoryList",
			component: AccesoryList,
			meta: {
				requiresAuth: true,
			},
		},
		{
            path: "/AddProduct",
            name: "AddProduct",
            component: AddProduct,
            meta: {
				requiresAuth: true,
			},
        },
		{
            path: "/productEdit/:id",
            name: "ProductEdit",
            component: ProductEdit,
            meta: {
				requiresAuth: true,
			},
        },
		{
            path: "/productSearch",
            name: "ProductSearch",
            component: ProductSearch,
        },
		{
			path: "/AddColor",
			name: "AddColor",
			component: AddColor,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/ColorEdit",
			name: "ColorEdit",
			component: ColorEdit,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/ColorList",
			name: "ColorList",
			component: ColorList,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/AddUser",
			name: "AddUser",
			component: AddUser,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/UserEdit",
			name: "UserEdit",
			component: UserEdit,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/UserList",
			name: "UserList",
			component: UserList,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/ArticleList",
			name: "ArticleList",
			component: ArticleList,
			meta: {
				requiresAuth: true,
			},
		}
        
        
        
	],
});

/* funcion para evaluar si la ruta requiere inicio de sesion o no */
router.beforeEach((to, from, next) => {
    const store = authStore();
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getIsLoggedIn) {
            next('/login');
            return
        } else {
            next();
            return
        }
    }
    next();
})



export default router;
