<template>
    <Navbar />
    <div class="body-register-product">
        <div class="register-container-product">
            <header>Producto</header>
            <form class="form-register-product" action="#">
                <div class="form-first">
                    <div class="field-search">
                        <div class="input-field-search">
                            <label>C&oacute;digo</label>
                            <input type="text" placeholder="Codigo del producto" id="txtCodigo" v-model="txtCodigo" />
                        </div>
                        <div class="button-search">
                            <button class="searchbtn" @click="getCodeItem">
                                <span class="btnBuscar">Buscar</span>
                            </button>
                        </div>
                    </div>
                    <div class="details-product">
                        <span class="title">Editar producto</span>
                        <div class="fields">
                            <div class="input-field">
                                <label>Nombre</label>
                                <input type="text" placeholder="Nombre del producto" v-model="vProductoNombre" />
                            </div>
                            <div class="input-field">
                                <label>Codigo</label>
                                <input type="text" placeholder="Codigo de producto" v-model="vCodigoProducto" />
                            </div>
                            <div class="input-field">
                                <label>Precio</label>
                                <input type="number" min="1" step="any" placeholder="Precio unitario"
                                    v-model="vPrecio" :disabled="store.getIsCapturist" />
                            </div>
                            <div class="input-field">
                                <label>Modelo</label>
                                <input type="text" placeholder="Modelo" v-model="vModelo" required />
                            </div>
                            <div class="input-field">
                                <label>Marca</label>
                                <select v-model="productBrand" required>
                                    <option disabled>Selecciona una marca</option>

                                    <option v-for="brand in brands" :value="brand.brandId">
                                        {{ brand.brandName }}
                                    </option>

                                </select>
                            </div>
                            <div class="input-field">
                                <label>Categoria</label>
                                <select v-model="productCategory" required>
                                    <option disabled>Selecciona una Categoria</option>
                                    <option v-for="autopart in autoparts" :value="autopart.autopartId">
                                        {{ autopart.autopartName }}
                                    </option>
                                </select>
                            </div>
                            <div class="input-field-checkbox-colors">
                                <label>Color</label>
                                <div class="checkbox-container" id="listColors" required>
                                    <label v-for="color in colors">
                                        <!-- <input type="checkbox" :id="['Row_' + color.id]" :value="color.id" @change="modifyColors($event)" /> -->
                                        <input type="checkbox" :id="['Row_' + color.id]" :value="color.id" />
                                        {{ color.name }}<br />
                                    </label>
                                </div>
                            </div>
                            <div class="input-field-text-area">
                                <label>Descripción</label>
                                <textarea type="text" class="text-area-register" name="descripcionRegister"
                                    v-model="vDescripcion" placeholder="Descripción del producto"></textarea>
                            </div>
                            <div class="input-field-image">
                                <label>Imagen</label>
                                <div class="p-image">
                                    <i class="ri-pencil-line upload-button"></i>

                                    <input id="vImagen" type="image" width="200" height="200">
                                    <input class="file-upload" type="file" accept="image/*"
                                        @change="uploadImageToImgur($event)" />

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
                        <button class="deletebtn" @click="deleteItem">
                            <span class="btnEliminar">Eliminar</span>
                        </button>
                        <button class="updatelbtn" @click="updateItem">
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
/* import mybutton from '@/components/mybutton.vue'; */

