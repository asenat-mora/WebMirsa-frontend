<template>

<div class="body-register-marca">
   <div class="register-container-marca">
      <header>EDITAR ACCESORIO</header>
        <form class="form-register-marca" action = "#" @submit.prevent="">
            <div class="form-first">
                <div class="details-marca">
                    <!-- <span class="title">EDITAR ACCESORIO</span> -->
                    <div class="fields">
                        <div class="input-field-b">
                            <label>Seleccionada</label>
                            <select v-model="accesorySelected" @change="loadName">
                                <option selected disabled >Seleccione una clasificación</option>
                                <option v-for="accesory in accesories" :value = "accesory.id">
                                    {{accesory.name}}
                                </option>
                            </select>
                        </div>
                        <div class="input-field-b">

                            <label>Nombre</label>
                            <input type="text" placeholder="Nuevo nombre" required v-model="accesoryName">
                        </div>
                    </div>
                </div>
                <div class="details-btns">
                    <button class="deletebtn" @click="deleteAccessory">
                        <span class="btnEliminar">Eliminar</span>
                    </button>
                    <button class="updatelbtn" @click="updateAccessory">
                        <span class="btnActualizar">Actualizar</span>      
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
    import { ref , onBeforeMount} from 'vue';
    export default{
        name: 'AccesoryEdit',
        components: {
            Navbar
        },
        setup(){
            var accesorySelected = ref(null);
            var accesoryName = ref(null);
            const accesories = ref(null);

            function getAllAccessories(){
                axios.get(import.meta.env.VITE_API_URL + '/api/accessory')
                .then(response => {
                    accesories.value = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
            }

            function loadName (){
                accesoryName.value = accesories.value.filter(accesory => accesory.id == accesorySelected.value)[0].name;
            }

            function deleteAccessory(){
                axios.delete(import.meta.env.VITE_API_URL + '/api/accessory/' + accesorySelected.value)
                .then(response => {
                    alert("¡Registro eliminado!");
                    getAllAccessories();
                    accesorySelected.value= null;
                    accesoryName.value = null;
                })
                .catch(error => {
                    console.log(error);
                    alert("¡Error en el registro!");
                });
            }

            function updateAccessory(){
                axios.patch(import.meta.env.VITE_API_URL + '/api/accessory/' + accesorySelected.value,
                {
                    name: accesoryName.value
                }
                )
                .then(response => {
                    alert("¡Registro actualizado!");
                    getAllAccessories();
                    accesorySelected.value= null;
                    accesoryName.value = null;
                })
                .catch(error => {
                    console.log(error);
                    alert("¡Error en el registro!");
                });
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
                if(!/^[a-zA-Z ]+$/.test(accesoryName.value)){
                    errors.value.name = 'El nombre debe contener solo letras'
                    vName.value = true
                    console.log(accesoryName.value);
                }
                
            }

            function validateForm(){
                errors.value = {};
                checkName();

                if(!vName.value){
                    updateBrand();
                }
            }

            onBeforeMount(() => {
                getAllAccessories();
            })

            return{

                accesorySelected,
                accesoryName ,
                accesories,
                getAllAccessories,
                loadName,
                deleteAccessory,
                updateAccessory,
                checkName,
                validateForm
                
            }
        }
    }
</script>