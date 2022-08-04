<template>

  <nav>
    <div class="divNav">
      <div class="bars-menu">
        <font-awesome-icon icon="fa-solid fa-bars" @click="menuOpenBtn" />
      </div>
      <div class="logoNav">
        <!-- logotipo -->
        <img class="logo-navbar" src="../assets/img/logo.png" alt="" />
      </div>
      <div class="navlinks" ref="navLinks">
        <div class="sidebarLogo">
          <span class="menuNav">MENU</span>
          <div class="xmark">
            <font-awesome-icon icon="fa-solid fa-xmark" @click="menuCloseBtn" />
          </div>
          <!-- x del navbar -->
        </div>
        <ul class="option-menu">
          <li>
            <router-link to="/">INICIO</router-link>
          </li>

          <!-- menu para usuarios logeados -->
          <template v-if="store.getIsLoggedIn">
            <li>
              <a href="#">CATALAGO</a><!-- CAT&Aacute;LOGO -->
              <div class="arrow spin-arrow">
                <font-awesome-icon icon="fa-solid fa-chevron-down" @click="htmlcssArrow" />
              </div>
              <ul class="options-group sub-menu">
                <li class="option-sub-menu">
                  <span><a href="#">MARCAS</a>
                    <div class="arrow more-arrow">
                      <font-awesome-icon icon="fa-solid fa-angle-right" />
                    </div>
                  </span>
                  <ul class="more-sub-menu sub-menu">
                    <li>
                      <router-link to="/AddBrand">NUEVO</router-link>
                    </li>
                    <li>
                      <router-link to="/BrandEdit">EDITAR</router-link>
                    </li>
                    <li>
                      <router-link to="/BrandList">LISTA</router-link>
                    </li>
                  </ul>
                </li>
                <li class="option-sub-menu">
                  <span><a href="#">ACCESORIOS</a>
                    <div class="arrow more-arrow">
                      <font-awesome-icon icon="fa-solid fa-angle-right" />
                    </div>
                  </span>
                  <ul class="more-sub-menu sub-menu">
                    <li>
                      <router-link to="/AddAccesory">NUEVO</router-link>
                    </li>
                    <li>
                      <router-link to="/EditClassification">EDITAR</router-link>
                    </li>
                    <li>
                      <router-link to="/ClassificationList">LISTA</router-link>
                    </li>
                  </ul>
                </li>
                <li class="option-sub-menu">
                  <span><a href="#">PRODUCTOS</a>
                    <div class="arrow more-arrow">
                      <font-awesome-icon icon="fa-solid fa-angle-right" />
                    </div>
                  </span>
                  <ul class="more-sub-menu sub-menu">
                    <li>
                      <router-link to="/productCreate">NUEVO</router-link>
                    </li>
                    <li>
                      <router-link to="/productSearch">LISTA</router-link>
                    </li>
                  </ul>
                </li>
                <li class="option-sub-menu">
                  <span><a href="#">COLORES</a>
                    <div class="arrow more-arrow">
                      <font-awesome-icon icon="fa-solid fa-angle-right" />
                    </div>
                  </span>
                  <ul class="more-sub-menu sub-menu">
                    <li>
                      <router-link to="/AddColor">NUEVO</router-link>
                    </li>
                    <li>
                      <router-link to="/EditColor">EDITAR</router-link>
                    </li>
                    <li>
                      <router-link to="/ListColor">LISTA</router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <!-- opciones admin -->
            <template v-if="store.getIsAdmin">
              <!-- <li><a href="#">REPORTE</a></li> -->
              <li><a href="#">USUARIOS</a></li>
            </template>

            <li><a href="#">MI PERFIL</a>
              <div class="arrow spin-arrow">
                <font-awesome-icon icon="fa-solid fa-chevron-down" @click="htmlcssArrow" />
              </div>

              <ul class="js-sub-menu sub-menu">
                <li><a href="#">Configuración</a></li>
                <li>
                  <a href="#" @click="handleLogoutButton">Cerrar sesión</a>
                </li>
              </ul>
            </li>
            <li><a href="#">ADMINISTRADOR</a>
            </li>
          </template>

          <!-- menu al publico -->
          <template v-else>
            <li><a href="/Philosophy">FILOSOFIA</a></li>
            <li><a href="/History">HISTORIA</a></li>
            <li><a href="/productSearch">PRODUCTOS</a></li>
              <!-- <router-link to="/Products">PRODUCTOS</router-link> -->
    
            <li><a href="#">COTIZACIÓN</a></li>
            <li>
              <router-link to="/login">ACCESO</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>

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
