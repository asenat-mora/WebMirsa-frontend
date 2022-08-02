
<template>

<div class="body-register-marca">
   <div class="register-container-marca">
      <header>ALTA DE COLOR</header>
        <form class="form-register-marca" action="#" @submit.prevent="createBrand" >
            <div class="form-first">
                <div class="details-marca">
                   <!--  <span class="title">DETALLES DE MARCA</span> -->
                    <div class="fields">
                        <div class="input-field-b">
                            <label>Nombre</label>
                            <input type="text" placeholder="Nombre del color" v-model="brandName" required>
                            <div>Error</div>
                        </div>
                    </div>
                </div>
                <div class="details-btns">  
                    <button class="savebtn" type="submit">
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

<script>
    import Navbar from '@/components/Navbar.vue';
    import axios from 'axios';
    import { ref } from 'vue';
    export default{
        name: 'AddBrand',
        components: {
            Navbar
        },
        setup(){
            var brandName = ref(null);


            function createBrand(){
                
                axios.post(import.meta.env.VITE_API_URL + '/api/brand', 
                {
                    name: brandName.value
                }
                )
                .then(response => {
                    alert("¡Registro exitoso!");
                    brandName.value = null;
                }).catch(error => {
                    console.log(error);
                alert("¡Error en el registro!");
                });
            }

            
            return{
               brandName,
               createBrand,
            }
        }
    }
</script> 