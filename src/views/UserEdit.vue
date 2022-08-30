<template>

    <div class="body-register-user">
       <div class="register-container-user">
          <header>EDITAR USUARIO</header>
            <form class="form-register-user" @submit.prevent="validateForm">
                <div class="form-first">
                    <div class="details-user">
                        <span class="title">FORMULARIO</span>
                        <div class="fields">
                            <div class="input-field-b">
                                <label>Nombre*</label>
                                <input type="text" placeholder="Nombre de la marca" v-model="userName" >
                                <div class="error" v-if="vName"> {{ errors.name }}</div>
                            </div>
                            <div class="input-field-b">
                                <label>Apellido Paterno*</label>
                                <input type="text" placeholder="Nombre de la marca" v-model="userLastNameP" >
                                <div class="error" v-if="vLastNameP"> {{ errors.name }}</div>
                            </div>
                            <div class="input-field-b">
                                <label>Apellido Materno*</label>
                                <input type="text" placeholder="Nombre de la marca" v-model="userLastNameM" >
                                <div class="error" v-if="vLastNameM"> {{ errors.name }}</div>
                            </div>
                            <div class="input-field-b">
                                <label>Correo*</label>
                                <input type="text" placeholder="Clave de la marca" v-model="email" >
                                <div class="error" v-if="vEmail"> {{ errors.key }}</div>
                            </div>
                            <div class="input-field-b">
                                <label>Rol*</label>
                                <select v-model="userRol" @change="loadName">
                                    <option selected disabled >Seleccione un Rol para el usuario</option>
                                    <option v-for="accesory in accesories" :value = "accesory.id">
                                        {{accesory.name}}
                                    </option>           
                                </select>
                            </div>
                            <div class="input-field-b">
                                <label>Password*</label>
                                <input type="text" placeholder="Nombre de la marca" v-model="password" >
                                <div class="error" v-if="vPassword"> {{ errors.name }}</div>
                            </div>
                            <div class="input-field-b">
                                <label>>Confirmaci&oacute;n de Password*</label>
                                <input type="text" placeholder="Nombre de la marca" v-model="password" >
                                <div class="error" v-if="vPassword"> {{ errors.name }}</div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="details-btns">  
                        <button type="button" class="cancelbtn" @click="goBack($event)">
                                <span class="btnCancelar">Volver</span>
                        </button>
                        <button class="savebtn" type="submit" >
                            <span class="btnGuardar">Registrar</span> 
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </template>
    <script>
    import Navbar from '@/components/Navbar.vue';
        import { notify } from "@kyvg/vue3-notification"; /* libreria para importar alertas */
        import axios from 'axios';
        import { ref } from 'vue';
        import { useRouter } from 'vue-router';
    
        
    </script>