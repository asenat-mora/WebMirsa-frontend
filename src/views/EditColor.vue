<template>
<Navbar/>
<div class="body-register-marca">
   <div class="register-container-marca">
      <header>EDITAR COLOR</header>
        <form class="form-register-marca" action = "#" @submit.prevent="">
            <div class="form-first">
                <div class="details-marca">
                    <!-- <span class="title">EDITAR MARCA</span> -->
                    <div class="fields">
                        <div class="input-field-b">
                            <label>Seleccionada</label>
                            <select v-model="colorSelected" @change="loadName">
                                <option selected disabled >Seleccione un color</option>
                                <option v-for="color in color" :value = "color.colorId">
                                    {{color.colorName}}
                                </option>
                            </select>
                        </div>
                        <div class="input-field-b">
                            <label>Nombre</label>
                            <input type="text" placeholder="Nuevo nombre" required v-model="colorName">
                        </div>
                    </div>
                </div>
                <div class="details-btns">
                    <button class="deletebtn" @click="deleteColor">
                        <span class="btnEliminar">Eliminar</span>
                    </button>
                    <button class="updatelbtn" @click="editColor">
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
        name: 'EditColor',
        components: {
            Navbar
        },
        setup(){
            var colorSelected = ref(null);
            var colorName = ref(null);
            const colors = ref(null);

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
                colorName.value = colors.value.filter(color => color.colorId == colorSelected.value)[0].colorName;
            }

            function deleteColor(){
                axios.delete(import.meta.env.VITE_API_URL + '/api/color/' + colorSelected.value)
                .then(response => {
                    alert("¡Registro eliminado!");
                    getAllColors();
                    colorSelected.value= null;
                    colorName.value = null;
                })
                .catch(error => {
                    console.log(error);
                    alert("¡Error en el registro!");
                });
            }

            function editColor(){
                axios.patch(import.meta.env.VITE_API_URL + '/api/color/' + colorSelected.value,
                {
                    name: colorName.value
                }
                )
                .then(response => {
                    alert("¡Registro actualizado!");
                    getAllColors();
                    colorSelected.value= null;
                    colorName.value = null;
                })
                .catch(error => {
                    console.log(error);
                    alert("¡Error en el registro!");
                });
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
                editColor
            }
        }
    }
</script>