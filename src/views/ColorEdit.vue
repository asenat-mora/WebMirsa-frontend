<template>

<div class="body-register-marca">
   <div class="register-container-marca">
      <header>EDITAR COLOR</header>
        <form class="form-register-marca">
            <div class="form-first">
                <div class="details-marca">
                    <!-- <span class="title">EDITAR MARCA</span> -->
                    <div class="fields">
                        <div class="input-field-b">
                            <label>Seleccionada</label>
                            <select v-model="colorSelected" @change="loadName">
                                <option selected disabled >Seleccione un color</option>
                                <option v-for="color in colors" :value = "color.id">
                                    {{color.name}}
                                </option>
                            </select>
                        </div>
                        <div class="input-field-b">
                            <label>Nombre</label>
                            <input type="text" placeholder="Nuevo nombre" required v-model="colorName">
                            <div class="error" v-if="vName"> {{ errors.name }}</div>
                        </div>
                    </div>
                </div>
                <div class="details-btns">
                    <button class="deletebtn" type="button" @click="deleteColor">
                        <span class="btnEliminar">Eliminar</span>
                    </button>
                    <button class="updatelbtn" type="button" @click="validateForm">
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
    import { notify } from "@kyvg/vue3-notification";
    import axios from 'axios';
    import { ref , onBeforeMount} from 'vue';
    export default{
        name: 'ColorEdit',
        components: {
            Navbar
        },
        setup(){
            var colorSelected = ref(null);
            var colorName = ref(null);
            const colors = ref(null);
            var errors = ref(null);
            var vName = ref(false);

            function getAllColors(){
                axios.get(import.meta.env.VITE_API_URL + '/api/color')
                .then(response => {
                    colors.value = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
            }

            function loadName (){
                colorName.value = colors.value.filter(color => color.id == colorSelected.value)[0].name;
            }

            function deleteColor(){
                /* resetea los valores del formulario */
                errors.value = {};
                vName.value = false;

                axios.delete(import.meta.env.VITE_API_URL + '/api/color/' + colorSelected.value)
                .then(response => {
                    notify({title: "Exito", text: "¡Registro eliminado!", type: "success"});
                    getAllColors();
                    colorSelected.value= null;
                    colorName.value = null;
                })
                .catch(error => {
                    console.log(error);
                    notify({title: "Error", text: "¡Error al eliminar!", type: "error"});
                });
            }

            function updateColor(){
                axios.patch(import.meta.env.VITE_API_URL + '/api/color/' + colorSelected.value,
                {
                    name: colorName.value
                }
                )
                .then(response => {
                    notify({title: "Exito", text: "¡Registro actualizado!", type: "success"});
                    getAllColors();
                    colorSelected.value= null;
                    colorName.value = null;
                })
                .catch(error => {
                    console.log(error);
                    notify({title: "Error", text: "¡Error al actualizar!", type: "error"});
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
                    updateColor();
                }
            }
            onBeforeMount(() => {
                getAllColors();
            })

            return{
                colorSelected,
                colorName,
                colors,
                getAllColors,
                loadName,
                deleteColor,
                updateColor,
                checkName,
                validateForm,
                errors,
                vName
            }
        }
    }
</script>