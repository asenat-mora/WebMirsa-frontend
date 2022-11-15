<template>

    <div class="body-register-user">
        <div class="register-container-user">
            <header>USUARIO</header>
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
                                <label>Correo de Verificaci&oacute;n*</label>
                                <input type="text" v-model="verificationEmail">
                                <div class="error" v-if="vEmailVerify"> {{ errors.verificationEmail }} </div>
                            </div>
                            <div class="input-field-b">
                                <label>Contrase&ntilde;a*</label>
                                <input type="password" v-model="password">
                                <div class="error" v-if="vPassword"> {{ errors.password }}</div>
                            </div>
                            <div class="input-field-b">
                                <label>Confirmaci&oacute;n de contrase&ntilde;a*</label>
                                <input type="password" v-model="verificationPassword">
                                <div class="error" v-if="vPasswordVerify"> {{ errors.verificationPassword }}</div>
                            </div>
                            <div class="input-field-b">
                                <label>Rol de usuario*</label>
                                <select v-model="userRol">
                                    <option value="1">Administrador</option>
                                    <option value="2">Capturista</option>
                                </select>
                                <div class="error" v-if="vUserRol">{{ errors.rol }}</div>
                            </div>

                        </div>
                    </div>
                    <div class="details-btns">
                        <button type="button" class="cancelbtn" @click="goBack($event)">
                            <span class="btnCancelar">Volver</span>
                        </button>
                        <button class="savebtn" type="button" @click="validateFields($event, mode)">
                            <span class="btnGuardar">Registrar</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>

</template>

