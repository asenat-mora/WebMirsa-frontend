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
                            <label>SKU*</label>
                            <input type="text" placeholder="Codigo de producto" v-model="productSKU" required>
                            <div class="error" v-if="vSku"> {{ errors.sku }}</div>
                        </div>
                        <div class="input-field">
                            <label>Marca*</label>
                            <select v-model="productBrand" required @change="getSubBrandsLabel()">
                                <option disabled selected>Selecciona una marca</option>
                                <option v-for="brand in brands" :value="brand.id"> {{ brand.name }}
                                </option>
                            </select>
                            <div class="error" v-if="vBrand"> {{ errors.brand }}</div>
                        </div>
                        <div class="input-field-checkbox-colors">
                            <label>Sub-Marca*</label>
                            <div class="checkbox-container" required>
                                <Multiselect v-model="productSubBrands" mode="tags" :close-on-select="false" :searchable="false" :create-option="false" :options="subBrandsLabel" placeholder="Seleccione una submarca"/>
                                <!-- <div class="error" v-if="vColors"> {{ errors.colors }}</div> -->
                            </div>
                        </div>
                        <div class="input-field">
                            <label>Accesorio*</label>
                            <select v-model="productAccessory" required>
                                <option disabled selected>Selecciona una Categoria</option>
                                <option v-for="accessory in accessories" :value="accessory.id">
                                    {{ accessory.name }}
                                </option>
                            </select>
                            <div class="error" v-if="vAccesory"> {{ errors.accessory }}</div>
                        </div>
                        <div class="input-field">
                            <label>Modelo*</label>
                            <input type="text" placeholder="Modelo" v-model="productModel" required>
                            <div class="error" v-if="vModel"> {{ errors.model }}</div>
                        </div>
                        <div class="input-field"><!-- input-field-text-area -->
                            <label>Lado*</label>
                            <select v-model="productSide" required>
                                <option disabled selected>Selecciona un lado</option>
                                <option value="Derecho">Derecho</option>
                                <option value="Izquierdo">Izquierdo</option>
                                <option value="Ambos">Ambos</option>
                            </select>
                            <div class="error" v-if="vSide"> {{ errors.side }}</div>
                        </div>
                        <div class="input-field">
                            <label>Precio</label>
                            <input type="number" min="1" step="any" placeholder="Precio unitario" v-model="productPrice" required>
                            <div class="error" v-if="vPrice"> {{ errors.price }}</div>
                        </div>                                
                        <div class="input-field-checkbox-colors">
                            <label>Color*</label>
                            <div class="checkbox-container" required>
                                <Multiselect v-model="arrayColors" mode="tags" :close-on-select="false" :searchable="false" :create-option="false" :options="colors" placeholder="Seleccione un color"/>
                                <div class="error" v-if="vColors"> {{ errors.colors }}</div>
                            </div>
                        </div>
                        <div class="input-field-text-area">
                            <label>Descripción*</label>
                            <textarea type="text" class="text-area-register" name="descripcionRegister" placeholder="Descripción del producto" v-model="productDescription" required></textarea>
                            <div class="error" v-if="vDescription"> {{ errors.description }}</div>
                        </div>
                        <div class="input-field-image">
                            <label>Imagen*</label>
                            <div class="p-image">
                                <input id="vImagen" :src="productImage || defaultImageSrc" type="image" width="200" height="200">
                                <input class="file-upload" type="file" accept="image/*" @change="uploadImageToBucket($event)" required/>
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
                        <button type="button" class="deletebtn" @click="displayModal">
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

        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span >Esta seguro de querer borrar el producto?</span>
            </div>
            <template #footer>
                <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteItem" />
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
                
            </template>
        </Dialog>
    </div>
</div>
</template>

