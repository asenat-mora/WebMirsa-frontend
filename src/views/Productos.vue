<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Article",
  components: {
    Navbar,
  },
};
</script>
<template>

  <!--   <nav>
      <Navbar />
    </nav> -->

    <div class="body-product">
        <!--  <h1 class="h1">Productos</h1> -->
        <div class="bar-filter">
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
        </div>

        <div class="container">
           <!--  <h1 class="h1">Productos</h1> -->
            <div class="content">
                 <!-- items -->
                <div class="card-item">
                    <div class="product-a">
                            <img class="im" src="../assets/img/products/micaPlafonFordEscudoConReversa1F.png" alt="prueba"/>
                    </div>
                    <div class="info">
                        <span class="pku">PKU</span>
                        <span class="name">Accesorio</span>
                        <span class="brand">Marca</span>
                        <span class="description">descripcion</span>
                    </div>
                </div>
                <div class="card-item">
                    <div class="product-a">
                            <img class="im" src="../assets/img/products/micaPlafonFordEscudoConReversa1F.png" alt="prueba"/>
                    </div>
                    <div class="info">
                        <span class="name">Accesorio</span>
                        <span class="brand">Marca</span>
                        <span class="description">descripcion</span>
                    </div>
                </div>
                <div class="card-item">
                    <div class="product-a">
                            <img class="im" src="../assets/img/products/micaPlafonFordEscudoConReversa1F.png" alt="prueba"/>
                    </div>
                    <div class="info">
                        <span class="name">Accesorio</span>
                        <span class="brand">Marca</span>
                        <span class="description">descripcion</span>
                    </div>
                </div>
                <div class="card-item">
                    <div class="product-a">
                            <img class="im" src="../assets/img/products/micaPlafonFordEscudoConReversa1F.png" alt="prueba"/>
                    </div>
                    <div class="info">
                        <span class="name">Accesorio</span>
                        <span class="brand">Marca</span>
                        <span class="description">descripcion</span>
                    </div>
                </div>
                <div class="card-item">
                    <div class="product-a">
                            <img class="im" src="../assets/img/products/micaPlafonFordEscudoConReversa1F.png" alt="prueba"/>
                    </div>
                    <div class="info">
                        <span class="name">Accesorio</span>
                        <span class="brand">Marca</span>
                        <span class="description">descripcion</span>
                    </div>
                </div>
                <div class="card-item">
                    <div class="product-a">
                            <img class="im" src="../assets/img/products/micaPlafonFordEscudoConReversa1F.png" alt="prueba"/>
                    </div>
                    <div class="info">
                        <span class="name">Accesorio</span>
                        <span class="brand">Marca</span>
                        <span class="description">descripcion</span>
                    </div>
                </div>
                <div class="card-item">
                    <div class="product-a">
                            <img class="im" src="../assets/img/products/micaPlafonFordEscudoConReversa1F.png" alt="prueba"/>
                    </div>
                    <div class="info">
                        <span class="name">Accesorio</span>
                        <span class="brand">Marca</span>
                        <span class="description">descripcion</span>
                    </div>
                </div>
                <div class="card-item">
                    <div class="product-a">
                            <img class="im" src="../assets/img/products/micaPlafonFordEscudoConReversa1F.png" alt="prueba"/>
                    </div>
                    <div class="info">
                        <span class="name">Accesorio</span>
                        <span class="brand">Marca</span>
                        <span class="description">descripcion</span>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<!-- <script>

</script> -->
