<template>
    <body class="login-body">
        <div class="login-container">
            <div class="login-info-container">
                <h1 class="login-litle">Iniciar Sesión</h1>
                <form class="login-form" v-on:submit.prevent >
                    <input class="login-input" type="email" v-model="email" placeholder="Correo electronico">
                    <input class="login-input" type="password" v-model="password" placeholder="Contraseña">
                    <a href="#"> <span class="login-span">Olvidaste tu contraseña?</span> </a>

                    <button class="login-btn" @click="invokeLogin">
                        Login
                    </button>

                    <p>No tengo una cuenta
                        <br>
                        <a href="formRegisterUser.html">
                            <span class="login-span">Registrarse</span>
                        </a>
                    </p>
                </form>
            </div>
            <img class="login-image-container" src="../assets/img/login/car.jpg" alt="">
        </div>
    </body>
</template>

<script>
import { ref } from "vue";
import { authStore } from "@/stores/auth";
import { useRouter } from "vue-router";
export default{
    name: 'Login',
    setup(){
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
            invokeLogin
        }
    }
}
</script>