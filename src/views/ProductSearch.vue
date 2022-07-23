<script setup>
    import ProductCard from '@/components/ProductCard.vue';
    import { ref , onBeforeMount} from 'vue';
    import axios from 'axios';

    const brands = ref(null);
    const accessories = ref(null);
    const products = ref(null);

    async function getAllBrands() {
        return axios.get(import.meta.env.VITE_API_URL + '/api/brand')
            
    }

    async function getAllAccessories() {
        return axios.get(import.meta.env.VITE_API_URL + '/api/accessory')
    }

    async function getAllProducts() {
        return axios.get(import.meta.env.VITE_API_URL + '/api/product')
    }

    function searchBrandName(brandId) {
        return brands.value.filter(brand => brand.id == brandId)[0].name;
    }

    function searchAccessoryName(accessoryId) {
        return accessories.value.filter(accessory => accessory.id == accessoryId)[0].name;
    }


    onBeforeMount(() => {
        try{
            const results = Promise.all([getAllBrands(), getAllAccessories(), getAllProducts()]);
            results.then(response => {
                brands.value = response[0].data;
                accessories.value = response[1].data;
                products.value = response[2].data;
            })
        }catch(error){
            console.log(error);
        }
    });
</script>

<template>

    <div class="container-pro">

        <div class="bar-filter">
            <h3>BÚSQUEDA EXPRESS</h3>
             <div class="filter-options">
                 <div class="filter-a">
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
                        </div>
            </div>
        </div>

        <div class="section">
            <h1 class="H1">Productos</h1>
            <div class="content">
                    <div class="cards" v-for="product in products">
                        <ProductCard :sku="product.sku" :accessory="searchAccessoryName(product.accessoryId)" :brand="searchBrandName(product.brandId)" :model="product.model" :description="product.description" :url="product.image" />
                    </div>
            </div>
        </div>
    </div>

</template>