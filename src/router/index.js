/* Define las rutas que estaran en la aplicacion 
*/
import { createRouter, createWebHistory } from 'vue-router'
/* Vista cliente */
import HomeView from '../views/HomeView.vue'
import Philosophy from '../views/Philosophy.vue'
import History from '../views/History.vue'
import Products from '../views/Products.vue'



import Login from '../views/Login.vue'
import Article from '../views/Article.vue'
import AddBrand from '../views/AddBrand.vue'
import AddClassification from '../views/AddClassification.vue'
import EditarMarca from '../views/BrandEdit.vue'
import Registro from '../views/UserRegister.vue'
import EditarProducto from '../views/ArticleEdit.vue'

import ListaProductos from '../views/ArticleList.vue'
import ListaMarcas from '../views/BrandList.vue'
import ListaClasificacion from '../views/ClassificationList.vue'
import ClassificationEdit from '../views/ClassificationEdit.vue'
import AddColor from '../views/AddColor.vue'
import EditColor from '../views/EditColor.vue'
import ListColor from '../views/ListColor.vue'


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
      path: '/Philosophy',
      name: 'Philosophy',
      component: Philosophy
    },
    {
      path: '/History',
      name: 'History',
      component: History
    },
    {
      path: '/Products',
      name: 'Products',
      component: Products,
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
      path: '/AddBrand',
      name: 'AddBrand',
      component: AddBrand,
      meta : {
        requiresAuth: true
      }
    },
    {
      path: '/BrandEdit',
      name: 'BrandEdit',
      component: EditarMarca,
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
      path: '/ArticleList',
      name: 'ArticleList',
      component: ListaProductos,
      meta : {
        requiresAuth: true
      }
    },
    {
      path: '/BrandList',
      name: 'BrandList',
      component: ListaMarcas,
      meta : {
        requiresAuth: true
      }
    },

    {
        path: '/AddClassification',
        name: 'AddClassification',
        component: AddClassification,
        meta : {
          requiresAuth: true
        }
    },
    {
        path: '/EditClassification',
        name: 'EditClassification',
        component: ClassificationEdit,
        meta : {
          requiresAuth: true
        }
    },
    {
      path: '/ClassificationList',
      name: 'ClassificationList',
      component: ListaClasificacion,
      meta : {
        requiresAuth: true
      }
    },
    {
      path: '/AddColor',
      name: 'AddColor',
      component: AddColor,
      meta : {
        requiresAuth: true
      }
  },
  {
    path: '/EditColor',
    name: 'EditColor',
    component: EditColor,
    meta : {
      requiresAuth: true
    }
},
{
  path: '/ListColor',
  name: 'ListColor',
  component: ListColor,
  meta : {
    requiresAuth: true
  }
},







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
