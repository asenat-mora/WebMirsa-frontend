<template>

<div class="body-register-marca">
   <div class="register-container-marca">
      <header>EDITAR ACCESORIO</header>
        <form class="form-register-marca">
            <div class="form-first">
                <div class="details-marca">
                    <!-- <span class="title">EDITAR ACCESORIO</span> -->
                    <div class="fields">
                        <div class="input-field-b">
                            <label>Selector de accesorio*</label>
                            <select v-model="accesorySelected" @change="loadName">
                                <option selected disabled >Seleccione una clasificación</option>
                                <option v-for="accesory in accesories" :value = "accesory.id">
                                    {{accesory.name}}
                                </option>
                                
                            </select>
                        </div>
                        <div class="input-field-b">

                            <label>Nombre*</label>
                            <input type="text" placeholder="Nuevo nombre" required v-model="accesoryName">
                            <div class="error" v-if="vName"> {{ errors.name }}</div>
                        </div>
                    </div>
                </div>
                <div class="details-btns">
                    <button  type="button" class="deletebtn" @click="displayModal">
                        <span class="btnEliminar">Eliminar</span>
                    </button>
                    <button type="button" class="cancelbtn" @click="goBack($event)">
                            <span class="btnCancelar">Volver</span>
                    </button>
                    <button type="button" class="updatelbtn" @click="validateForm">
                        <span class="btnActualizar">Actualizar</span>      
                    </button>
                </div>
            </div>
        </form>
        <Dialog v-model:visible="deleteAccessoryDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span >Esta seguro de querer borrar <b>{{accesoryName}}</b>?</span>
            </div>
            <template #footer>
                <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteAccessory" />
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteAccessoryDialog = false"/>
                
            </template>
        </Dialog>
    </div>
</div>
</template>

<script>
    import Navbar from '@/components/Navbar.vue';
    import { notify } from "@kyvg/vue3-notification";
    import axios from 'axios';
    import { ref , onBeforeMount} from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    export default{
        name: 'AccesoryEdit',
        components: {
            Navbar
        },
        setup(){
            var accesorySelected = ref(null);
            var accesoryName = ref(null);
            const accesories = ref(null);
            var errors = ref(null);
            var vName = ref(false);
            var router = useRouter();
            const route = useRoute();
            let deleteAccessoryDialog = ref(false);

            const fieldsMap = {
                name: "Nombre"
            }

            function displayModal(){
                if(accesorySelected.value){
                    deleteAccessoryDialog.value = true;
                }
            }

            function getAllAccessories(){
                axios.get(import.meta.env.VITE_API_URL + '/api/accessory')
                .then(response => {
                    accesories.value = response.data;
                    if(route.params.id){
                        accesorySelected.value = route.params.id;
                        loadName();
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            }

            function loadName (){
                accesoryName.value = accesories.value.filter(accesory => accesory.id == accesorySelected.value)[0].name;
            }

            function deleteAccessory(){
                /* resetea los valores del formulario */
                errors.value = {};
                vName.value = false;
                
                axios.delete(import.meta.env.VITE_API_URL + '/api/accessory/' + accesorySelected.value)
                .then(response => {
                    notify({title: "Exito", text: "¡Registro eliminado!", type: "success"});
                    router.go('/AccesoryEdit');
                })
                .catch(error => {
                    console.log(error);
                    notify({title: "Error", text: "¡Error al eliminar!", type: "error"});
                });
            }

            function updateAccessory(){
                axios.patch(import.meta.env.VITE_API_URL + '/api/accessory/' + accesorySelected.value,
                {
                    name: accesoryName.value
                }
                )
                .then(response => {
                    notify({title: "Exito", text: "¡Registro actualizado!", type: "success"});
                    getAllAccessories();
                    accesorySelected.value= null;
                    accesoryName.value = null;
                })
                .catch(error => {
                    console.log(error);
                    if(error.response.status === 409){
                        /* Validar duplicidad de datos */
                        notify({title: "Advertencia", text: "¡El campo " + fieldsMap[error.response.data.target] + " ya existe!", type: "warn"});                       
                    }else{
                        notify({title: "Error", text: "¡Error al actualizar!", type: "error"});
                    }
                });
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
                    /* console.log(accesoryName.value); */
                }
                
            }

            function validateForm(){
                errors.value = {};
                vName.value = false;
                checkName();

                if(!vName.value){
                    updateAccessory();
                }
            }

            onBeforeMount(() => {
                getAllAccessories();
                
            })

            function goBack(event){
                event.preventDefault();
                router.back();
            }

            return{
                accesorySelected,
                accesoryName,
                accesories,
                getAllAccessories,
                loadName,
                deleteAccessory,
                updateAccessory,
                checkName,
                validateForm,
                errors,
                vName,
                fieldsMap,
                router, 
                goBack,
                route,
                deleteAccessoryDialog,
                displayModal
                
            }
        }
    }
</script>