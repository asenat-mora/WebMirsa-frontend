<template>

<div class="body-register-marca">
   <div class="register-container-marca">
      <header>ALTA DE COLOR</header>
        <form class="form-register-marca"  @submit.prevent="validateForm">
            <div class="form-first">
                <div class="details-marca">
                   <!--  <span class="title">DETALLES DE MARCA</span> -->
                    <div class="fields">
                        <div class="input-field-b">
                            <label>Nombre</label>
                            <input type="text" placeholder="Nombre del color" v-model="colorName">
                            <div class="error" v-if="vName"> {{ errors.name }}</div>
                        </div>
                    </div>
                </div>
                <div class="details-btns">  
                    <button class="savebtn" type="submit">
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
        name: 'AddColor',
        components: {
            Navbar
        },
        setup(){
            var colorName = ref(null);
            var errors = ref(null);
            var vName = ref(false);


            function createColor(){
                axios.post(import.meta.env.VITE_API_URL + '/api/color', 
                {
                    name: colorName.value
                }
                )
                .then(response => {
                    alert("¡Registro exitoso!");
                    colorName.value = null;
                }).catch(error => {
                    console.log(error);
                alert("¡Error en el registro!");
                });
            }

            
            function checkName(){
                /* Busca que el nombre este definido */
                if(!colorName.value){
                    vName.value = true;
                    errors.value.name = "El nombre del color es requerido";
                    return;
                }
                /*quita espacios y los guarda en otra variable */
                let nameNoSpace = colorName.value.replace(/ /g, '');
                /* checa la longitud de la cadena, sin contar espacios */
                if(nameNoSpace.length < 3 || nameNoSpace.length > 20){
                    vName.value = true;
                    errors.value.name = "El nombre del color debe tener entre 3 y 20 caracteres";
                    return;
                }
                /* valida los caracteres aceptados */
                if(!/^[a-zA-Z ]+$/.test(colorName.value)){
                    errors.value.name = 'El nombre debe contener solo letras'
                    vName.value = true
                }
            }
            
            function validateForm(){
                errors.value = {};
                vName.value = false;
                checkName();

                if(!vName.value){
                    createColor();
                }
            }

            return{
               colorName,
               errors,
               vName,
               checkName,
               createColor,
               validateForm
            }
        }
    }
</script> 