<template>

    <div class="body-register-marca">
       <div class="register-container-marca">
          <header>ALTA SE SUBMARCAS</header>
            <form class="form-register-marca">
                <div class="form-first">
                    <div class="details-marca">
                        
                        <div class="fields">
                            <div class="input-field-b">
                                <label>Marca que pertenece*</label>
                                <select v-model="brandSelected" @change="loadAttributes">
                                    <option selected disabled >Seleccione una marca</option>
                                    <option v-for="brand in brands" :value = "brand.id">
                                        {{brand.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="input-field-b">
                                <label>Nombre Submarca*</label>
                                <input type="text" placeholder="Nuevo nombre" required v-model="subbrandName">
                                <div class="error" v-if="vName"> {{ errors.name }}</div>
                            </div>
                            <!-- <div class="input-field-b">
                                <label>Clave*</label>
                                <input type="text" placeholder="Nueva clave" required v-model="key">
                                <div class="error" v-if="vKey"> {{ errors.key }}</div>
                            </div> -->
                        </div>
                    </div>
                    <div class="details-btns">
                        <button type="button" class="deletebtn" @click="deleteBrand">
                            <span class="btnEliminar">Eliminar</span>
                        </button>
                        <button type="button" class="cancelbtn" @click="goBack($event)">
                                <span class="btnCancelar">Volver</span>
                        </button>
                        <button class="savebtn" type="submit">
                            <span class="btnGuardar">Registrar</span>       
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
        import { useRouter } from 'vue-router';
        export default{
            name: 'BrandEdit',
            components: {
                Navbar
            },
            setup(){
                var brandSelected = ref(null);
                var subbrandName = ref(null);
                var errors = ref(null);
               /*  var key = ref(null); */
                
                var vName = ref(false);
        /*         var vKey = ref(false);    */    
                const brands = ref(null);
                var router = useRouter();
    
                const fieldsMap = {
                    name: "Nombre"
                    /* key: "Clave" */
                }
    
                function getAllBrands(){
                    axios.get(import.meta.env.VITE_API_URL + '/api/brand')
                    .then(response => {
                        brands.value = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    })
                }
    
                function loadAttributes (){
                    subbrandName.value = brands.value.filter(brand => brand.id == brandSelected.value)[0].name;
                    key.value = brands.value.filter(brand => brand.id == brandSelected.value)[0].key;
                    
                }
    
                function deleteBrand(){
                    /* resetea los valores del formulario */
                    errors.value = {};
                    vName.value = false;
                    
                    axios.delete(import.meta.env.VITE_API_URL + '/api/brand/' + brandSelected.value)
                    .then(response => {
                        notify({title: "Exito", text: "¡Registro eliminado!", type: "success"});
                        getAllBrands();
                        brandSelected.value= null;
                        subbrandName.value = null;
                        /* key.value = null; */
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
                        /* key:  key.value */
                    }
                    )
                    .then(response => {
                        notify({title: "Exito", text: "¡Registro actualizado!", type: "success"});
                        getAllBrands();
                        brandSelected.value= null;
                        subbrandName.value = null;
                       /*  key.value = null; */
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
                    if(!subbrandName.value){
                        vName.value = true;
                        errors.value.name = "El nombre de la submarca es requerido";
                        return;
                    }
                    /*quita espacios y los guarda en otra variable */
                    let nameNoSpace = subbrandName.value.replace(/ /g, '');
                    /* checa la longitud de la cadena, sin contar espacios */
                    if(nameNoSpace.length < 3 || nameNoSpace.length > 20){
                        vName.value = true;
                        errors.value.name = "El nombre debe tener entre 3 y 20 caracteres";
                        return;
                    }
                    /* valida los caracteres aceptados */
                    if(!/^[a-zA-Z ]+$/.test(subbrandName.value)){
                        errors.value.name = 'El nombre debe contener solo letras'
                        vName.value = true
                        /* console.log(brandName.value); */
                    }
                    
                }
    
                
    
                function validateForm(){
                    errors.value = {};
                    vName.value = false;
                    /* vKey.value = false; */
                    checkName();
                  /*   checkKey(); */
                    if(!vName.value){
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
                    subbrandName,
                    errors,
                   /*  key, */
                    vName,
                   /*  vKey, */
                    brands,
                    getAllBrands,
                    loadAttributes,
                    deleteBrand,
                    updateBrand,
                    checkName,
                /*     checkKey, */
                    validateForm,
                    fieldsMap,
                    router, 
                    goBack
                }
            }
        }
    </script>