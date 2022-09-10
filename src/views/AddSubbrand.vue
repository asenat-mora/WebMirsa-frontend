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
                                <select v-model="brandSelected">
                                    <option selected disabled >Seleccione una marca</option>
                                    <option v-for="brand in brands" :value = "brand.id">
                                        {{brand.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="input-field-b">
                                <label>Nombre Submarca*</label>
                                <input type="text" placeholder="Nuevo nombre" required v-model="subBrandName">
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
                        <button type="button" class="cancelbtn" @click="goBack($event)">
                                <span class="btnCancelar">Volver</span>
                        </button>
                        <button class="savebtn" type="button" @click="createSubBrand()">
                            <span class="btnGuardar">Registrar</span>       
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </template>
    
    <script setup>
        import axios from 'axios';
        import { onBeforeMount, ref } from 'vue';
        import { useRouter } from 'vue-router';
        import { notify } from "@kyvg/vue3-notification";

        let brands = ref(null);
        const router = useRouter();
        let subBrandName = ref(null);
        let brandSelected = ref(null);
        var vName = ref(false);
        
        function getAllBrands() {
        axios.get(import.meta.env.VITE_API_URL + '/api/brand')
            .then(response => {
                brands.value = response.data;
            })
            .catch(error => {
                
                console.log(error);
            })
        }

        function createSubBrand(){
            axios.post(import.meta.env.VITE_API_URL + '/api/sub-brand', {
                name: subBrandName.value,
                brandId: brandSelected.value
            })
            .then(response => {
                notify({title: "Exito", text: "¡Registro exitoso!", type: "success"});
                //aqui va el clear
                    subBrandName.value = null;
            })
            .catch(error => {
                notify({title: "Error", text: "¡Error en el registro!", type: "error"});
                console.log(error);
            })
        }

        function checkName() {
            /* Busca que el nombre este definido */
            if (!subBrandName.value) {
                vName.value = true;
                errors.value.name = "El nombre de la sub-marca es requerido";
                return;
            }
            /*quita espacios y los guarda en otra variable */
            let nameNoSpace = subBrandName.value.replace(/ /g, "");
            /* checa la longitud de la cadena, sin contar espacios */
            if (nameNoSpace.length < 3 || nameNoSpace.length > 20) {
                vName.value = true;
                errors.value.name ="El nombre debe tener entre 3 y 20 caracteres";
                return;
            }
            /* valida los caracteres aceptados */
            if (!/^[a-zA-Z ]+$/.test(subBrandName.value)) {
                errors.value.name = "El nombre debe contener solo letras";
                vName.value = true;
            }
        }

/*         function validateForm() {
            errors.value = {};
            vName.value = false;
            checkName();

            if (!vName.value) {
                createSubBrand();
            }
        } */

        function goBack(event){
            event.preventDefault();
            router.back();
        }


        onBeforeMount(() => {
            getAllBrands();
        })
        




    </script>