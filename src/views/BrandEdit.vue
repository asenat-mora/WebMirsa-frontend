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
                            <label>Seleccionada</label>
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
                    <button type="button" class="deletebtn" @click="deleteBrand">
                        <span class="btnEliminar">Eliminar</span>
                    </button>
                    <button type="button" class="updatelbtn" @click="validateForm">
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
        name: 'BrandEdit',
        components: {
            Navbar
        },
        setup(){
            var brandSelected = ref(null);
            var brandName = ref(null);
            var errors = ref(null);
            var key = ref(null);
            
            var vName = ref(false);
            var vKey = ref(false);
            
          
            const brands = ref(null);

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
                brandName.value = brands.value.filter(brand => brand.id == brandSelected.value)[0].name;
                key.value = brands.value.filter(brand => brand.id == brandSelected.value)[0].key;
                
            }

            function deleteBrand(){
                axios.delete(import.meta.env.VITE_API_URL + '/api/brand/' + brandSelected.value)
                .then(response => {
                    alert("¡Registro eliminado!");
                    getAllBrands();
                    brandSelected.value= null;
                    brandName.value = null;
                    key.value = null;
                })
                .catch(error => {
                    console.log(error);
                    alert("¡Error en el registro!");
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
                    alert("¡Registro actualizado!");
                    getAllBrands();
                    brandSelected.value= null;
                    brandName.value = null;
                    key.value = null;
                })
                .catch(error => {
                    console.log(error);
                    alert("¡Error en el registro!");
                });
            }
            
            function checkName(){
                /* Busca que el nombre este definido */
                
                if(!brandName.value){
                    vName.value = true;
                    errors.value.name = "El nombre de la marca es requerido";
                    return;
                }
                /* checa la longitud de la cadena, sin contar espacios */
                if(brandName.value.length < 3 || brandName.value.length > 20){
                    vName.value = true;
                    errors.value.name = "El nombre de la marca debe tener entre 3 y 20 caracteres";
                    return;
                }
                /* valida los caracteres aceptados */
                if(!/^[a-zA-Z ]+$/.test(brandName.value)){
                    errors.value.name = 'El nombre debe contener solo letras'
                    vName.value = true
                    console.log(brandName.value);
                }
                
            }

            function checkKey(){
                /* Busca que la clave este definida */
                
                if(!key.value){
                    vKey.value = true;
                    errors.value.key = "La clave es requerida";
                    return;
                }
                /* checa la longitud de la cadena, sin contar espacios */
                if(key.value.length < 3 || key.value.length > 20){
                    vKey.value = true;
                    errors.value.key = "La clave de marca debe tener entre 3 y 20 caracteres";
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
                checkName();
                checkKey();
                if(!vName.value && !vKey.value){
                    updateBrand();
                }
            }

            onBeforeMount(() => {
                getAllBrands();
            })


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
                validateForm
            }
        }
    }
</script>