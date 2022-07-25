<template>
    <div class="login-body">
        <div class="login-container">
            <div class="login-info-container">
                <h1 class="login-litle">INICIAR SESION</h1>
                <form class="login-form" v-on:submit.prevent >
                    <input class="login-input" type="email" v-model="email" placeholder="Correo electronico">
                    <input class="login-input" type="password" v-model="password" placeholder="Contraseña">
                    <a href="#"> <span class="login-span">Olvidaste tu contraseña?</span> </a>
                    <VueRecaptcha
                        :sitekey="siteKey"
                        :load-recaptcha-script="true"
                        @verify="handleSuccess"
                        @error="handleError"
                    ></VueRecaptcha>
                    <button class="login-btn" ref="loginBtn" disabled @click="invokeLogin">
                        Login
                    </button>
                   
                   <!--  <p>No tengo una cuenta
                        <br>
                        <a href="formRegisterUser.html">
                            <span class="login-span">Registrarse</span>
                        </a>
                    </p> -->
                </form>
            </div>
            <img class="login-image-container" src="../assets/img/login/car.jpg" alt="">
        </div>
    </div>
</template>

<script>
import { ref,computed } from "vue";
import { authStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { VueRecaptcha } from 'vue-recaptcha';

export default{
    name: 'Login',
    components: {
    VueRecaptcha
    },
    setup(){
        const loginBtn = ref('');

        const siteKey = computed(() => {
            return '6LdL3MAfAAAAAPXFeWcxj1o2zll7jmENlxHo-gHR';
        });

        const handleError = () => {
        // Do some validation
        };

        const handleSuccess = (response) => {
            loginBtn.value.disabled = false;
        };
        const store = authStore();
        const router = useRouter();

        const email = ref('')
        const password = ref('')

        function invokeLogin(){
            const payload = {
                email: email.value,
                password: password.value
            }
        
            store.login(payload).then(() => {
                router.push('/')
            }).catch((error) => {
                console.log(error)
                alert('Usuario o contraseña incorrectos')
            })
        }

        return {
            email,
            password,
            invokeLogin,
            handleSuccess,
            handleSuccess,
            handleError,
            siteKey,
            loginBtn
        }
    }
}
</script>