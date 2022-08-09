<template>

<div class="body-register-marca">
   <div class="register-container-marca">
      <header>ALTA DE MARCA</header>
        <form class="form-register-marca" @submit.prevent="validateForm">
            <div class="form-first">
                <div class="details-marca">
                    <span class="title">DETALLES DE MARCA</span>
                    <div class="fields">
                        <div class="input-field-b">
                            <label>Nombre*</label>
                            <input type="text" placeholder="Nombre de la marca" v-model="brandName" >
                            <div class="error" v-if="vName"> {{ errors.name }}</div>
                        </div>
                        <div class="input-field-b">
                            <label>Clave*</label>
                            <input type="text" placeholder="Clave de la marca" v-model="key" >
                            <div class="error" v-if="vkey"> {{ errors.key }}</div>
                        </div>
                    </div>
                </div>
                <div class="details-btns">  
                    <button class="savebtn" type="submit" >
                        <span class="btnGuardar">Guardar</span> 
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
            var key = ref(null);
            
            var errors = ref(null);
            var vkey = ref(false);
            var vName = ref(false);

            function createBrand(){
                
                axios.post(import.meta.env.VITE_API_URL + '/api/brand', 
                {
                    name: brandName.value,
                    key: key.value
                }
                )
                .then(response => {
                    alert("¡Registro exitoso!");
                    brandName.value = null;
                    key.value = null;
                }).catch(error => {
                    console.log(error);
                alert("¡Error en el registro!");
                });
            }

            function checkName(){
                /* Busca que el nombre este definido */
                if(!brandName.value){
                    vName.value = true;
                    errors.value.name = "El nombre de la marca es requerido";
                    return;
                }
                /* checa la longitud de la cadena, sin contar espacios */
                if(brandName.value.length < 3 || brandName.value.length > 20){
                    vName.value = true;
                    errors.value.name = "El nombre de la marca debe tener entre 3 y 20 caracteres";
                    return;
                }
                /* valida los caracteres aceptados */
                if(!/^[a-zA-Z ]+$/.test(brandName.value)){
                    errors.value.name = 'El nombre debe contener solo letras'
                    vName.value = true
                }
            }
            
            function checkKey(){
                /* Busca que la clave este definida */
                if(!key.value){
                    vkey.value = true;
                    errors.value.key = "La clave es requerida";
                    return;
                }
                /* checa la longitud de la cadena, sin contar espacios */
                if(key.value.length < 3 || key.value.length > 20){
                    vkey.value = true;
                    errors.value.key = "La clave de marca debe tener entre 3 y 20 caracteres";
                    return;
                }
                /* valida los caracteres aceptados */
                if(!/^[a-zA-Z ]+$/.test(key.value)){
                    vkey.value = true
                    errors.value.key = 'La clave debe contener solo letras'
                    
                }
            }

            function validateForm(){
                errors.value = {};
                checkName();
                checkKey();

                if(!vName.value && !vkey.value){
                    createBrand();
                }
            }
            
            return{
                brandName,
                createBrand,
                validateForm,
                errors,
                checkName,
                checkKey,
                vName,
                vkey,
                key

            }
        }
    }
</script> 