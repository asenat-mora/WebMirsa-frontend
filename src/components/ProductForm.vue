<template>

<div class="body-register-product">
    <div class="register-container-product">
        <header>ALTA DE PRODUCTO</header>
        <form class="form-register-product">
            <div class="form-first">
                <div class="details-product">
                    <span class="title">DETALLE DEL PRODUCTO</span>
                    <div class="fields">
                        <div class="input-field">
                            <label>SKU</label>
                            <input type="text" placeholder="Codigo de producto" v-model="productSKU" required>
                            <div class="error" v-if="vSku"> {{ errors.sku }}</div>
                        </div>
                        <div class="input-field">
                            <label>Marca</label>
                            <select v-model="productBrand" required>
                                <option disabled selected>Selecciona una marca</option>
                                <option v-for="brand in brands" :value="brand.id">
                                    {{ brand.name }}
                                </option>
                            </select>
                            <div class="error" v-if="vBrand"> {{ errors.brand }}</div>
                        </div>
                        <div class="input-field">
                            <label>Accesorio</label>
                            <select v-model="productAccessory" required>
                                <option disabled selected>Selecciona una Categoria</option>
                                <option v-for="accessory in accessories" :value="accessory.id">
                                    {{ accessory.name }}
                                </option>
                            </select>
                            
                        </div>
                        <div class="input-field">
                            <label>Modelo</label>
                            <input type="text" placeholder="Modelo" v-model="productModel" required>
                        </div>
                        <div class="input-field">
                            <label>Precio*</label>
                            <input type="number" min="1" step="any" placeholder="Precio unitario" v-model="productPrice" required>
                        </div>                                
                        <div class="input-field"><!-- input-field-text-area -->
                            <label>Lado</label>
                            <select v-model="productSide" required>
                                <option disabled selected>Selecciona un lado</option>
                                <option value="Derecho">Derecho</option>
                                <option value="Izquierdo">Izquierdo</option>
                                <option value="Ambos">Ambos</option>
                            </select>
                        </div>
                        <div class="input-field-checkbox-colors">
                            <label>Color</label>
                            <div class="checkbox-container" required>
                                <Multiselect v-model="arrayColors" mode="tags" :close-on-select="false" :searchable="false" :create-option="false" :options="colors" placeholder="Seleccione un color"/>
                                <div class="error" v-if="vColors"> {{ errors.colors }}</div>
                            </div>
                        </div>

                        <div class="input-field-text-area">
                            <label>Descripción</label>
                            <textarea type="text" class="text-area-register" name="descripcionRegister" placeholder="Descripción del producto" v-model="productDescription" required></textarea>
                        </div>
                        <div class="input-field-image">
                            <label>Imagen</label>
                            <div class="p-image">
                                <!-- <input id="vImagen" type="image" width="200" height="200"> -->
                                <!-- <i class="ri-pencil-line upload-button"></i> -->
                                <input id="vImagen" :src="productImage || defaultImageSrc" type="image" width="200" height="200">
                                <input class="file-upload" type="file" accept="image/*" @change="uploadImageToImgur($event)" required/>
                            </div>
                            <div class="error" v-if="vImage"> {{ errors.image }}</div>
                        </div>
                    </div>
                </div>
                <div class="details-btns">
                    <template v-if="mode === 'Create'">
                        <button type="button" class="savebtn" @click="validateForm($event, mode)">  <!-- @click="createProduct($event)" -->
                            <span class="btnGuardar">Guardar</span> 
                        </button>
                    </template>

                    <template v-else>
                        <button type="button" class="deletebtn" @click="deleteItem($event)">
                            <span class="btnEliminar">Eliminar</span>
                        </button>
                        <button type="button" class="updatelbtn" @click="validateForm($event, mode)">
                            <span class="btnActualizar">Actualizar</span>
                        </button>
                    </template>
                    <button type="button" class="cancelbtn" @click="goBack($event)">
                            <span class="btnCancelar">Volver</span>
                    </button>
                </div>
                
    
            </div>
        </form>
    </div>
</div>
</template>

