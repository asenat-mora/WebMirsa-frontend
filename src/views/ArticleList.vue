<template>

<div class="body-register-product">
    <div class="register-container-product">
        <header>Producto</header>
            <div class="form-first">
                <div class="details-product">
                    <span class="title">Lista de productos</span>
                    <div class="fields">
                        <div class="container mt-4" id="app">
                            <table class="GeneratedTable" >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>CODIGO</th>
                                        <th>NOMBRE</th>
                                        <th>MARCA</th>
                                        <th>CLASIFICACION</th>
                                        <th>MODELO</th>
                                        <th>LADO</th>
                                        <th>COLOR</th>
                                        <th>DESCRIPCION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr v-for="datos in data">
                                    <td>{{datos.id}}</td>
                                    <td>{{datos.code}}</td>
                                    <td>{{datos.name}}</td>
                                    <td>{{datos.brandName}}</td>
                                    <td>{{datos.autoPartName}}</td>
                                    <td>{{datos.model}}</td>
                                    <td>{{datos.side}}</td>
                                    <td>{{datos.colors}}</td>
                                    <td>{{datos.description}}</td>
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
        name : 'ArticleList',
        components: {
            Navbar
        },
        setup(){
            var data = ref();
            function getData(){
                axios.get(import.meta.env.VITE_API_URL + '/api/item').then(response => {
                    
                    response.data.forEach(element =>{
                        let colors = element.colors;
                        let colorNames = colors.map(element =>element.name).join(", ");
                        element.colors = colorNames;
                    })
                    
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