<template>
<Navbar/>
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
                                        <th>NOMBRE</th>
                                        <th>QUIEN MODIFICO</th>
                                        <th>OPERACION</th>
                                        <th>ULTIMA MODIFICACION</th>
                                        <th>ESTATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr v-for="datos in data">
                                    <td>{{datos.id}}</td>
                                    <td>{{datos.name}}</td>
                                    <td>{{datos.id_last_user}}</td>
                                    <td>{{datos.last_modification_description}}</td>
                                    <td>{{datos.last_modification_date}}</td>
                                    <td>{{datos.isDeleted}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="details-btns">
                    <button class="savebtn">
                        <span class="btnGuardar">Aceptar</span> 
                    </button>
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