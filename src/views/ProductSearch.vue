<script setup>
import ProductCard from "@/components/ProductCard.vue";
import { ref, onBeforeMount } from "vue";
import Multiselect from '@vueform/multiselect'
import axios from "axios";

const brands = ref(null);
const accessories = ref(null);
const colors = ref(null);
/* const descriptions = ref(null); */
const products = ref(null);
const selectedBrands = ref([]);
const selectedAccessories = ref([]);
const selectedColors = ref([]);
const selectedDescriptions = ref([]);
const selectedSide = ref([]);


async function getAllBrands() {
  return axios.get(import.meta.env.VITE_API_URL + "/api/brand");
}

async function getAllAccessories() {
  return axios.get(import.meta.env.VITE_API_URL + "/api/accessory");
}

async function getAllProducts() {
  return axios.get(import.meta.env.VITE_API_URL + "/api/product");
}

async function getAllColors(){
  return axios.get(import.meta.env.VITE_API_URL + "/api/color");
}

function searchBrandName(brandId) {
  return brands.value.filter((brand) => brand.value == brandId)[0].label;
}

function searchAccessoryName(accessoryId) {
  return accessories.value.filter((accessory) => accessory.value == accessoryId)[0].label;
}


onBeforeMount(() => {
  try {
    const results = Promise.all([
      getAllBrands(),
      getAllAccessories(),
      getAllProducts(),
      getAllColors(),
    ]);
    results.then((response) => {
      brands.value = response[0].data.map((brand) => {
        return {
          value: brand.id,
          label: brand.name,
        };
      });

      accessories.value = response[1].data.map((accessory) => {
        return {
          value: accessory.id,
          label: accessory.name,
        };
      });

      products.value = response[2].data;

      colors.value = response[3].data.map((color) =>{
        return {
          value: color.id,
          label: color.name
        }
      })

    });
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
    <div class="container-pro">
      
        <div class="bar-filter">
            <div class="filter-options">
                <!-- <div class="option">
                    <label>Descripción</label>
                    <input class="option" type="text" v-model="selectedDescriptions" placeholder="Producto">
                </div> -->
                <div class="option">
                    <label>Marca</label>
                    <Multiselect class="option" v-model="selectedBrands" mode="tags" :close-on-select="false" :searchable="false" :create-option="false" :options="brands" placeholder="Seleccione una marca" />
                </div>
                <div class="option">
                    <label>Accesorio</label>
                    <Multiselect class="option" v-model="selectedAccessories" mode="tags" :close-on-select="false" :searchable="false" :create-option="false" :options="accessories" placeholder="Seleccione un accesorio"/>
                </div>
                <div class="option">
                    <label>Color</label>
                    <Multiselect class="option" v-model="selectedColors" mode="tags" :close-on-select="false" :searchable="false" :create-option="false" :options="colors" placeholder="Seleccione un color"/>
                </div>
                <div class="option">   
                    <label>Lado</label>
                    <Multiselect class="option" v-model="selectedSide" mode="tags" :close-on-select="false" :searchable="false" :create-option="false" :options="colors" placeholder="Lados"/>
                </div>            
            </div>
        </div>
           
           
           
           <!--  <div class="filter-a">
                <label>Marca</label>
            <select v-model="productBrand" required>
                <option disabled selected>Selecciona una marca</option>
                <option v-for="brand in brands" :value="brand.id">
                {{ brand.name }}
                </option>
            </select>
            </div>
            <div class="filter-b">
            <label>Accesorio</label>
            <select v-model="productCategory" required>
                <option disabled selected>Selecciona una Categoria</option>
                <option v-for="accessory in accessories" :value="accessory.id">
                {{ accessory.name }}
                </option>
            </select>
            </div>
            <div class="filter-c">
            <label>Lado</label>
            <select v-model="productSide" required>
                <option disabled selected>Selecciona un lado</option>
                <option value="Derecho">Derecho</option>
                <option value="Izquierdo">Izquierdo</option>
                <option value="Ambos">Ambos</option>
            </select>
            </div>
            <div class="button-search">
            <button class="searchbtn" @click="getCodeItem">
                <span class="btnBuscar">Buscar</span>
            </button>
            </div> -->


        <div class="section">
        <h1 class="H1">PRODUCTOS</h1>
        <div class="content">
            <div class="cards" v-for="product in products">
            <ProductCard
                :sku="product.sku"
                :accessory="searchAccessoryName(product.accessoryId)"
                :brand="searchBrandName(product.brandId)"
                :model="product.model"
                :description="product.description"
                :url="product.image"
            />
            </div>
        </div>
        </div>
    </div>
</template>

<style src="@vueform/multiselect/themes/default.css" ></style>
