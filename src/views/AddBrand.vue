
<template>

<div class="body-register-marca">
   <div class="register-container-marca">
      <header>ALTA DE MARCA</header>
        <form class="form-register-marca">
            <div class="form-first">
                <div class="details-marca">
                    <span class="title">DETALLES DE MARCA</span>
                    <div class="fields">
                        <div class="input-field-b">
                            <label>Nombre*</label>
                            <input type="text" placeholder="Nombre de la marca" v-model="brandName">
                            <div class="error" v-if="vName"> {{ errors.name }}</div>
                        </div>
                    </div>
                </div>
                <div class="details-btns">  
                    <button class="savebtn" type="button" @click="validateForm">
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
            var vName = ref(false);
            var errors = ref(null)

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

            function checkName(){
                if(!brandName){
                    vName.value = true;
                    errors.name = "El nombre de la marca es requerido";
                }

                if(brandName.length < 3 || brandName.length > 20){
                    vName.value = true;
                    errors.name = "El nombre de la marca debe tener entre 3 y 20 caracteres";
                }
            }

            function validateForm(){
                errors.value = {};
                checkName();

                if(!vName){
                    createBrand();
                }
            }

            
            return{
                brandName,
                createBrand,
                validateForm,
                errors,
                checkName,
                vName

            }
        }
    }
</script> 