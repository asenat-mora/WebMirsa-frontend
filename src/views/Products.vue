<script>
import ProductCard from '@/components/ProductCard.vue'
export default {
    name: "Article",
    components: {
        ProductCard
    },
};
</script>
<template>

    <div class="container-pro">

       <!--  <div class="bar-filter">
            <h3>BÚSQUEDA EXPRESS</h3>
             <div class="filter-options">
                 <div class="filter-a">
                            <label>Marca</label>
                            <select v-model="productBrand" required>
                                <option disabled selected>Selecciona una marca</option>
                                <option v-for="brand in brands" :value="brand.brandId">
                                    {{ brand.brandName }}
                                </option>
                            </select>
                        </div>
                        <div class="filter-b">
                            <label>Accesorio</label>
                            <select v-model="productCategory" required>
                                <option disabled selected>Selecciona una Categoria</option>
                                <option v-for="autopart in autoparts" :value="autopart.autopartId">
                                    {{ autopart.autopartName }}
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
        </div> -->

        <div class="section">
            <h1 class="H1">Productos</h1>
            <div class="content">
                 <!-- items -->
                <ProductCard sku="SKU" accessory="Accesorio" brand="Marca" model="modelo" description="descripcion"  url="https://http2.mlstatic.com/D_NQ_NP_723221-MLM20735839083_052016-O.webp"/>
                <ProductCard sku="SKU" accessory="Accesorio" brand="Marca" model="modelo" description="descripcion"  url="https://http2.mlstatic.com/D_NQ_NP_723221-MLM20735839083_052016-O.webp"/>
                <!-- <div class="card-item">
                    <div class="product-a">
                            <img class="im" src="../assets/img/products/micaPlafonFordEscudoConReversa1F.png" alt="prueba"/>
                    </div>
                    <div class="info">
                        <span class="pku">SKU</span>
                        <span class="name">Accesorio</span>
                        <span class="brand">Marca</span>
                        <span class="model">Modelo</span>
                        <span class="description">descripcion</span>
                        
                    </div>
                </div> -->

            </div>
        </div>

    </div>

</template>

<!-- <script>

</script> -->
