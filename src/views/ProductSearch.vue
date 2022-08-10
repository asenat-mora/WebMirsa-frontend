<script setup>
import ProductCard from "@/components/ProductCard.vue";
import { ref, onBeforeMount } from "vue";
import Multiselect from '@vueform/multiselect'
import axios from "axios";
import { stringify } from "query-string";
const brands = ref(null);
const accessories = ref(null);
const colors = ref(null);
const products = ref(null);
const selectedBrands = ref([]);
const sides = ref(['Derecho', 'Izquierdo', 'Ambos']);
const selectedAccessories = ref([]);
const selectedColors = ref([]);
const description = ref([]);
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

async function getProductsFiltered(query){
    return axios.get(import.meta.env.VITE_API_URL + "/api/product/search/filter?" + query);
}


function searchBrandName(brandId) {
  return brands.value.filter((brand) => brand.value == brandId)[0].label;
}


function searchAccessoryName(accessoryId) {
  return accessories.value.filter((accessory) => accessory.value == accessoryId)[0].label;
}



function search(){
    let queryObject = {
        brands: selectedBrands.value,
        accessories: selectedAccessories.value,
        colors: selectedColors.value,
        side: selectedSide.value,
    };

    if (description.value.length > 0) {
        console.log(description.value.length);
        queryObject.description = description.value;
    }

    var query = stringify(queryObject, {arrayFormat: 'bracket'});
    
    getProductsFiltered(query).then(response => {
        products.value = response.data;
        console.log(products.value.length)
    });
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
                <div class="option-first-row">
                    <label>Marca</label>
                    <Multiselect class="select" v-model="selectedBrands" mode="tags" :close-on-select="false" :searchable="false" :create-option="false" :options="brands" placeholder="Seleccione una marca" />
                </div>
                <div class="option-first-row">
                    <label>Accesorio</label>
                    <Multiselect class="select" v-model="selectedAccessories" mode="tags" :close-on-select="false" :searchable="false" :create-option="false" :options="accessories" placeholder="Seleccione un accesorio"/>
                </div>
                <div class="option-second-row">
                    <label>Color</label>
                    <Multiselect class="select" v-model="selectedColors" mode="tags" :close-on-select="false" :searchable="false" :create-option="false" :options="colors" placeholder="Seleccione un color"/>
                </div>
                <div class="option-second-row">   
                    <label>Lado</label>
                    <Multiselect class="select" v-model="selectedSide" :close-on-select="true" :searchable="false" :create-option="false" :options="sides" placeholder="Lados"/>
                </div>  
                <div class="option-second-row">
                    <label>Descripción</label>
                    <input class="txtbox" type="text" v-model="description" placeholder="Modelo">
                </div>          
            </div>
            <div class="filter-buttons">
                <button class="button" @click="search">Buscar</button>
            </div>
        </div>

        <div class="section">
        <h1 class="H1">PRODUCTOS</h1>
        <div class="content">
            <div v-if = "products === null"></div>
            <template v-else-if="products.length === 0 ">
                <div class="no-results">
                    <h2>No se encontraron resultados</h2>
                </div>
            </template>
            <template v-else>
                <div class="cards" v-for="product in products">
                    <ProductCard
                        :sku="product.sku"
                        :accessory="searchAccessoryName(product.accessoryId)"
                        :brand="searchBrandName(product.brandId)"
                        :model="product.model"
                        :description="product.description"
                        :url="product.image"
                        :id= "product.id"
                    />
            </div>
            </template>
                
                
            
        </div>
        </div>
    </div>
</template>

<style src="@vueform/multiselect/themes/default.css" ></style>
