/* Define las rutas que estaran en la aplicacion 
*/
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Article from '../views/Article.vue'
import Categoria from '../views/Categoria.vue'
import Marca from '../views/Marca.vue'
import Registro from '../views/UserRegister.vue'
import EditarProducto from '../views/ArticleEdit.vue'
import ProductosMirsa from '../views/Productos.vue'
import ListaProductos from '../views/ArticleList.vue'
import ListaMarcas from '../views/BrandList.vue'
import ListaCategorias from '../views/CategoriesList.vue'
import { authStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/article',
      name: 'article',
      component: Article,
      meta : {/* necesita autenticacion del usuario -- necesita hacer login */
        requiresAuth: true
      }
    },
    {
      path: '/categoria',
      name: 'categoria',
      component: Categoria,
      meta : {
        requiresAuth: true
      }
    },
    {
      path: '/marca',
      name: 'marca',
      component: Marca,
      meta : {
        requiresAuth: true
      }
    },
    {
      path: '/registro',
      name: 'registro',
      component: Registro,
      meta : {
        requiresAuth: true
      }
    },
    {
      path: '/editProducto',
      name: 'editProducto',
      component: EditarProducto,
      meta : {
        requiresAuth: true
      }
    },
    {
      path: '/productosMirsa',
      name: 'productosMirsa',
      component: ProductosMirsa,
    },
    {
      path: '/ArticleList',
      name: 'ArticleList',
      component: ListaProductos,
    },
    {
      path: '/BrandList',
      name: 'BrandList',
      component: ListaMarcas,
    },
    {
      path: '/CategoriesList',
      name: 'CategoriesList',
      component: ListaCategorias,
    }


  ]
})



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
