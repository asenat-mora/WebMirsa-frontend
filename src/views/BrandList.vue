<template>
<!-- <Navbar/> -->
<div class="body-register-marca">
    <div class="register-container-marca">
        <header>MARCAS</header>
        <!-- barra de filtros -->
        <div class="container-filter">
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
            <!-- tabla de productos -->
            <div class="form-first">
                <div class="details-product">
                    <span class="title">Lista de marcas</span>
                    <div class="fields">
                        <div class="container mt-4" id="app">
                            <table class="GeneratedTable" >
                                <thead>
                                    <tr>
                                        <th>ID MARCA</th>
                                        <th>NOMBRE</th>
                                        <th>QUIEN MODIFIC&Oacute;</th>
                                        <th>OPERACI&Oacute;N</th>
                                        <th>ULTIMA MODIFICACI&Oacute;N</th>
                                        <th>ESTATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr v-for="datos in data">
                                    <td align="center">{{datos.brandId}}</td>
                                    <td align="center">{{datos.brandName}}</td>
                                    <td align="center">{{datos.userName}} {{datos.userSurname}}</td>
                                    <td align="center">{{datos.last_modification_description}}</td>
                                    <td align="center">{{datos.last_modification_date}}</td>
                                    <td align="center">{{datos.isDeleted}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</div>
</template>

<script>
    import Navbar from '../components/Navbar.vue'
    import axios from 'axios'
    import { onBeforeMount, ref } from 'vue';
    export default{
        name : 'BrandList',
        components: {
            Navbar
        },
        setup(){
            var data = ref();
            function getData(){
                axios.get(import.meta.env.VITE_API_URL + '/api/brand').then(response => {
                    data.value = response.data
                }).catch(error => {
                    console.log(error)
                })
            }
            onBeforeMount(() => {
                getData();
            });

            return {
                data,
                getData
            }
        }
    }
</script>