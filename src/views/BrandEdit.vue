<template>

<div class="body-register-marca">
   <div class="register-container-marca">
      <header>EDITAR MARCA</header>
        <form class="form-register-marca">
            <div class="form-first">
                <div class="details-marca">
                    <!-- <span class="title">EDITAR MARCA</span> -->
                    <div class="fields">
                        <div class="input-field-b">
                            <label>Selector de marca*</label>
                            <select v-model="brandSelected" @change="loadAttributes">
                                <option selected disabled >Seleccione una marca</option>
                                <option v-for="brand in brands" :value = "brand.id">
                                    {{brand.name}}
                                </option>
                            </select>
                        </div>
                        <div class="input-field-b">
                            <label>Nombre*</label>
                            <input type="text" placeholder="Nuevo nombre" required v-model="brandName">
                            <div class="error" v-if="vName"> {{ errors.name }}</div>
                        </div>
                        <div class="input-field-b">
                            <label>Clave*</label>
                            <input type="text" placeholder="Nueva clave" required v-model="key">
                            <div class="error" v-if="vKey"> {{ errors.key }}</div>
                        </div>
                    </div>
                </div>
                <div class="details-btns">
                    <button type="button" class="deletebtn" @click="displayModal">
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

        <Dialog v-model:visible="deleteBrandDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span >Esta seguro de querer borrar <b>{{brandName}}</b>?</span>
                </div>
                <template #footer>
                    <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteBrand" />
                    <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteBrandDialog = false"/>
                    
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
    import { useRouter , useRoute} from 'vue-router';
    export default{
        name: 'BrandEdit',
        components: {
            Navbar
        },
        setup(){
            var brandSelected = ref(null);
            var brandName = ref(null);
            var errors = ref(null);
            var key = ref(null);

            var deleteBrandDialog = ref(false);
            
            var vName = ref(false);
            var vKey = ref(false);       
            const brands = ref(null);
            var router = useRouter();
            const route = useRoute();

            const fieldsMap = {
                name: "Nombre",
                key: "Clave"
            }

            function getAllBrands(){
                axios.get(import.meta.env.VITE_API_URL + '/api/brand')
                .then(response => {
                    brands.value = response.data;
                    if(route.params.id){
                        brandSelected.value = route.params.id;
                        loadAttributes();
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            }

            function displayModal(){
                
                if(brandSelected.value){
                    deleteBrandDialog.value = true;
                }
            }

            function loadAttributes (){
                brandName.value = brands.value.filter(brand => brand.id == brandSelected.value)[0].name;
                key.value = brands.value.filter(brand => brand.id == brandSelected.value)[0].key;
            }

            function deleteBrand(){
                /* resetea los valores del formulario */
                errors.value = {};
                vName.value = false;
                
                axios.delete(import.meta.env.VITE_API_URL + '/api/brand/' + brandSelected.value)
                .then(response => {
                    notify({title: "Exito", text: "¡Registro eliminado!", type: "success"});
                    router.go('/BrandEdit')
                })
                .catch(error => {
                    console.log(error);
                    notify({title: "Error", text: "¡Error al eliminar!", type: "error"});
                });
            }

            function updateBrand(){
                axios.patch(import.meta.env.VITE_API_URL + '/api/brand/' + brandSelected.value,
                {
                    name: brandName.value,
                    key:  key.value
                }
                )
                .then(response => {
                    notify({title: "Exito", text: "¡Registro actualizado!", type: "success"});
                    getAllBrands();
                    brandSelected.value= null;
                    brandName.value = null;
                    key.value = null;
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
                if(!brandName.value){
                    vName.value = true;
                    errors.value.name = "El nombre de la marca es requerido";
                    return;
                }
                /*quita espacios y los guarda en otra variable */
                let nameNoSpace = brandName.value.replace(/ /g, '');
                /* checa la longitud de la cadena, sin contar espacios */
                if(nameNoSpace.length < 3 || nameNoSpace.length > 20){
                    vName.value = true;
                    errors.value.name = "El nombre de la marca debe tener entre 3 y 20 caracteres";
                    return;
                }
                /* valida los caracteres aceptados */
                if(!/^[a-zA-Z ]+$/.test(brandName.value)){
                    errors.value.name = 'El nombre debe contener solo letras'
                    vName.value = true
                    /* console.log(brandName.value); */
                }
                
            }

            function checkKey(){
                /* Busca que la clave este definida */
                if(!key.value){
                    vKey.value = true;
                    errors.value.key = "La clave es requerida";
                    return;
                }
                /*quita espacios y los guarda en otra variable */
                let nameNoSpace = key.value.replace(/ /g, '');
                /* checa la longitud de la cadena, sin contar espacios */
                if(nameNoSpace.length < 1 || nameNoSpace.length > 3){
                    vKey.value = true;
                    errors.value.key = "La clave de marca debe tener entre 1 y 3 caracteres";
                    return;
                }
                /* valida los caracteres aceptados */
                if(!/^[a-zA-Z ]+$/.test(key.value)){
                    errors.value.key = 'La clave debe contener solo letras'
                    vKey.value = true
                }
            }

            function validateForm(){
                errors.value = {};
                vName.value = false;
                vKey.value = false;
                checkName();
                checkKey();
                if(!vName.value && !vKey.value){
                    updateBrand();
                }
            }

            onBeforeMount(() => {
                getAllBrands();
            })

            function goBack(event){
                event.preventDefault();
                router.back();
            }

            return{
                brandSelected,
                brandName,
                errors,
                key,
                vName,
                vKey,
                brands,
                getAllBrands,
                loadAttributes,
                deleteBrand,
                updateBrand,
                checkName,
                checkKey,
                validateForm,
                fieldsMap,
                router, 
                goBack, 
                deleteBrandDialog,
                displayModal
            }
        }
    }
</script>