<script setup>

    import axios from 'axios';
    import { notify } from "@kyvg/vue3-notification"; /* libreria para importar alertas */
    import { useRouter } from 'vue-router';
    import Multiselect from '@vueform/multiselect'
    import { ref, watch } from 'vue';

    const router = useRouter();
    const defaultImageSrc = 'https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png';
    let arrayColors = ref([]);
    let subBrandsLabel = ref([]);
    let errors = ref(null);

    let productSKU = ref(null);
    let productDescription = ref(null);
    let productPrice = ref(null);
    let productModel = ref(null);
    let productSide = ref(null);
    let productImage = ref(null);
    let productBrand = ref(null);
    let productAccessory = ref(null);
    let productSubBrands = ref([]);
    
    let vSku = ref(false);
    let vColors = ref(false);
    let vBrand = ref(false);
    let vAccesory = ref(false);
    let vModel = ref(false);
    let vPrice = ref(false);
    let vImage = ref(false);
    let vSide = ref(false);
    let vDescription = ref(false);

    let deleteProductDialog = ref(false);

    const fieldsMap = {
        sku: "SKU"
    }

    const props = defineProps({
        brands: Object,
        colors: Object,
        accessories: Object,
        productDescriptionP: String,
        productSKUP: String,
        productPriceP: Number,
        productModelP: String,
        productBrandP: Number || String,
        productAccessoryP: Number || String,
        productSideP: String,
        productImageP: String,
        productColors: Array,
        mode: String,
        productId: Number,
        subBrandsLabelP: Object,
        productSubBrandsP: Array,
    })


    function clearForm(){
        productDescription.value = '';
        productSKU.value = '';
        productPrice.value = '';
        productModel.value = '';
        productBrand.value = '';
        productAccessory.value = '';
        productSide.value = '';
        productImage.value = '';
        arrayColors.value = [];
        subBrandsLabel.value = [];
        productSubBrands.value = [];
    }

    function displayModal(){
        deleteProductDialog.value = true;
    }

    function uploadImageToBucket(event){
        var file = event.target.files[0];

        
        if(file.type.indexOf("image") == -1){
            notify({
                title: "Error",
                text: "El archivo seleccionado no es una imagen",
                type: "error",
                duration: 3000
            });
            document.getElementsByClassName("file-upload")[0].value = "";
            return;
        }

        var formData = new FormData();
        formData.append('file', file);

        axios.post(import.meta.env.VITE_API_URL + '/api/upload', formData)
        .then(response => {
            productImage.value = response.data.url;
        }).catch(error => {
            
            if(error.response.data.message === 'File too large'){
                notify({
                    title: "Error",
                    text: "El archivo es demasiado grande, la imagen debe ser de maximo 2MB",
                    type: "error",
                    duration: 3000
                });
            }
            else{
                notify({
                    title: "Error",
                    text: "Ocurrio un error al subir la imagen",
                    type: "error",
                    duration: 3000
                });
            }
            
        });
    }

    function getSubBrandsLabel(){
        productSubBrands.value = [];
        axios.get(import.meta.env.VITE_API_URL + '/api/sub-brand/brand/' + productBrand.value)
        .then(response => {
            subBrandsLabel.value = mapSubBrands(response.data);
        })
    }

    function mapSubBrands(subBrandsRawArray){
        return subBrandsRawArray.map(subBrand => {
            return {
                label: subBrand.name,
                value: subBrand.id
            }
        })
    }


    function createProduct(event){
        event.preventDefault();
        const product = {
            sku: productSKU.value,
            price: productPrice.value,
            model: productModel.value,
            brandId: productBrand.value,
            accessoryId: productAccessory.value,
            side: productSide.value,
            description: productDescription.value,
            image: productImage.value || defaultImageSrc,
            colors: arrayColors.value,
            subBrands: productSubBrands.value
        }

        axios.post(import.meta.env.VITE_API_URL + '/api/product', product)
        .then(response => {
            clearForm();
            notify({title: "Exito", text: "¡Registro exitoso!", type: "success"});
            
        }).catch(error => {
            console.log(error);
            if(error.response.status === 409){
                /* Validar duplicidad de datos */
                notify({title: "Advertencia", text: "¡El campo " + fieldsMap[error.response.data.target] + " ya existe!", type: "warn"});
            }else{
                notify({title: "Error", text: "¡Error en el registro!", type: "error"});
            }
        });
    }

    function updateProduct(event){
        event.preventDefault();
        const product = {
            sku: productSKU.value,
            price: productPrice.value,
            model: productModel.value,
            brandId: productBrand.value,
            accessoryId: productAccessory.value,
            side: productSide.value,
            description: productDescription.value,
            image: productImage.value,
            colors: arrayColors.value,
            subBrands: productSubBrands.value
        }

        axios.patch(import.meta.env.VITE_API_URL + '/api/product/' + props.productId, product)
            .then(response => {
                notify({title: "Exito", text: "¡Registro actualizado!", type: "success"});
            }).catch(error => {
                console.log(error);
                if(error.response.status === 409){
                    /* Validar duplicidad de datos */
                    notify({title: "Advertencia", text: "¡El campo " + fieldsMap[error.response.data.target] + " se encuentra duplicado!", type: "warn"});
                }else{
                    notify({title: "Error", text: "¡Error en el registro!", type: "error"});
                }
            });
    }

    function deleteItem(event){
        axios.delete(import.meta.env.VITE_API_URL + '/api/product/' + props.productId,)
            .then(response => {
                notify({title: "Exito", text: "¡Registro eliminado!", type: "success"});
                router.back();
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                notify({title: "Error", text: "¡Error al eliminar!", type: "error"});
            });
    }   

    function goBack(event){
        event.preventDefault();
        router.back();
    }

    function checkSku(){
        /* Busca que el SKU este definido */
        if(!productSKU.value){
            vSku.value = true
            errors.value.sku = 'Campo obligatorio'
            return;
        }
        /* quita espacios y los guarda en otra variable */
        let skuNoSpace = productSKU.value.replace(/ /g, '');
        /* checa la longitud de la cadena, sin contar espacios */
        if(skuNoSpace.length < 5 || skuNoSpace.length > 10){
            errors.value.sku = 'El SKU debe tener entre 5 y 10 caracteres'
            vSku.value = true
        }
        /* valida los caracteres aceptados */
        if(!/^[a-zA-Z0-9 ]+$/.test(productSKU.value)){
            errors.value.sku = 'El SKU debe contener solo letras y números'
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
        if(!productBrand.value){
            errors.value.brand = 'Debe seleccionar una marca'
            vBrand.value = true
        }
    }

    function checkAccesory(){
        if(!productAccessory.value){
            errors.value.accessory = 'Debe seleccionar un tipo de accesotio'
            vAccesory.value = true
        }
    }

    function checkModel(){
        if(!productModel.value){
            vModel.value = true
            errors.value.model = 'campo oblicatorio'
            return;
        }
        if(productModel.value.length < 4 || productModel.value.length > 11 ){
           errors.value.model = 'El modelo debe tener entre 4 y 11 caracteres'
           vModel.value = true
        }
    }

    function checkPrice(){
        if(productPrice.value<0 || productPrice.value>10000){
            errors.value.price = 'El precio debe estar entre 0 y 10000'
            vPrice.value = true
        }
    }

    function checkSide(){
        if(!productSide.value){
            errors.value.side = 'Debe seleccionar un lado'
            vSide.value = true
        }
    }

    function checkDescription(){
        if(!productDescription.value){
            vDescription.value = true
            errors.value.description = 'Campo obligatorio'
            return;
        }
        if(productDescription.value.length < 10 || productDescription.value.length > 80){
            errors.value.description = 'La descripción  debe tener entre 10 y 80 caracteres'
            vDescription.value = true
        }
    } 

    function checkImage(){
        if(!productImage.value){
            errors.value.image = 'Debe subir una imagen'
            vImage.value = true
        }
    }

    function validateForm(event, mode){
        errors.value = {}
        vColors.value = vSku.value = vBrand.value = vAccesory.value = vModel.value = vPrice.value = vSide.value = vDescription.value = false;

        checkSku()
        checkColors()
        checkBrand()
        checkAccesory()
        checkModel()
        checkPrice()
        checkSide()
        checkDescription()
        //checkImage()

        if(!vColors.value && !vSku.value && !vBrand.value && !vAccesory.value && !vModel.value && !vPrice.value && !vSide.value && !vDescription.value){
            if(mode === 'Create'){
                createProduct(event)
            }
            else{
                updateProduct(event)
            }
        }
        
    }

    watch(props.productColors, (newValue, oldValue) => {
        arrayColors.value = newValue;
    });

    watch(props.subBrandsLabelP, (newValue, oldValue) => {
        subBrandsLabel.value = newValue;
    });

    watch(props.productSubBrandsP, (newValue, oldValue) => {
        productSubBrands.value = newValue;
    });

    watch(()=> props.productSKUP, (newValue, oldValue) => {
        productSKU.value = props.productSKUP;
        productAccessory.value = props.productAccessoryP;
        productSide.value = props.productSideP;
        productBrand.value = props.productBrandP;
        productModel.value = props.productModelP;
        productPrice.value = props.productPriceP;
        productDescription.value = props.productDescriptionP;
        productImage.value = props.productImageP;
    });

    


</script>

<style src="@vueform/multiselect/themes/default.css" ></style>
