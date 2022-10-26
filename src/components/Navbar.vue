<template>

  <header>

    <!-- <div class="logo">Mirsa</div> -->

    <!-- logotipo -->
    <img class="logo-navbar" src="../assets/img/logo.png" alt="" />

    <!-- responsive -->
    <input type="checkbox" id="menu-bar">
    <label for="menu-bar">MENU</label>

    <!-- menu -->
    <nav class="menu">
      <ul>
        <!-- menu al publico -->
        <li>
          <router-link to="/">INICIO</router-link>
        </li>
        <li><a href="/Philosophy">FILOSOFIA</a>
          <!-- <ul>
                    <li><a href="#">op1</a></li>
                    <li><a href="#">op2 +</a>
                        <ul>
                            <li><a href="#">sub1</a></li>
                            <li><a href="#">sub1</a></li>
                            <li><a href="#">sub1</a></li>
                        </ul>
                    </li>
                  </ul> -->
        </li>
        <li><a href="/History">HISTORIA</a></li>
        <li><a href="/productSearch">PRODUCTOS</a></li>
        <li><a href="/Cotizacion">COTIZACIÓN</a></li>
        <li>
          <router-link to="/login">ACCESO</router-link>
        </li>
    
        <!-- menu para usuarios logeados -->
    
        <!-- Catalogos -->
        <li><a href="#">CAT&Aacute;LOGOS +</a>
          <ul>
            <!-- Marcas -->
            <li><a href="#">MARCAS+</a>
              <ul>
                <li>
                  <router-link to="/BrandList">DETALLE</router-link>
                </li>
                <li><a href="#">SUBMARCAS+</a>
                  <ul>
                    <li>
                      <router-link to="/SubBrandList">DETALLE</router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <!-- Accesorios -->
            <li><a href="#">ACCESORIOS+</a>
              <ul>
                <li>
                  <router-link to="/AccesoryList">DETALLE</router-link>
                </li>
              </ul>
            </li>
            <!-- Productos -->
            <li><a href="#">PRODUCTOS+</a>
              <ul>
                <li>
                  <router-link to="/AddProduct">NUEVO</router-link>
                </li>
                <li>
                  <router-link to="/productSearch">DETALLE</router-link>
                </li>
              </ul>
            </li>
            <!-- Colores -->
            <li><a href="#">COLORES+</a>
              <ul>
                <li>
                  <router-link to="/ColorList">DETALLE</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <!-- Usuarios -->
        <li><a href="#">USUARIOS+</a>
          <ul>
            <li>
              <router-link to="/AddUser">NUEVO</router-link>
            </li>
            <li>
              <router-link to="/UserList">DETALLE</router-link>
            </li>
          </ul>
        </li>
        <!-- Cerrar sesión -->
        <li><a href="#" @click="handleLogoutButton">CERRAR SESI&Oacute;N</a></li>
    
    
    
      </ul>
    </nav>
  </header>

</template>


<script>
import { ref } from "vue";
import { authStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const navLinks = ref("");
    const store = authStore();
    const router = useRouter();

    function handleLogoutButton() {
      store
        .logout()
        .then(() => {
          router.push("/");
        })
        .catch(() => {
          router.push("/");
        });
    }
    function menuOpenBtn() {
      navLinks.value.style.left = "0";
    }
    function menuCloseBtn() {
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
      handleLogoutButton,
    };
  },

};
</script>

<style scoped>
/* aqui van las cositas que solo van a modificar esta vista  */
</style>
