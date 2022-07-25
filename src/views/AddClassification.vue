<template>

<div class="body-register-category">
   <div class="register-container-category">
      <header>ALTA DE ACCESORIO</header>
        <form class="form-register-category" action="#" @submit.prevent="createClassification">
            <div class="form-first">
                <div class="details-category">
                    <!-- <span class="title">Detalle</span> -->
                    <div class="fields">
                        <div class="input-field-b">
                            <label>Nombre del autoparte</label>
                            <input type="text" placeholder="tipo de accesorio" v-model="classificationName" required>
                        </div>
                    </div>
                </div>
                <div class="details-btns">
                    <button class="savebtn">
                        <span class="btnGuardar">Guardar</span> <!-- @click="createClassification" -->
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
            var classificationName = ref(null);

            function createClassification(){
                axios.post(import.meta.env.VITE_API_URL + '/api/accessory', 
                {
                    name: classificationName.value
                }
                )
                .then(response => {
                    alert("¡Registro exitoso!");
                    classificationName.value = null;
                })
                .catch(error => {
                    alert("¡Error al registrar!");
                    console.log(error)
                })
            }

            return {
                classificationName,
                createClassification
            }

        }
    }
</script>