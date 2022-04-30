import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Article from '../views/Article.vue'
import Categoria from '../views/Categoria.vue'
import Marca from '../views/Marca.vue'
import Registro from '../views/UserRegister.vue'
import EditarProducto from '../views/ArticleEdit.vue'
import ProductosMirsa from '../views/Productos.vue'

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
      component: Article
    },
    {
      path: '/categoria',
      name: 'categoria',
      component: Categoria
    },
    {
      path: '/marca',
      name: 'marca',
      component: Marca
    },
    {
      path: '/registro',
      name: 'registro',
      component: Registro
    },
    {
      path: '/editProducto',
      name: 'editProducto',
      component: EditarProducto
    },
    {
      path: '/productosMirsa',
      name: 'productosMirsa',
      component: ProductosMirsa
    }


  ]
})

export default router;
