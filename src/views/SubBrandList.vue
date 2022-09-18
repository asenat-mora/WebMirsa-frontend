<template>
    <div class="body-register-marca">
        <div class="register-container-marca">
            <header>LISTA DE SUBMARCAS</header>
            <DataTable ref="dt" :value="subBrands" responsiveLayout="scroll" :paginator="true" :rows="10"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                :rowsPerPageOptions="[10,20,50]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}" filterDisplay="menu"
                dataKey="id" :globalFilterFields="['name', 'last_modification_description', 'user', 'brand']" v-model:filters="filters1">

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
                    No se encontraron marcas.
                </template>
                <template #loading>
                    Cargando la información de las marcas. Por favor espere.
                </template>

                <Column field="id" header="Id"></Column>
                <Column field="name" header="Nombre"></Column>
                <Column field="brand" header="Marca"></Column>
                <Column field="last_modification_description" header="Ultimo Cambio"></Column>
                <Column field="last_modification_date" header="Fecha Ultima Modificación"></Column>
                <Column field="user" header="Usuario"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <!-- <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editSubBrand(slotProps.data)" /> -->
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteSubBrand(slotProps.data)" />
                    </template>
                </Column>

            </DataTable>

            <Dialog v-model:visible="deleteSubBrandDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span >Esta seguro de querer borrar <b>{{subBrand.name}}</b>?</span>
                </div>
                <template #footer>
                    <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSubBrand" />
                    <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteSubBrandDialog = false"/>
                    
                </template>
            </Dialog>
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

let subBrands = ref();
let subBrand = ref({});
let deleteSubBrandDialog = ref(false);


function getAllSubBrands(){
    axios.get(import.meta.env.VITE_API_URL + '/api/sub-brand')
    .then(response => {
        subBrands.value = response.data;
        mapSubBrands();
    })
    .catch(error => {
        console.log(error);
    });
}

function mapSubBrands(){
    subBrands.value.forEach(subBrand => {
        subBrand.user = subBrand.user.name + " " + subBrand.user.surname;
        subBrand.last_modification_date = new Date(subBrand.last_modification_date).toLocaleString();
        subBrand.brand = subBrand.brand.name;
    });
}

function confirmDeleteSubBrand(sbr){
    subBrand.value = sbr;
    deleteSubBrandDialog.value = true;
}

function deleteSubBrand(){
    deleteSubBrandDialog.value = false;
    const id = subBrand.value.id;
    subBrand.value = {};

    axios.delete(import.meta.env.VITE_API_URL + '/api/sub-brand/' + id)
    .then(response => {
        notify({
            title: "Exito",
            text: "La submarca ha sido eliminado correctamente.",
            type: "success",
            duration: 3000,
        });
        getAllSubBrands();
    })
    .catch(error => {
        notify({
            title: "Error",
            text: "Ha ocurrido un error al eliminar la submarca.",
            type: "error",
            duration: 3000,
        });
        console.log(error);
    });
}

onMounted(() => {
    getAllSubBrands();
});


</script>