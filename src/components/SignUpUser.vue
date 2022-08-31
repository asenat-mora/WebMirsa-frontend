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
                                <input type="text" v-model="name">
                                <div class="error" v-if="vName"> {{ errors.name }}</div>
                            </div>
                            <div class="input-field-b">
                                <label>Apellidos*</label>
                                <input type="text" v-model="surname">
                                <div class="error" v-if="vSurname"> {{ errors.surname }}</div>
                            </div>
                            <div class="input-field-b">
                                <label>Correo*</label>
                                <input type="text" v-model="email">
                                <div class="error" v-if="vEmail"> {{ errors.email }} </div>
                            </div>
                            <div class="input-field-b">
                                <label>Correo de Verificación*</label>
                                <input type="text" v-model="verificationEmail">
                                <div class="error" v-if="vEmailVerify"> {{ errors.verificationEmail }} </div>
                            </div>
                            <div class="input-field-b">
                                <label>Rol*</label>
                                <select v-model="userRol">
                                    <option selected disabled>Seleccione un Rol para el usuario</option>
                                    <option value="1">Administrador</option>
                                    <option value="2">Capturista</option>
                                </select>
                                <div class="error" v-if="vUserRol">{{ errors.rol }}</div>
                            </div>
                            <div class="input-field-b">
                                <label>Password*</label>
                                <input type="password" v-model="password">
                               <!--  <div class="error" v-if="vPassword"> {{ errors.name }}</div> -->
                            </div>
                            <div class="input-field-b">
                                <label>Confirmaci&oacute;n de Password*</label>
                                <input type="password" v-model="confirmPassword">
                                <!-- <div class="error" v-if="vPassword"> {{ errors.name }}</div> -->
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
    let errors = ref(null);
    let vName = ref(false);
    let vSurname = ref(false);
    let vEmail = ref(false);
    let vEmailVerify = ref(false);
    let vUserRol = ref(false);

    const props = defineProps({
        id: Number,
        name: String,
        surname: String,
        email: String,
        verificationEmail: String,
        userRol: Number,
        id: Number,
        mode: String
    })

    function clearForm(){
        props.name = '';
        props.surname = '';
        props.email = '';
        props.verificationEmail = '';
        props.userRol = '';

    }

    function goBack(event) {
        event.preventDefault();
        router.back();
    }

    function createUser() {
        const user = {
            name: props.name,
            surname: props.surname,
            email: props.email,
            verificationEmail: props.verificationEmail,
            roles: Array.of(parseInt(props.userRol)),
            password: password.value,
        }

        axios.post(import.meta.env.VITE_API_URL + '/api/users/signUp', user)
            .then(response => {
                notify({ title: "Exito", text: "¡Registro exitoso!", type: "success" });
                clearForm();
            }).catch(error => {
                if (error.response.status === 409) {

                    notify({ title: "Advertencia", text: "¡El correo ya se encuentra registrado!", type: "warn" });
                } else {
                    notify({ title: "Error", text: "¡Error en el registro!", type: "error" });
                }
            })
    }

    function updateUser() {
        const user = {
            name: props.name,
            surname: props.surname,
            email: props.email,
            verificationEmail: props.verificationEmail,
            roles: Array.of(parseInt(props.userRol)),
            password: password.value,
        }

        axios.patch(import.meta.env.VITE_API_URL + '/api/users/' + props.id, user)
            .then(response => {
                notify({ title: "Exito", text: "¡Registro exitoso!", type: "success" });
            }).catch(error => {
                if (error.response.status === 409) {
                    notify({ title: "Advertencia", text: "¡El correo ya se encuentra registrado!", type: "warn" });
                } else {
                    notify({ title: "Error", text: "¡Error en la actualización!", type: "error" });
                }
            })
    }

    /* validaciones */
    function checkName() {
        /* Busca que el nombre este definido */
        if (!props.name) {
            vName.value = true;
            errors.value.name = "El nombre de usuario es requerido";
            return;
        }
        /*quita espacios y los guarda en otra variable */
        let nameNoSpace = props.name.replace(/ /g, '');
        /* checa la longitud de la cadena, sin contar espacios */
        if (nameNoSpace.length < 3 || nameNoSpace.length > 20) {
            errors.value.name = "El nombre debe tener entre 3 y 20 caracteres alfabeticos";
            vName.value = true;
        }
        /* valida los caracteres aceptados */
        if (!/^[a-zA-Z ]+$/.test(props.name)) {
            errors.value.name = "El nombre debe contener solo letras";
            vName.value = true
        }
    }

    function checkSurname() {
        /* Busca que el nombre este definido */
        if (!props.surname) {
            vSurname.value = true;
            errors.value.surname = "Campo obligatorio";
            return;
        }
        /*quita espacios y los guarda en otra variable */
        let surnameNoSpace = props.surname.replace(/ /g, '');
        /* checa la longitud de la cadena, sin contar espacios */
        if (surnameNoSpace.length < 3 || surnameNoSpace.length > 20) {
            errors.value.surname = "Los apellidos deben tener entre 3 y 20 caracteres alfabeticos";
            vSurname.value = true;
        }
        /* valida los caracteres aceptados */
        if (!/^[a-zA-Z ]+$/.test(props.surname)) {
            errors.value.surname = "Debe contener solo letras";
            vSurname.value = true
        }
    }

    function checkEmail() {
        /* Busca que el nombre este definido */
        if (!props.email) {
            vEmail.value = true;
            errors.value.email = "El correo del usuario es requerido";
            return;
        }
        /*quita espacios y los guarda en otra variable */
        let emailNoSpace = props.email.replace(/ /g, '');
        /* checa la longitud de la cadena, sin contar espacios */
        if (emailNoSpace.length < 8 || emailNoSpace.length > 20) {
            errors.value.email = "El correo debe tener entre 8 y 20 caracteres alfabeticos";
            vEmail.value = true;
        }
        /* valida los caracteres aceptados */
        if (!/^[a-zA-Z ]+$/.test(props.email)) {
            errors.value.email = "El correo debe contener [letras, @ y . ]";
            vEmail.value = true
        }
    }

    function checkEmailVerify() {
        /* Busca que el email este definido */
        if (!props.verificationEmail) {
            vEmailVerify.value = true;
            errors.value.verificationEmail = "Campo obligatorio";
            return;
        }
        /*quita espacios y los guarda en otra variable */
        let emailVerifyNoSpace = props.verificationEmail.replace(/ /g, '');
        /* checa la longitud de la cadena, sin contar espacios */
        if (emailVerifyNoSpace.length < 8 || emailVerifyNoSpace.length > 20) {
            errors.value.verificationEmail = "Los apellidos deben tener entre 3 y 20 caracteres alfabeticos";
            vEmailVerify.value = true;
        }
        /* valida los caracteres aceptados */
        if (!/^[a-zA-Z ]+$/.test(props.verificationEmail)) {
            errors.value.verificationEmail = "Debe contener solo letras";
            vEmailVerify.value = true
        }
    }
  
    function checkRol() {
        if(!props.userRol){
            errors.value.rol = 'Debe seleccionar un rol';
            vUserRol.value = true;
        }
    }

    function validateFields(event, mode) {
        errors.value = {}
        vName.value = vSurname.value = vEmail.value = vEmailVerify.value = vUserRol.value = false;

        checkName()
        checkSurname()
        checkEmail()
        checkEmailVerify()
        checkRol()

        event.preventDefault();

        if(!vName.value && !vSurname.value && !vEmail.value && !vEmailVerify.value && vUserRol.value){
            if (mode === 'Create') {
                createUser(event);
            } else {
                updateUser(event);
            }
        }

        
    }


</script>