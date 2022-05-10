<template>
<Navbar/>
<div class="body-register-product">
    <div class="register-container-product">
        <header>Producto</header>
        <form class="form-register-product" action="#">
            <div class="form-first">
                <div class="details-product">
                    <span class="title">Detalles del producto</span>
                    <div class="fields">
                        <div class="input-field">
                            <label>Nombre</label>
                            <input type="text" placeholder="Producto" required>
                        </div>
                        <div class="input-field">
                            <label>Codigo</label>
                            <input type="text" placeholder="Codigo de producto" required>
                        </div>
                        <div class="input-field">
                            <label>Precio</label>
                            <input type="text" placeholder="Precio unitario" required>
                            <!-- <input type="number" placeholder="Modelo de producto" required> -->
                        </div>
                        <div class="input-field">
                            <label>Modelo</label>
                            <input type="text" placeholder="Modelo" required>
                        </div>
                        <div class="input-field">
                            <label>Marca</label>
                            <select required>
                                <option disabled selected>Selecciona una marca</option>
                                <option v-for="brand in brands" :value="brand.id">
                                    {{ brand.name }}
                                </option>
                            </select>
                        </div>
                        <div class="input-field">
                            <label>Categoria</label>
                            <select required>
                                <option disabled selected>Selecciona una Categoria</option>
                                <option v-for="autopart in autoparts" :value="autopart.id">
                                    {{ autopart.name }}
                                </option>
                            </select>
                        </div>
                        
                        <!-- <div class="input-field">
                            <label>Proveedor</label>
                            <select required>
                                <option disabled selected>Proveedor del producto</option>
                                <option>Mirsa</option>
                                <option>proveedor2</option>
                                <option>proveedor3</option>
                            </select>
                        </div>
                        <div class="input-field">
                            <label>Estatus</label>
                            <select required>
                                <option disabled selected>Visibilidad del articulo</option>
                                <option>Activo</option>
                                <option>Ocultar</option>
                            </select>
                        </div>  -->
                        <div class="input-field-checkbox-colors">
                            <label>Color</label>
                            <div class="checkbox-container">
                                <label v-for="color in colors">
                                    <input type="checkbox" id="cbox" :value="color.id" @change="modifyColors($event)">
                                    {{ color.name }}<br>
                                </label>
                            </div>
                        </div>
                        <div class="input-field-text-area">
                            <label>Descripción</label>
                            <textarea type="text" class="text-area-register" name="descripcionRegister" placeholder="Descripción del producto" required></textarea>
                        </div>
                        <div class="input-field-image">
                            <label>Imagen</label>
                            <div class="p-image">
                                <i class="ri-pencil-line upload-button"></i>
                                <input class="file-upload" type="file" accept="image/*"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="details-btns">
                    <!-- <button class="deletebtn">
                        <span class="btnEliminar">Eliminar</span>
                    </button>
                    <button class="updatelbtn">
                        <span class="btnActualizar">Actualizar</span>
                    </button>         -->
                    <button class="cancelbtn">
                        <span class="btnCancelar">Cancelar</span>
                    </button>
                    <button class="savebtn">
                        <span class="btnGuardar">Guardar</span> 
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
    import { onBeforeMount , ref , reactive} from 'vue';
    export default{
        name: 'Article',
        components: {
            Navbar
        },
        setup(){
            var brands= ref(null);
            var colors = ref(null);
            var autoparts= ref(null);
            var colorsArray = ref([]);

            function getAllColors(){
                axios.get(import.meta.env.VITE_API_URL + '/api/color')
                .then(response => {
                    colors.value = response.data;
                }).catch(error => {
                    console.log(error);
                });
            }

            function getAllBrands(){
                axios.get( import.meta.env.VITE_API_URL + '/api/brand')
                .then(response => {
                    brands.value = response.data;
                })
                .catch(error =>{
                    console.log(error);
                })
            }

            function getAllAutoparts(){
                axios.get(import.meta.env.VITE_API_URL + '/api/autopart')
                .then(response => {
                    autoparts.value = response.data;
                }).catch(error => {
                    console.log(error);
                });
            }

            function modifyColors(event){

                if(!colorsArray.value.includes(event.target.value)){
                    colorsArray.value.push(event.target.value);
                }
                else{
                    colorsArray.value.splice(colorsArray.value.indexOf(event.target.value), 1);
                }

                console.log(colorsArray.value);
            }
            
            onBeforeMount(() => {
                getAllBrands();
                getAllColors();
                getAllAutoparts();
                
            })
            

            return{
                getAllBrands,
                getAllColors,
                getAllAutoparts,
                modifyColors,
                brands,
                colors,
                autoparts,
                colorsArray
            }
        }
    }
</script>