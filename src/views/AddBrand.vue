
<script setup>
    import Navbar from '@/components/Navbar.vue';
</script>

<template>
<Navbar/>
<div class="body-register-marca">
   <div class="register-container-marca">
      <header>Alta de Marca</header>
        <form class="form-register-marca" action="#">
            <div class="form-first">
                <div class="details-marca">
                    <span class="title">Detalles de la Marca</span>
                    <div class="fields">
                        <div class="input-field">
                            <label>Nombre</label>
                            <input type="text" placeholder="Nombre de la marca" required>
                        </div>
                    </div>
                </div>
                <div class="details-btns">
                    <!-- <button class="deletebtn">
                        <span class="btnEliminar">Eliminar</span>
                    </button>
                    <button class="updatelbtn">
                        <span class="btnActualizar">Actualizar</span>
                    </button>    -->     
                    <button class="savebtn">
                        <span class="btnGuardar">Guardar</span> 
                    </button>
                    <button class="cancelbtn">
                        <span class="btnCancelar">Cancelar</span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<!-- <script>
    import Navbar from '@/components/Navbar.vue';
    import axios from 'axios';
    import axiosInstance from '../helpers/axiosInstance';
    /* import { onBeforeMount , ref} from 'vue'; */
    export default{
        name: 'AddBrand',
        components: {
            Navbar
        },
        setup(){
            var brands= ref(null);

            function createBrand(){
                const Brand = {
                    name: brandName.value,
                }
                axios.post(import.meta.env.VITE_API_URL + '/api/brand', brand)
                .then(response => {
                    alert("¡Registro exitoso!");
                    console.log(response);
                }).catch(error => {
                    console.log(error);
                alert("¡Error en el registro!");
                });
            }
            return{
               BrandName,
            }
        }
    }
</script> -->