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
                <OrderList v-model="qStore.getList" listStyle="height:auto" dataKey="id">
                    <template #header>
                        Lista de productos
                    </template>
                    <template #item="slotProps">
                        <div class="product-item">
                            <div class="image-container">
                                <img :src="slotProps.item.url" />
                            </div>
                            <div class="product-list-detail">
                                <h6 class="mb-2">{{slotProps.item.description}}</h6>
                                <h6 class="mb-2">{{slotProps.item.brand}}</h6>
                                <h6 class="mb-2">{{slotProps.item.sku}}</h6>
                            
                            </div>
                            <div class="product-list-action">
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="qStore.removeItemFromList(slotProps.item.id)"></Button>
                            </div>
                        </div>
                    </template>
                </OrderList>



            </div>
        </div>

        <div class="section-c">
            <div class="details">
                <p>
                    No se garantiza la disponibilidad de productos
                </p>
                <!--recaptcha -->
                <div class="recvue">
                    <VueRecaptcha :sitekey="siteKey" :load-recaptcha-script="true" @verify="handleSuccess"
                        @error="handleError"></VueRecaptcha>
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

<script setup>
import { notify } from "@kyvg/vue3-notification"; /* libreria para importar alertas */
import { ref, computed } from "vue";
import { authStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { VueRecaptcha } from 'vue-recaptcha';
import { quotationStore } from "@/stores/list";

const qStore = quotationStore();




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
const aStore = authStore();
const router = useRouter();
const nombre = ref('');
const apellidoP = ref('');
const apellidoM = ref('');
const city = ref('');
const comentarios = ref('');

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