<script setup>

    import axios from 'axios';
    import axiosInstance from '../helpers/axiosInstance';
    
    import { useRouter } from 'vue-router';
    import Multiselect from '@vueform/multiselect'
    import { ref, watch, onMounted } from 'vue';

    const router = useRouter();
    const defaultImageSrc = 'https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png';
    let arrayColors = ref([]);
    let errors = ref(null);
    
    let vSku = ref(false);
    let vColors = ref(false);
    let vBrand = ref(false);
    let vImage = ref(false);

    const props = defineProps({
        brands: Object,
        colors: Object,
        accessories: Object,
        productDescription: String,
        productSKU: String,
        productPrice: Number,
        productModel: String,
        productBrand: Number || String,
        productAccessory: Number || String,
        productSide: String,
        productImage: String,
        productColors: Array,
        mode: String,
        productId: Number,
    })


    function clearForm(){
        props.productDescription = '';
        props.productSKU = '';
        props.productPrice = '';
        props.productModel = '';
        props.productBrand = '';
        props.productAccessory = '';
        props.productSide = '';
        props.productImage = '';
        arrayColors = [];
    }

    function uploadImageToImgur(event) {
        var file = event.target.files[0];
        var formData = new FormData();

        formData.append('image', file);
        axiosInstance.post('https://api.imgur.com/3/image', formData, {
            headers: {
                'Authorization': 'Client-ID ' + import.meta.env.VITE_IMGUR_CLIENT_ID
            }

        }).then(response => {
            props.productImage.value = response.data.data.link;
            //console.log(response.data.data.link);
        }).catch(error => {
            console.log(error);
        });
    }


    function createProduct(event){
        event.preventDefault();
        const product = {
            sku: props.productSKU,
            price: props.productPrice,
            model: props.productModel,
            brandId: props.productBrand,
            accessoryId: props.productAccessory,
            side: props.productSide,
            description: props.productDescription,
            image: props.productImage || defaultImageSrc,
            colors: props.productColors
        }

        axios.post(import.meta.env.VITE_API_URL + '/api/product', product)
        .then(response => {
            alert("¡Registro exitoso!");
            clearForm();
        }).catch(error => {
            console.log(error);
            alert("¡Error en el registro!");
        });
    }

    function updateProduct(event){
        event.preventDefault();
        const product = {
            sku: props.productSKU,
            price: props.productPrice,
            model: props.productModel,
            brandId: props.productBrand,
            accessoryId: props.productAccessory,
            side: props.productSide,
            description: props.productDescription,
            image: props.productImage,
            colors: props.productColors
        }

        axios.patch(import.meta.env.VITE_API_URL + '/api/product/' + props.productId, product)
            .then(response => {
                alert("¡Registro actualizado!");
                console.log(response);
            }).catch(error => {
                console.log(error);
                alert("¡Error al actualizar!");
            });
    }

    function deleteItem(event){
        event.preventDefault();
        axios.delete(import.meta.env.VITE_API_URL + '/api/product/' + props.productId,)
            .then(response => {
                alert("¡Registro eliminado!");
                router.back();
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function goBack(event){
        event.preventDefault();
        router.back();
    }

    function checkSku(){
        if(!props.productSKU){
            vSku.value = true
            errors.value.sku = 'Campo obligatorio'
            return;
        }

        if(props.productSKU.length < 5 || props.productSKU.length > 10){
            errors.value.sku = 'El SKU debe tener entre 5 y 10 caracteres'
            vSku.value = true
        }
    }

    function checkColors(){
        if(arrayColors.value.length < 1){
            errors.value.colors = 'Debe seleccionar al menos un color'
            vColors.value = true
        }
    }

    function checkBrand(){
        if(!props.productBrand){
            errors.value.brand = 'Debe seleccionar una marca'
            vBrand.value = true
        }
    }

    function checkImage(){
        if(!props.productImage){
            errors.value.image = 'Debe subir una imagen'
            vImage.value = true
        }
    }

    function validateForm(event, mode){
        errors.value = {}
        checkSku()
        checkColors()
        checkBrand()
        checkImage()

        if(!vColors && !vSku && !vBrand){
            if(mode === 'Create'){
                createProduct(event)
            }
            updateProduct(event)
        }
        
    }

    watch(() => props.productColors, (newValue, oldValue) => {
        arrayColors.value = newValue;
    });

    

</script>

<style src="@vueform/multiselect/themes/default.css" ></style>
