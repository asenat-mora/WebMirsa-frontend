<template>
<Navbar/>
<div class="body-register-product">
    <div class="register-container-product">
        <header>COLORES</header>
            <div class="form-first">
                <div class="details-product">
                    <span class="title">Lista de colores</span>
                    <div class="fields">
                        <div class="container mt-4" id="app">
                            <table class="GeneratedTable" >
                                <thead>
                                    <tr>
                                        <th>ID COLOR</th>
                                        <th>NOMBRE</th>
                                        <th>QUIEN MODIFIC&Oacute;</th>
                                        <th>OPERACI&Oacute;N</th>
                                        <th>ULTIMA MODIFICACI&Oacute;N</th>
                                        <th>ESTATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr v-for="datos in data">
                                    <td align="center">{{datos.colorId}}</td>
                                    <td align="center">{{datos.colorName}}</td>
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
        name : 'ListColor',
        components: {
            Navbar
        },
        setup(){
            var data = ref();
            function getData(){
                axios.get(import.meta.env.VITE_API_URL + '/api/color').then(response => {
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