<template>
    <div class="bodyNav">
        <nav>
            <div class="divNav">
                <i class='bx bx-menu' @click="menuOpenBtn"></i>
                
                <div class="logoNav">
                   <!--  <a href="#">MIRSA</a> -->
                    <img class="nav-logo" src="../assets/img/logo-white-mirsa.png" alt="">
                </div>
                <div class="navlinks" ref="navLinks">
                    <div class="sidebarLogo">
                        <span class="menuNav">MENU</span>
                        <i class='bx bx-x' @click="menuCloseBtn"></i>
                    </div>
                    <ul class="links-option">
                        <li><router-link to="/">INICIO</router-link></li>

                        <template v-if="store.getIsLoggedIn">
                        
                            <!-- <template v-if="store.getIsAdmin"> -->
                                <li>
                                    <a href="#">CAT&Aacute;LOGO</a>
                                    <i class='bx bxs-chevron-down htmlcss-arrow arrow' @click="htmlcssArrow"></i>
                                    <ul class="htmlCss-sub-menu sub-menu">
                                  
                                        <li class="more">
                                            <span><a href="#">Marcas</a>
                                                <i class='bx bxs-chevron-right arrow more-arrow'></i>
                                            </span>
                                            <ul class="more-sub-menu sub-menu">   
                                                <li><router-link to="/AddBrand">Nuevo</router-link></li>
                                                <li><router-link to="/BrandEdit">Editar</router-link></li>
                                                <li><router-link to="/BrandList">Lista</router-link></li>
                                            </ul>
                                        </li>
                                        <li class="more">
                                            <span><a href="#">Accesorios</a>
                                                <i class='bx bxs-chevron-right arrow more-arrow'></i>
                                            </span>
                                            <ul class="more-sub-menu sub-menu">   
                                                <li><router-link to="/AddClassification">Nuevo</router-link></li>
                                                <li><router-link to="/EditClassification">Editar</router-link></li>
                                                <li><router-link to="/ClassificationList">Lista</router-link></li>
                                            </ul>
                                        </li>
                                        <li class="more">
                                            <span><a href="#">Productos</a>
                                                <i class='bx bxs-chevron-right arrow more-arrow'></i>
                                            </span>
                                            <ul class="more-sub-menu sub-menu">   
                                                <li><router-link to="/article">Nuevo</router-link></li>
                                                <li><router-link to="/editProducto">Editar</router-link></li>
                                                 <li><router-link to="/ArticleList">Lista</router-link></li>
                                                <!-- <li><a href="#">Editar</a></li> -->
                                            </ul>
                                        </li>
                                        
                                    </ul>
                                </li>
                                <template v-if="store.getIsAdmin">
                                    <li><a href="#">REPORTE</a></li>
                                    <li><a href="#">USUARIOS</a></li>
                                </template>
                            <!-- </template>
                            <template v-else>
                                <li><a href="#">PUBLICIDAD</a></li>
                            </template> -->
                        
                            <li>
                                <a href="#">MI PERFIL</a>
                                <i class='bx bxs-chevron-down js-arrow arrow' @click="moreSubMenu"></i>
                                <ul class="js-sub-menu sub-menu">
                                    <li><a href="#">Configuración</a></li>
                                    <li><a href="#" @click="handleLogoutButton">Cerrar sesión</a></li>
                                </ul>
                            </li>
                        </template>

                         <!-- menu vistas al publico -->
                        <template v-else>
                            <li><a href="#">FILOSOFÍA</a></li>
                            <li><a href="#">HISTORIA</a></li>
                            <li>
                                <router-link to ="/productosMirsa">PRODUCTOS</router-link> 
                            </li>
                            <li><a href="#">COTIZACIÓN</a></li>
                            <li >
                                <router-link to ="/login">INICIAR SESION</router-link> 
                            </li>
                        </template>

                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>


<script>
import { ref } from 'vue'
import { authStore } from '../stores/auth';
import { useRouter } from 'vue-router';
export default {
    setup(){
        const navLinks = ref('');
        const store = authStore();
        const router = useRouter();
            
        function handleLogoutButton (){
            store.logout()
                .then (() => {
                    router.push('/')
                }).catch(() => {
                    router.push('/')
                })
        }
        function menuOpenBtn () {
            navLinks.value.style.left = "0";
        }
        function menuCloseBtn () {
            navLinks.value.style.left = "-100%";
        }

        function htmlcssArrow() {
            navLinks.value.classList.toggle("show1");
        }

        function moreSubMenu() {
            navLinks.value.classList.toggle("show3");
        }

        return {
            navLinks,
            menuOpenBtn,
            menuCloseBtn,
            htmlcssArrow,
            moreSubMenu,
            store,
            handleLogoutButton
        }
    }

}

</script>

<style scoped>
/* aqui van las cositas que solo van a modificar esta vista  */




</style>




