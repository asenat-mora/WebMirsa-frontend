<template>
    <div class="container-coti">
        <div class="section-a">
            <h1 class="H1">1.Crear Lista</h1>
            <h1 class="H1B">2.Datos de contacto</h1>
            <h1 class="H1">3.Enviar Solicitud</h1>
        </div>
        <div class="section-b">
            <div class="subSection-A">
                <h2>Datos de cotización</h2>
                <div class="container-colum">
                    <div class="txt">
                        <label>Nombre* </label>
                            <input type="text" placeholder="Nombre" />
                    </div>
                    <div class="txt">
                        <label>Apellido* </label>
                        <input type="text" placeholder="Apellido" />
                    </div>
                    <div class="txt">
                        <label>Correo* </label>
                        <input type="text" placeholder="Correo" />
                    </div> 
                    <div class="txt">
                        <label>Ciudad* </label>
                        <input type="text" placeholder="Ciudad" />
                    </div>          
                <div class="txt">
                    <label>Comentarios</label> <br>
                    <input type="text" class="txt-area" />
                </div>
                </div>
            </div>
            <div class="subSection-b">
                <h2>Lista de productos</h2>
                <div class="cardProduct">
                    <div class="cardContainer">
                    <div class="img-cont">
                        <img src="https://elcanelo.mx/wp-content/uploads/2020/11/20-6362-05-1A.jpg" alt="prueba">
                    </div>
                    <div class="txt-info">
                        <span class="sku">{{sku}}supersku</span>
                        <span class="name">{{accessory}}supername</span>
                        <span class="brand">{{brand}}supermarca</span>
                        <span class="model">{{model}}supercolor</span>
                        <span class="description">{{description}}superdesc</span>
                    </div>

                </div>
                <div class="card-btn">
                        <!-- <button type="submit" class="deletebtnn">
                            <font-awesome-icon icon="fa-sharp fa-solid fa-trash-can" />
                            <span class="btnGuardar">Borrar</span>
                        </button> -->
                        <div class="icons">
                            <a href="#"><font-awesome-icon icon="fa-sharp fa-solid fa-trash-can" /></a>
                        </div>
                    </div>
                </div>
                <div class="cardProduct">
                    <div class="cardContainer">
                    <div class="img-cont">
                        <img src="https://elcanelo.mx/wp-content/uploads/2020/11/20-6362-05-1A.jpg" alt="prueba">
                    </div>
                    <div class="txt-info">
                        <span class="sku">{{sku}}supersku</span>
                        <span class="name">{{accessory}}supername</span>
                        <span class="brand">{{brand}}supermarca</span>
                        <span class="model">{{model}}supercolor</span>
                        <span class="description">{{description}}superdesc</span>
                    </div>

                </div>
                <div class="card-btn">
                        <!-- <button type="submit" class="deletebtnn">
                            <font-awesome-icon icon="fa-sharp fa-solid fa-trash-can" />
                            <span class="btnGuardar">Borrar</span>
                        </button> -->
                        <div class="icons">
                            <a href="#"><font-awesome-icon icon="fa-sharp fa-solid fa-trash-can" /></a>
                        </div>
                    </div>
                </div>
                <div class="cardProduct">
                    <div class="cardContainer">
                    <div class="img-cont">
                        <img src="https://elcanelo.mx/wp-content/uploads/2020/11/20-6362-05-1A.jpg" alt="prueba">
                    </div>
                    <div class="txt-info">
                        <span class="sku">{{sku}}supersku</span>
                        <span class="name">{{accessory}}supername</span>
                        <span class="brand">{{brand}}supermarca</span>
                        <span class="model">{{model}}supercolor</span>
                        <span class="description">{{description}}superdesc</span>
                    </div>

                </div>
                <div class="card-btn">
                        <!-- <button type="submit" class="deletebtnn">
                            <font-awesome-icon icon="fa-sharp fa-solid fa-trash-can" />
                            <span class="btnGuardar">Borrar</span>
                        </button> -->
                        <div class="icons">
                            <a href="#"><font-awesome-icon icon="fa-sharp fa-solid fa-trash-can" /></a>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        
        <div class="section-c">
            <div class="details"> 
                <p>
                    No se garantiza la disponibilidad de productos
                </p>
                <!--recaptcha -->
                <div class="recvue">
                    <VueRecaptcha
                    :sitekey="siteKey"
                    :load-recaptcha-script="true"
                    @verify="handleSuccess"
                    @error="handleError"
                ></VueRecaptcha>
                </div>
                <div class="details-btns">
                <button type="submit" class="savebtn">
                    <span class="btnGuardar">Enviar</span>
                </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { notify } from "@kyvg/vue3-notification"; /* libreria para importar alertas */
import { ref,computed } from "vue";
import { authStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { VueRecaptcha } from 'vue-recaptcha';

export default{
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
        const nombre = ref('');
        const apellidoP = ref('');
        const apellidoM = ref('');
        const city = ref('');
        const comentarios = ref('');

        return {
            handleError,
            handleSuccess,
            store,
            router,
            nombre,
            apellidoP,
            city,
            comentarios,
            siteKey
        }
    }
}
        
/*          const fieldsMap = {
                name: "Nombre",
                lasName: "Apellidos",
                email: "Correo",
                city: "Ciudad",
                comments: "Comentarios"           
            }

            function goBack(event){
                event.preventDefault();
                router.back();
            }

            */
</script>