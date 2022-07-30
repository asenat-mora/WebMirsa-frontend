<template>

<div class="body-register-product">
    <div class="register-container-product">
        <header>ALTA DE PRODUCTO</header>
        <form class="form-register-product" action="#" @submit.prevent="">
            <div class="form-first">
                <div class="details-product">
                    <span class="title">DETALLE DEL PRODUCTO</span>
                    <div class="fields">
                        <div class="input-field">
                            <label>SKU</label>
                            <input type="text" placeholder="Codigo de producto" v-model="productName" required>
                        </div>
                        <div class="input-field">
                            <label>Marca</label>
                            <select v-model="productBrand" required>
                                <option disabled selected>Selecciona una marca</option>
                                <!-- <option v-for="brand in brands" :value="brand.id">
                                    {{ brand.name }}
                                </option> -->
                            </select>
                        </div>
                        <div class="input-field">
                            <label>Accesorio</label>
                            <select v-model="productCategory" required>
                                <option disabled selected>Selecciona una Categoria</option>
                                <!-- <option v-for="autopart in autoparts" :value="autopart.id">
                                    {{ autopart.name }}
                                </option> -->
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
                                <!-- <input id="vImagen" type="image" width="200" height="200"> -->
                                <input class="file-upload" type="file" accept="image/*" @change="uploadImageToImgur($event)" required/>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="details-btns">
                    <button class="savebtn">
                        <span class="btnGuardar">Guardar</span> 
                    </button>
                    
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script setup>

</script>