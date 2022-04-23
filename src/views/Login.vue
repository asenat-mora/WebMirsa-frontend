<template>
    <body class="login-body">
        <div class="login-container">
            <div class="login-info-container">
                <h1 class="login-litle">Iniciar Sesión</h1>
                <form class="login-form">
                    <input class="login-input" type="email" placeholder="Correo electronico">
                    <input class="login-input" type="password" placeholder="Contraseña">
                    <a href="#"> <span class="login-span">Olvidaste tu contraseña?</span> </a>

                    <router-link to="/" class="login-btn"><!-- link -->
                        Login
                    </router-link>

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
export default{
    name: 'Login',
}
</script>