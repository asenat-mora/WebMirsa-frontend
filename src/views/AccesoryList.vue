<template>
    <div class="body-register-marca">
    <div class="register-container-marca">
        <header>CATALOGO DE ACCESORIOS</header>
        <!-- alta de accesorio -->
        <form class="form-register-category" @submit.prevent="validateForm">
            <div class="form-first">
                <div class="details-category">
                    <!-- <span class="title">Detalle</span> -->
                    <div class="fields">
                        <div class="input-field-b">
                            <label>Nombre del Accesorio*</label>
                            <input type="text" placeholder="Tipo de accesorio" v-model="accesoryName">
                            <div class="error" v-if="vName"> {{ errors.name }}</div>
                        </div>
                    </div>
                </div>
                <div class="details-btns">
                    <button class="savebtn" type="submit">
                        <span class="btnGuardar">Registrar</span> <!-- @click="createAccesory" -->
                    </button>
                </div>
            </div>
        </form>

       
        <DataTable ref="dt" :value="accessories" responsiveLayout="scroll" :paginator="true" :rows="10"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                :rowsPerPageOptions="[10,20,50]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}" filterDisplay="menu"
                dataKey="id" :globalFilterFields="['name', 'last_modification_description', 'user']" v-model:filters="filters1">

                <template #header>
                    <div class="flex justify-content-between">
                        <Button icon="pi pi-external-link" label="Exportar" @click="exportCSV($event)" id="table-header-element"/>
                        <!-- <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined" @click="clearFilter1()"/> -->
                        <span class="p-input-icon-left" id="table-header-element">
                            <i class="pi pi-search" />
                            <InputText v-model="filters1['global'].value" placeholder="Buscar" />
                        </span>
                    </div>
                </template>
                <template #empty>
                    No se encontraron accesorios.
                </template>
                <template #loading>
                    Cargando la información de los accesorios. Por favor espere.
                </template>

                <Column field="id" header="Id"></Column>
                <Column field="name" header="Nombre"></Column>
                <Column field="last_modification_description" header="Ultimo Cambio"></Column>
                <Column field="last_modification_date" header="Fecha Ultima Modificación"></Column>
                <Column field="user" header="Usuario"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editAccessory(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteAccessory(slotProps.data)" />
                    </template>
                </Column>



        </DataTable>

        <Dialog v-model:visible="deleteAccessoryDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span >Esta seguro de querer borrar <b>{{accessory.name}}</b>?</span>
            </div>
            <template #footer>
                <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteAccessory" />
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteAccessoryDialog = false"/>
                
            </template>
        </Dialog>
        <!-- boton de volver -->
        <div class="details-btns">
            <button type="button" class="cancelbtn" @click="goBack($event)">
                <span class="btnCancelar">Volver</span>
            </button>
                    
        </div>
    </div>
</div>

</template>

<script setup>

import axios from 'axios';
import { ref, onMounted } from 'vue';
import {FilterMatchMode} from 'primevue/api';
import { useRouter } from 'vue-router';
import { notify } from "@kyvg/vue3-notification";


const filters1 = ref({ 'global': { value: null, matchMode: FilterMatchMode.CONTAINS } });
const router = useRouter();
const dt = ref();

const exportCSV = () => {
    dt.value.exportCSV();
};

let accessories = ref();
let accessory = ref({});
let deleteAccessoryDialog = ref(false);

function editAccessory(product) {
    router.push({ name: 'AccesoryEdit', params: { id: product.id } });
}

function mapAccessories(){
    accessories.value.forEach(accessory => {
        accessory.user = accessory.user.name + " " + accessory.user.surname;
        accessory.last_modification_date = new Date(accessory.last_modification_date).toLocaleString();
    });
}

function getAllAccessories(){
    axios.get(import.meta.env.VITE_API_URL + '/api/accessory')
    .then(response => {
        accessories.value = response.data;
        mapAccessories();
    })
    .catch(error => {
        console.log(error);
    });
}

function confirmDeleteAccessory(acc){
    accessory.value = acc;
    deleteAccessoryDialog.value = true;
}

function deleteAccessory(){
    deleteAccessoryDialog.value = false;
    const id = accessory.value.id;
    accessory.value = {};

    axios.delete(import.meta.env.VITE_API_URL + '/api/accessory/' + id)
    .then(response => {
        notify({title: "Exito", text: "¡Registro eliminado!", type: "success"});
        getAllAccessories();
    })
    .catch(error => {
        console.log(error);
        notify({title: "Error", text: "¡Error al eliminar!", type: "error"});
    });
}

onMounted(() => {
    getAllAccessories();
});


</script>