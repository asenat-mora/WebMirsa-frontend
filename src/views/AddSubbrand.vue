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
            })
            .catch(error => {
                notify({title: "Error", text: "¡Error en el registro!", type: "error"});
                console.log(error);
            })
        }

        function goBack(event){
            event.preventDefault();
            router.back();
        }


        onBeforeMount(() => {
            getAllBrands();
        })
        
    </script>