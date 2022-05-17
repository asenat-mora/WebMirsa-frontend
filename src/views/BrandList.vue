<template>
<Navbar/>
<div class="body-register-product">
    <div class="register-container-product">
        <header>Marcas</header>
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
                                    <td align="center">{{datos.id_marca}}</td>
                                    <td align="center">{{datos.nombre_marca}}</td>
                                    <td align="center">{{datos.nombre}} {{datos.apellido}}</td>
                                    <td align="center">{{datos.OPERACION}}</td>
                                    <td align="center">{{datos.last_modification_date}}</td>
                                    <td align="center">{{datos.ESTATUS}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="details-btns">
<!--                     <button class="savebtn">
                        <span class="btnGuardar">Aceptar</span> 
                    </button> -->
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