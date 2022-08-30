<template>

    <div class="body-register-user">
        <div class="register-container-user">
            <header>ALTA DE USUARIO</header>
            <form class="form-register-user" @submit.prevent="validateForm">
                <div class="form-first">
                    <div class="details-user">
                        <span class="title">FORMULARIO DE REGISTRO</span>
                        <div class="fields">
                            <div class="input-field-b">
                                <label>Nombre*</label>
                                <input type="text" placeholder="Nombre de la marca" v-model="name">
                                <div class="error" v-if="vName"> {{  errors.name  }}</div>
                            </div>
                            <div class="input-field-b">
                                <label>Apellidos*</label>
                                <input type="text" placeholder="Nombre de la marca" v-model="surname">
                                <div class="error" v-if="vLastNameP"> {{  errors.name  }}</div>
                            </div>
                            <div class="input-field-b">
                                <label>Correo*</label>
                                <input type="text" placeholder="Clave de la marca" v-model="email">
                                <div class="error" v-if="vEmail"> {{  errors.key  }}</div>
                            </div>
                            <div class="input-field-b">
                                <label>Correo de Verificación*</label>
                                <input type="text" placeholder="Clave de la marca" v-model="verificationEmail">
                                <div class="error" v-if="vEmail"> {{  errors.key  }}</div>
                            </div>
                            <div class="input-field-b">
                                <label>Rol*</label>
                                <select v-model="userRol">
                                    <option selected disabled>Seleccione un Rol para el usuario</option>
                                    <option value="1">Administrador</option>
                                    <option value="2">Capturista</option>
                                </select>
                            </div>
                            <div class="input-field-b">
                                <label>Password*</label>
                                <input type="text" placeholder="Nombre de la marca" v-model="password">
                                <div class="error" v-if="vPassword"> {{  errors.name  }}</div>
                            </div>
                            <div class="input-field-b">
                                <label>Confirmaci&oacute;n de Password*</label>
                                <input type="text" placeholder="Nombre de la marca" v-model="confirmPassword">
                                <div class="error" v-if="vPassword"> {{  errors.name  }}</div>
                            </div>

                        </div>
                    </div>
                    <div class="details-btns">
                        <button type="button" class="cancelbtn" @click="goBack($event)">
                            <span class="btnCancelar">Volver</span>
                        </button>
                        <button class="savebtn" type="button" @click="validateFields($event, mode)">
                            <span class="btnGuardar">Confirmar</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>

</template>

<script setup>

    import { useRouter } from 'vue-router';
    import { ref } from 'vue';
    import axios from 'axios';
    import { notify } from "@kyvg/vue3-notification";

    const router = useRouter();

    const password = ref(null);
    const confirmPassword = ref(null);


    const props = defineProps({
        id: Number,
        name: String,
        surname: String,
        email: String,
        verificationEmail: String,
        userRol: String,
        id: Number,
        mode: String
    })

    function goBack(event){
        event.preventDefault();
        router.back();
    }

    function createUser(){
        const user = {
            name: props.name,
            surname: props.surname,
            email: props.email,
            verificationEmail: props.verificationEmail,
            roles: Array.of(parseInt(props.userRol)),
            password: password.value,
        }

        axios.post(import.meta.env.VITE_API_URL + '/api/users/signUp', user)
            .then(response =>{
                notify({title: "Exito", text: "¡Registro exitoso!", type: "success"});
            }).catch(error => {
                if(error.response.status === 409){
                
                notify({title: "Advertencia", text: "¡El correo ya se encuentra registrado!", type: "warn"});
            }else{
                notify({title: "Error", text: "¡Error en el registro!", type: "error"});
            }
            })
        
    }

    function updateUser(){
        const user = {
            name: props.name,
            surname: props.surname,
            email: props.email,
            verificationEmail: props.verificationEmail,
            roles: Array.of(parseInt(props.userRol)),
            password: password.value,
        }

        axios.patch(import.meta.env.VITE_API_URL + '/api/users/' + props.id, user)
            .then(response =>{
                notify({title: "Exito", text: "¡Registro exitoso!", type: "success"});
            }).catch(error => {
                if(error.response.status === 409){
                notify({title: "Advertencia", text: "¡El correo ya se encuentra registrado!", type: "warn"});
            }else{
                notify({title: "Error", text: "¡Error en la actualización!", type: "error"});
            }
            })
    }

    function validateFields(event, mode){
        event.preventDefault();
        if(mode === 'Create'){
            createUser();
        }else{
            
            updateUser();
        }
    }



</script>