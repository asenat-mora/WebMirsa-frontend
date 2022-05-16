<template>
<Navbar/>
<div class="body-register-category">
   <div class="register-container-category">
      <header>Clasificacion</header>
        <form class="form-register-category" action="#" @submit.prevent="">
            <div class="form-first">
                <div class="details-category">
                    <span class="title">Detalle</span>
                    <div class="fields">
                        <div class="input-field">
                            <label>Nombre</label>
                            <input type="text" placeholder="tipo de articulo" v-model="clasificationName" required>
                        </div>
                    </div>
                </div>
                <div class="details-btns">
                    <button class="savebtn">
                        <span class="btnGuardar" @click="createCategory">Guardar</span> 
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
        name: 'AddCategory',
        components: {
            Navbar
        },
        setup(){
            var clasificationName = ref(null);

            function createCategory(){
                axios.post(import.meta.env.VITE_API_URL + '/api/autopart', 
                {
                    name: clasificationName.value
                }
                )
                .then(response => {
                    alert("¡Registro exitoso!");
                    clasificationName.value = null;
                })
                .catch(error => {
                    alert("¡Error al registrar!");
                    console.log(error)
                })
            }

            return {
                clasificationName,
                createCategory
            }

        }
    }
</script>