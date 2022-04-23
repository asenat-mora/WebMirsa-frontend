<template>
    <div class="bodyNa">
        <nav>
            <div class="divNav">
                <i class='bx bx-menu' @click="menuOpenBtn"></i>
                <div class="logoNav"><a href="#">MIRSA</a></div>
                <div class="navlinks" ref="navLinks">
                    <div class="sidebarLogo">
                        <span class="menuNav">MENU</span>
                        <i class='bx bx-x' @click="menuCloseBtn"></i>
                    </div>
                    <ul class="links-option">
                        <li><a href="#">INICIO</a></li>
                        <li>
                            <a href="#">CATALOGO</a>
                            <i class='bx bxs-chevron-down htmlcss-arrow arrow' @click="htmlcssArrow"></i>
                            <ul class="htmlCss-sub-menu sub-menu">
                                <li><a href="#">Producto</a></li>
                                <li><a href="#">Marca</a></li>
                                <li><a href="#">Categoria</a></li>
                                <!-- <li class="more">
                    <span><a href="#">More</a>
                    <i class='bx bxs-chevron-right arrow more-arrow'></i>
                  </span>
                    <ul class="more-sub-menu sub-menu">
                      <li><a href="#">Neumorphism</a></li>
                    
                    </ul>
                  </li> -->

                            </ul>
                        </li>
                        <li>
                            <a href="#">PUBLICIDAD</a>
                            <!-- <i class='bx bxs-chevron-down js-arrow arrow '></i>
                <ul class="js-sub-menu sub-menu">
                  <li><a href="#">Carrusel</a></li>
                </ul> -->
                        </li>
                        <li><a href="#">REPORTE</a></li>
                        <li><a href="#">PERFILES</a></li>
                        <li>
                            <a href="#">MI PERFIL</a>
                            <i class='bx bxs-chevron-down js-arrow arrow' @click="moreSubMenu"></i>
                            <ul class="js-sub-menu sub-menu">
                                <li><a href="#">Configuración</a></li>
                                <li><a href="#">Cerrar sesión</a></li>
                            </ul>
                        </li>

                    </ul>
                </div>
                <!-- <div class="search-box">
            <i class='bx bx-search'></i>
            <div class="input-box">
              <input type="text" placeholder="Search...">
            </div>
          </div> -->
            </div>
        </nav>
    </div>
</template>


<script>
import { ref, onMounted } from 'vue'
export default {
    setup(){
        const navLinks = ref(null);

        onMounted(() => {
            navLinks.value.focus();
        })

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
            moreSubMenu
        }
    }

}

</script>