import axios from 'axios';
import axiosInstance from '../helpers/axiosInstance';
import { onBeforeMount, ref } from 'vue';
import { authStore } from '../stores/auth';
export default {
    name: 'Article',
    components: {
        Navbar
    },
    setup() {
        let store = authStore();
        var brands = ref(null);
        var colors = ref(null);
        var autoparts = ref(null);
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

        //Variable que contiene el dato a buscar
        var txtCodigo = ref('');

        //Variable donde se insertaran los datos encontrados
        var vProductoNombre = ref('');
        var vCodigoProducto = ref('');
        var vPrecio = ref('');
        var vModelo = ref('');
        var vDescripcion = ref('');
        var vidItem = ref('');
        var vImagen = ref('');



        //Variable de colores
        function getAllColors() {
            axios.get(import.meta.env.VITE_API_URL + '/api/color')
                .then(response => {
                    colors.value = response.data;
                }).catch(error => {
                    console.log(error);
                });
        }

        function getAllBrands() {
            axios.get(import.meta.env.VITE_API_URL + '/api/brand')
                .then(response => {
                    brands.value = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        }

        function getAllAutoparts() {
            axios.get(import.meta.env.VITE_API_URL + '/api/autopart')
                .then(response => {
                    autoparts.value = response.data;
                }).catch(error => {
                    console.log(error);
                });
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
                productImage.value = response.data.data.link;
                document.getElementById("vImagen").src = response.data.data.link;
                console.log(response.data.data.link);
            }).catch(error => {
                console.log(error);
            });

        }



        /*      function modifyColors(event) {
                 if (!colorsArray.value.includes(event.target.value)) {
                     colorsArray.value.push(event.target.value);
                 }
                 else {
                     colorsArray.value.splice(colorsArray.value.indexOf(event.target.value), 1);
                 }
             }
      */

        /* 
                function createItem() {
                    const item = {
                        name: vProductoNombre.value,
                        code: vCodigoProducto.value,
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
                } */

        onBeforeMount(() => {
            getAllBrands();
            getAllColors();
            getAllAutoparts();
            //getCodeItem();
        })

        return {
            getAllBrands,
            getAllColors,
            getAllAutoparts,
            //modifyColors,
            brands,
            store,
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
            productImage,
            txtCodigo, vProductoNombre, vCodigoProducto, vPrecio, vModelo, vDescripcion, vImagen, uploadImageToImgur
        }
    },
    methods: {


        clearForm() {
            //Dejar el limpio el formulario, ya que no existe el producto
            this.vProductoNombre = '';
            this.vCodigoProducto = '';
            this.vPrecio = '';
            this.vModelo = '';
            this.vDescripcion = '';
            this.productBrand = '';
            this.productCategory = '';
            document.getElementById("vImagen").src = '';

            var nElementsColors = document.getElementById("listColors");
            var inputElements = nElementsColors.querySelectorAll("input");
            var i = 0;
            for (i = 0; i < inputElements.length; i++) {
               /*  debugger; */
                var cNombreColor = "Row_" + (i + 1);
                document.getElementById(cNombreColor).checked = false;
            }

        },
        getCodeItem() {
            axios.get(import.meta.env.VITE_API_URL + '/api/item/code/' + this.txtCodigo)
                .then(response => {

                    //Pintar los valores encontrados en el formaulario
                    this.vProductoNombre = response.data.name;
                    this.vCodigoProducto = response.data.code;
                    this.vPrecio = response.data.price;
                    this.vModelo = response.data.model;
                    this.vDescripcion = response.data.description;
                    this.vidItem = response.data.id;

                    //Cambiar los combos, con el valor encontrado
                    this.productBrand = response.data.brandId;
                    this.productCategory = response.data.autoPartId;

                    //Actualizar los colores
                    for (let i in response.data.colors) {
                        var nColorEncontrado = response.data.colors[i];
                        var cNombreColor = "Row_" + nColorEncontrado;
                        document.getElementById(cNombreColor).checked = true;
                    }

                    //Actualiza Lado
                    this.productSide = response.data.side

                    //Actualiza la imagen
                    document.getElementById("vImagen").src = response.data.image;


                }).catch(error => {
                    alert("¡Producto no encontrado, favor de intentarlo nuevamente!");
                    clearForm();
                    console.log(error);
                });
        },
        deleteItem() {
            const itemx = { id: this.vidItem }
            axios.delete(import.meta.env.VITE_API_URL + '/api/item/' + this.vidItem, itemx)
                .then(response => {
                    alert("¡Registro eliminado!");
                    clearForm();
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });

        },


        updateItem() {

            //Recorre colores y los almacena en un array
            let nColores = document.getElementById('listColors').getElementsByTagName('input').length;

            for (let i = 1; i <= nColores; i++) {
                var cItemColor = "Row_" + i;
                var checkBoxcolor = document.getElementById(cItemColor);
                if (checkBoxcolor.checked == true) {
                    //alert("El elemento: " + cItemColor + " Esta activado");
                    this.colorsArray.push(i);
                }
            }

            const item = {
                name: this.vProductoNombre,
                description: this.vDescripcion,
                price: this.vPrecio,
                image: this.productImage,
                colors: this.colorsArray,
                model: this.vModelo,
                code: this.vCodigoProducto,
                side: this.productSide,
                brand: this.productBrand,
                autoPart: this.productCategory              
            }
 /* debugger; */
            axios.patch(import.meta.env.VITE_API_URL + '/api/item/' + this.vidItem, item)
                .then(response => {
                    alert("¡Registro actualizado!");
                    console.log(response);
                }).catch(error => {
                    console.log(error);
                    alert("¡Error al actualizar!");
                });

            /* 
            sirve para poner mensajes de alerta
              if (checkBox.checked == true){
                text.style.display = "block";
              } else {
                text.style.display = "none";
              } */





        }

    }


}

</script>
