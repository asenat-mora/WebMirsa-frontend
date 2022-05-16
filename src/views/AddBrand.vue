
<template>
<Navbar/>
<div class="body-register-marca">
   <div class="register-container-marca">
      <header>Alta de Marca</header>
        <form class="form-register-marca" action="#" @submit.prevent="createBrand" >
            <div class="form-first">
                <div class="details-marca">
                    <span class="title">Detalles de la Marca</span>
                    <div class="fields">
                        <div class="input-field">
                            <label>Nombre</label>
                            <input type="text" placeholder="Nombre de la marca" v-model="brandName" required>
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