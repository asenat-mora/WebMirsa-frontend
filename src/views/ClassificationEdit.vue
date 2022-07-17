<template>
<Navbar/>
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
                            <select v-model="classificationSelected" @change="loadName">
                                <option selected disabled >Seleccione una clasificación</option>
                                <option v-for="classification in classifications" :value = "classification.id">
                                    {{classification.name}}
                                </option>
                            </select>
                        </div>
                        <div class="input-field-b">

                            <label>Nombre</label>
                            <input type="text" placeholder="Nuevo nombre" required v-model="classificationName">
                        </div>
                    </div>
                </div>
                <div class="details-btns">
                    <button class="deletebtn" @click="deleteClassification">
                        <span class="btnEliminar">Eliminar</span>
                    </button>
                    <button class="updatelbtn" @click="editClassification">
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
        name: 'ClassificationEdit',
        components: {
            Navbar
        },
        setup(){
            var classificationSelected = ref(null);
            var classificationName = ref(null);
            const classifications = ref(null);

            function getAllClassifications(){
                axios.get(import.meta.env.VITE_API_URL + '/api/accessory')
                .then(response => {
                    classifications.value = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
            }

            function loadName (){
                classificationName.value = classifications.value.filter(classification => classification.id == classificationSelected.value)[0].name;
            }

            function deleteClassification(){
                axios.delete(import.meta.env.VITE_API_URL + '/api/accessory' + classificationSelected.value)
                .then(response => {
                    alert("¡Registro eliminado!");
                    getAllClassifications();
                    classificationSelected.value= null;
                    classificationName.value = null;
                })
                .catch(error => {
                    console.log(error);
                    alert("¡Error en el registro!");
                });
            }

            function editClassification(){
                axios.patch(import.meta.env.VITE_API_URL + '/api/accessory' + classificationSelected.value,
                {
                    name: classificationName.value
                }
                )
                .then(response => {
                    alert("¡Registro actualizado!");
                    getAllClassifications();
                    classificationSelected.value= null;
                    classificationName.value = null;
                })
                .catch(error => {
                    console.log(error);
                    alert("¡Error en el registro!");
                });
            }

            onBeforeMount(() => {
                getAllClassifications();
            })

            return{

                classificationSelected,
                classificationName ,
                classifications,
                getAllClassifications,
                loadName,
                deleteClassification,
                editClassification
                
            }
        }
    }
</script>