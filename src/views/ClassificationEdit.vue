<template>
<Navbar/>
<div class="body-register-marca">
   <div class="register-container-marca">
      <header>Accesorios Autopartes</header>
        <form class="form-register-marca" action = "#" @submit.prevent="">
            <div class="form-first">
                <div class="details-marca">
                    <span class="title">Editar Accesorio</span>
                    <div class="fields">
                        <div class="input-field-text-area">
                            <label>Seleccionada</label>
                            <select v-model="classificationSelected" @change="loadName">
                                <option selected disabled >Seleccione una clasificación</option>
                                <option v-for="classification in classifications" :value = "classification.autopartId">
                                    {{classification.autopartName}}
                                </option>
                            </select>
                        </div>
                        <div class="input-field">

                            <label>Nombre</label>
                            <input type="text" placeholder="Nombre de la autoparte" required v-model="classificationName">
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
                axios.get(import.meta.env.VITE_API_URL + '/api/autopart')
                .then(response => {
                    classifications.value = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
            }

            function loadName (){
                classificationName.value = classifications.value.filter(classification => classification.autopartId == classificationSelected.value)[0].autopartName;
            }

            function deleteClassification(){
                axios.delete(import.meta.env.VITE_API_URL + '/api/autopart/' + classificationSelected.value)
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
                axios.patch(import.meta.env.VITE_API_URL + '/api/autopart/' + classificationSelected.value,
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