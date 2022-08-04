<template>

<div class="body-register-category">
   <div class="register-container-category">
      <header>ALTA DE ACCESORIO</header>
        <form class="form-register-category" action="#" @submit.prevent="validateForm">
            <div class="form-first">
                <div class="details-category">
                    <!-- <span class="title">Detalle</span> -->
                    <div class="fields">
                        <div class="input-field-b">
                            <label>Nombre del Accesorio*</label>
                            <input type="text" placeholder="tipo de accesorio" v-model="accesoryName">
                            <div class="error" v-if="vName"> {{ errors.name }}</div>
                        </div>
                        <!-- <div class="input-field-b">
                            <label>Clave*</label>
                            <input type="text" placeholder="Clave del accesorio" v-model="key">
                            <div class="error" v-if="vKey"> {{ errors.key }}</div>
                        </div> -->
                    </div>
                </div>
                <div class="details-btns">
                    <button class="savebtn">
                        <span class="btnGuardar">Guardar</span> <!-- @click="createAccesory" -->
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
        name: 'AddClassification',
        components: {
            Navbar
        },
        setup(){
            var accesoryName = ref(null);
            var errors = ref(null);
            var vName = ref(null);

            function createAccesory(){
                axios.post(import.meta.env.VITE_API_URL + '/api/accessory', 
                {
                    name: accesoryName.value,
                }
                )
                .then(response => {
                    alert("¡Registro exitoso!");
                    accesoryName.value = null;
                })
                .catch(error => {
                    alert("¡Error al registrar!");
                    console.log(error)
                })
            }
            function checkName(){
                /* Busca que el nombre este definido */
                if(!accesoryName.value){
                    vName.value = true;
                    errors.value.name = "El nombre del accesorio es requerido";
                    return;
                }
                /* checa la longitud de la cadena, sin contar espacios */
                if(accesoryName.value.length < 3 || accesoryName.value.length > 20){
                    vName.value = true;
                    errors.value.name = "El nombre del accesorio debe tener entre 3 y 20 caracteres";
                    return;
                }
                /* valida los caracteres aceptados */
                if(!/^[a-zA-Z ]+$/.test(accesoryName)){
                    errors.value.name = 'El nombre debe contener solo letras'
                    vName.value = true
                }
            }

            function validateForm(){
                errors.value = {};
                checkName();
                if(!vName){
                    createAccesory();
                }
            }

            return {
                validateForm,
                accesoryName,
                createAccesory,
                vName,
                checkName,
                errors
            }

        }
    }
</script>