<script setup>

    import { useRouter } from 'vue-router';
    import { ref, watch, onMounted ,toRef} from 'vue';
    import axios from 'axios';
    import { notify } from "@kyvg/vue3-notification";

    const props = defineProps({
        idP: Number,
        nameP: String,
        surnameP: String,
        emailP: String,
        verificationEmailP: String,
        userRolP: Number,
        mode: String
    })

    const router = useRouter();
    let verificationPassword = ref();
    let name = toRef(props, 'nameP');
    let surname = toRef(props, 'surnameP');
    let email = toRef(props, 'emailP');
    let verificationEmail = toRef(props, 'verificationEmailP');
    let userRol = toRef(props, 'userRolP');
    let password = ref(null);
    let errors = ref(null);
    
    let vName = ref(false);
    let vSurname = ref(false);
    let vEmail = ref(false);
    let vEmailVerify = ref(false);
    let vPassword = ref(false);/* aqui me quede */
    let vPasswordVerify = ref(false);
    let vUserRol = ref(false);

    

    function clearForm(){
        name.value = '';
        surname.value = '';
        email.value = '';
        verificationEmail.value = '';
        password.value = '';
        verificationPassword.value = '';
        userRol.value = '';
    }

    function goBack(event) {
        event.preventDefault();
        router.back();
    }

    
    function createUser() {
        const user = {
            name: name.value,
            surname: surname.value,
            email: email.value,
            verificationEmail: verificationEmail.value,
            roles: Array.of(parseInt(userRol.value)),
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
            name: name.value,
            surname: surname.value,
            email: email.value,
            verificationEmail: verificationEmail.value,
            roles: Array.of(parseInt(userRol.value)),
            password: password.value,
        }

        axios.patch(import.meta.env.VITE_API_URL + '/api/users/' + props.idP, user)
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
        if (!name.value) {
            vName.value = true;
            errors.value.name = "El nombre usuario es requerido";
            return;
        }
        /*quita espacios y los guarda en otra variable */
        let nameNoSpace = name.value.replace(/ /g, '');
        /* checa la longitud de la cadena, sin contar espacios */
        if (nameNoSpace.length < 3 || nameNoSpace.length > 20) {
            errors.value.name = "El nombre debe tener entre 3 y 20 caracteres alfabeticos";
            vName.value = true;
        }
        /* valida los caracteres aceptados */
        if (!/^[a-zA-Z ]+$/.test(name.value)) {
            errors.value.name = "Solo se permiten caracteres alfabéticos";
            vName.value = true
        }
    }

    function checkSurname() {
        /* Busca que el nombre este definido */
        if (!surname.value) {
            vSurname.value = true;
            errors.value.surname = "Campo obligatorio";
            return;
        }
        /*quita espacios y los guarda en otra variable */
        let surnameNoSpace = surname.value.replace(/ /g, '');
        /* checa la longitud de la cadena, sin contar espacios */
        if (surnameNoSpace.length < 3 || surnameNoSpace.length > 30) {
            errors.value.surname = "Los apellidos deben tener entre 3 y 30 caracteres alfabeticos";
            vSurname.value = true;
        }
        /* valida los caracteres aceptados */
        if (!/^[a-zA-Z ]+$/.test(surname.value)) {
            errors.value.surname = "Solo se permiten caracteres alfabéticos";
            vSurname.value = true
        }
    }

    function checkEmail() {
        /* Busca que el nombre este definido */
        if (!email.value) {
            vEmail.value = true;
            errors.value.email = "Campo obligatorio";
            return;
        }
        /*quita espacios y los guarda en otra variable */
        let emailNoSpace = email.value.replace(/ /g, '');
        /* checa la longitud de la cadena, sin contar espacios */
        if (emailNoSpace.length < 8 || emailNoSpace.length > 30) {
            errors.value.email = "El correo debe tener entre 8 y 30 caracteres";
            vEmail.value = true;
        }
        /* valida los caracteres aceptados */
        if (!/^[.@_a-zA-Z0-9 ]+$/.test(email.value)) {
            errors.value.email = "Caracteres aceptados @._";
            vEmail.value = true
        }
    }

    function checkEmailVerify() {
        /* Busca que el email este definido */
        if (!verificationEmail.value) {
            vEmailVerify.value = true;
            errors.value.verificationEmail = "Campo obligatorio";
            return;
        }
        /*quita espacios y los guarda en otra variable */
        let emailVerifyNoSpace = verificationEmail.value.replace(/ /g, '');
        /* checa la longitud de la cadena, sin contar espacios */
        if (emailVerifyNoSpace.length < 8 || emailVerifyNoSpace.length > 30) {
            errors.value.verificationEmail = "El correo debe tener entre 8 y 20 caracteres";
            vEmailVerify.value = true;
        }
        /* valida los caracteres aceptados */
        if (!/^[.@_a-zA-Z0-9 ]+$/.test(verificationEmail.value)) {
            errors.value.verificationEmail = "Caracteres aceptados @._ ";
            vEmailVerify.value = true
        }
    }
  
    function checkRol() {
        if(!props.userRol){
            errors.value.rol = 'Seleccionar un rol';
            vUserRol.value = true;
        }
    }

    function checkPassword() {
        /* Busca que el nombre este definido */
        if (!password.value) {
            vPassword.value = true;
            errors.value.password = "Campo obligatorio";
            return;
        }
        /*quita espacios y los guarda en otra variable */
        let passwordNoSpace = password.value.replace(/ /g, '');
        /* checa la longitud de la cadena, sin contar espacios */
        if (passwordNoSpace.length < 8 || passwordNoSpace.length > 20) {
            errors.value.password = "La contraseña debe tener entre 8 y 20 caracteres";
            vPassword.value = true;
        }
        /* valida los caracteres aceptados .@*+?^${}()|[\] */ 
        if (!/^[a-zA-Z0-9.@*+?^${}()|[\] ]+$/.test(password.value)) {
            errors.value.password = "Caracteres aceptados";
            vPassword.value = true
        }
    }

    function checkPasswordVerify() {
        /* Busca que el nombre este definido */
        if (!verificationPassword.value) {
            vPasswordVerify.value = true;
            errors.value.verificationPassword = "Confirmar su contraseña";
            return;
        }
        /*quita espacios y los guarda en otra variable */
        let passwordNoSpace = verificationPassword.value.replace(/ /g, '');
        /* checa la longitud de la cadena, sin contar espacios */
        if (passwordNoSpace.length < 8 || passwordNoSpace.length > 20) {
            errors.value.verificationPassword = "La contraseña debe tener entre 8 y 20 caracteres";
            vPasswordVerify.value = true;
        }
        /* valida los caracteres aceptados */
        if (!/^[a-zA-Z0-9.@*+?^${}()|[\] ]+$/.test(verificationPassword)) {
            errors.value.password = "Caracteres aceptados";
            vPassword.value = true
        }
        if(verificationPassword.value !== props.password){
            errors.value.verificationPassword = "Las contraseñas no coinciden";
            vPasswordVerify.value = true;
        }
    }

    function validateFields(event, mode) {
        errors.value = {}
        vName.value = vSurname.value = vEmail.value = vEmailVerify.value = vPassword.value = vPasswordVerify.value = vUserRol.value = false;

        checkName()
        checkSurname()
        checkEmail()
        checkEmailVerify()
        checkRol()
        checkPassword()
        checkPasswordVerify()

        event.preventDefault();

        if(!vName.value && !vSurname.value && !vEmail.value && !vEmailVerify.value && !vPassword.value && !vPasswordVerify.value && !vUserRol.value){
            if (mode === 'Create') {
                createUser();
            } else {
                updateUser();
            }
        }

        
    }



</script>