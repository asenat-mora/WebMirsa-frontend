import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Article from '../views/Article.vue'
import Categoria from '../views/Categoria.vue'
import Marca from '../views/Marca.vue'

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
    }
  ]
})

export default router;
