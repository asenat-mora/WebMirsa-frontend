<template>
<Navbar/>
<div class="body-register-product">
    <div class="register-container-product">
        <header>Alta de Producto</header>
        <form class="form-register-product" action="#" @submit.prevent="createItem">
            <div class="form-first">
                <div class="details-product">
                    <span class="title">Detalles del producto</span>
                    <div class="fields">
                        <div class="input-field">
                            <label>Nombre</label>
                            <input type="text" placeholder="Producto" v-model="productName" required>
                        </div>
                        <div class="input-field">
                            <label>Codigo</label>
                            <input type="text" placeholder="Codigo de producto" v-model="productCode" required>
                        </div>
                        <div class="input-field">
                            <label>Precio</label>
                            <input type="number" min="1" step="any" placeholder="Precio unitario" v-model="productPrice" required>
                            <!-- <input type="number" placeholder="Modelo de producto" required> -->
                        </div>
                        <div class="input-field">
                            <label>Modelo</label>
                            <input type="text" placeholder="Modelo" v-model="productModel" required>
                        </div>
                        <div class="input-field">
                            <label>Marca</label>
                            <select v-model="productBrand" required>
                                <option disabled selected>Selecciona una marca</option>
                                <option v-for="brand in brands" :value="brand.brandId">
                                    {{ brand.brandName }}
                                </option>
                            </select>
                        </div>
                        <div class="input-field">
                            <label>Categoria</label>
                            <select v-model="productCategory" required>
                                <option disabled selected>Selecciona una Categoria</option>
                                <option v-for="autopart in autoparts" :value="autopart.autopartId">
                                    {{ autopart.autopartName }}
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
                        </div> -->
                        <div class="input-field-checkbox-colors">
                            <label>Color</label>
                            <div class="checkbox-container" required>
                                <label v-for="color in colors" >
                                    <input type="checkbox" id="cbox" :value="color.id" @change="modifyColors($event)">
                                    {{ color.name }}<br>
                                </label>
                            </div>
                        </div>
                        <div class="input-field-text-area">
                            <label>Descripción</label>
                            <textarea type="text" class="text-area-register" name="descripcionRegister" placeholder="Descripción del producto" v-model="productDescription" required></textarea>
                        </div>
                        <div class="input-field-image">
                            <label>Imagen</label>
                            <div class="p-image">
                                <i class="ri-pencil-line upload-button"></i>
                                <!-- <input id="vImagen" type="image" width="200" height="200"> -->
                                <input class="file-upload" type="file" accept="image/*" @change="uploadImageToImgur($event)" required/>
                            </div>
                        </div>
                        <div class="input-field-text-area">
                            <label>Lado</label>
                            <select v-model="productSide" required>
                                <option disabled selected>Selecciona un lado</option>
                                <option value="Derecho">Derecho</option>
                                <option value="Izquierdo">Izquierdo</option>
                                <option value="Ambos">Ambos</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="details-btns">
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
    import axiosInstance from '../helpers/axiosInstance';
    import { onBeforeMount , ref} from 'vue';
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
            var productName = ref('');
            var productCode = ref('');
            var productPrice = ref('');
            var productModel = ref('');
            var productBrand = ref('');
            var productCategory = ref('');
            var productSide = ref('');
            var productDescription = ref('');
            var productImage = ref(null);
    

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

            function uploadImageToImgur(event){
                var file = event.target.files[0];
                var formData = new FormData();
                /* document.getElementById("vImagen").src = file; */

                formData.append('image', file);
                axiosInstance.post('https://api.imgur.com/3/image', formData, {
                    headers: {
                        'Authorization': 'Client-ID '+ import.meta.env.VITE_IMGUR_CLIENT_ID
                    }





                }).then(response => {
                    productImage.value = response.data.data.link;
                    console.log(response.data.data.link);
                }).catch(error => {
                    console.log(error);
                });

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
            }


            function createItem(){
                const item = {
                    name: productName.value,
                    code: productCode.value,
                    price: productPrice.value,
                    model: productModel.value,
                    brand: productBrand.value,
                    autoPart: productCategory.value,
                    side: productSide.value,
                    description: productDescription.value,
                    image: productImage.value,
                    colors: colorsArray.value
                }

                axios.post(import.meta.env.VITE_API_URL + '/api/item', item)
                .then(response => {


                    alert("¡Registro exitoso!");


                    console.log(response);

                }).catch(error => {
                    console.log(error);

                alert("¡Error en el registro!");

                });
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
                uploadImageToImgur,
                createItem,
                brands,
                colors,
                autoparts,
                colorsArray,
                productName,
                productCode,
                productPrice,
                productModel,
                productBrand,
                productCategory,
                productSide,
                productDescription,
                productImage
            }
        }
    }
</script>