<template>

<div class="body-register-category">
   <div class="register-container-category">
      <header>ALTA DE ACCESORIO</header>
        <form class="form-register-category" @submit.prevent="validateForm">
            <div class="form-first">
                <div class="details-category">
                    <!-- <span class="title">Detalle</span> -->
                    <div class="fields">
                        <div class="input-field-b">
                            <label>Nombre del Accesorio*</label>
                            <input type="text" placeholder="Tipo de accesorio" v-model="accesoryName">
                            <div class="error" v-if="vName"> {{ errors.name }}</div>
                        </div>
                    </div>
                </div>
                <div class="details-btns">
                    <button type="button" class="cancelbtn" @click="goBack($event)">
                            <span class="btnCancelar">Volver</span>
                    </button>
                    <button class="savebtn" type="submit">
                        <span class="btnGuardar">Registrar</span> <!-- @click="createAccesory" -->
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
    import Navbar from '@/components/Navbar.vue';
    import { notify } from "@kyvg/vue3-notification"; /* libreria para importar alertas */
    import axios from 'axios';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    export default{
        name: 'AddAccesory',
        components: {
            Navbar
        },
        setup(){
            var accesoryName = ref(null);
            var errors = ref(null);
            var vName = ref(null);
            var router = useRouter();

            const fieldsMap = {
                name: "Nombre",
                key: "Clave"
            }

            function createAccesory(){
                axios.post(import.meta.env.VITE_API_URL + '/api/accessory', 
                {
                    name: accesoryName.value
                }
                )
                .then(response => {
                    notify({title: "Exito", text: "¡Registro exitoso!", type: "success"});
                    accesoryName.value = null;
                })
                .catch(error => {
                     if(error.response.status === 409){
                        /* Validar duplicidad de datos */
                        notify({title: "Advertencia", text: "¡El nombre " + fieldsMap[error.response.data.target] + " ya existe!", type: "warn"});
                    }else{
                        notify({title: "Error", text: "¡Error en el registro!", type: "error"});
                    }
                })
            }
            function checkName(){
                /* Busca que el nombre este definido */
                if(!accesoryName.value){
                    vName.value = true;
                    errors.value.name = "El nombre del accesorio es requerido";
                    return;
                }
                /*quita espacios y los guarda en otra variable */
                let nameNoSpace = accesoryName.value.replace(/ /g, '');
                /* checa la longitud de la cadena, sin contar espacios */
                if(nameNoSpace.length < 3 || nameNoSpace.length > 20){
                    vName.value = true;
                    errors.value.name = "El nombre del accesorio debe tener entre 3 y 20 caracteres";
                    return;
                }
                /* valida los caracteres aceptados */
                if(!/^[a-zA-Z ]+$/.test(accesoryName.value)){
                    errors.value.name = 'El nombre debe contener solo letras'
                    vName.value = true
                }
            }

            function validateForm(){
                errors.value = {};
                vName.value = false;

                checkName();
                
                if(!vName.value){
                    createAccesory();
                }
            }

            function goBack(event){
                event.preventDefault();
                router.back();
            }

            return {
                errors,
                accesoryName,
                vName,
                checkName,
                validateForm,
                createAccesory,
                fieldsMap,
                router, 
                goBack
                
            }

        }
    }
</script>