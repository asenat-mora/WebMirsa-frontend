<template>

  <section class="Login-Mirsa">
            <div class="container-fluid p-0">
                <div class="row no-gutters">
                    <div class="col-sm-6 align-self-center">
                        <div class="Login-formulario">
                            <h1 class="mb-0">Iniciar Sesión</h1>
                            <p>Escribe tu correo electronico y contraseña para acceder</p>
                            <form >
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Correo electronico</label>
                                    <input type="email" class="form-control mb-0" id="exampleInputEmail1" placeholder="Escribe tu correo">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Contraseña</label>
                                    <a href="#" class="float-right">Olvidaste tu contraseña?</a>
                                    <input type="password" class="form-control mb-0" id="exampleInputPassword1" placeholder="Escribe tu Contraseña">
                                </div>
                                <div class="d-inline-block w-100">
                                    <div class="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                        <input type="checkbox" class="custom-control-input" id="customCheck1">
                                        <label class="custom-control-label" for="customCheck1">Recordarme</label>
                                    </div>
                                    <button type="submit" class="btn btn-primary float-right">Inicio</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-sm-6 text-center">
                        <div class="Login-Detalle text-white" style="background: url(src/assets/img/login/car.jpg) no-repeat 0 0; background-size: cover;">
                            <a class="Login-logo" href="#"><img src="../assets/img/logo-white-mirsa.png" class="img-fluid" alt="logo"></a>
                                 <div class="item">
                                    <!-- <h4 class="mb-1 text-white">Mikas Infante Ruiz S.A. de C.V.</h4> -->
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

</template>

<script setup> 



</script>

<style scoped >
@import '../assets/css/bootstrap.min.css';
@import '../assets/css/login.css';
@import '../assets/css/responsive.css';
@import '../assets/css/tipografia.css';
</style>
