<template>
    <div class="body-register-marca">
    <div class="register-container-marca">
        <header>COLORES</header>
            <DataTable ref="dt" :value="colors" responsiveLayout="scroll" :paginator="true" :rows="10"
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
                        No se encontraron colores.
                    </template>
                    <template #loading>
                        Cargando la información de los colores. Por favor espere.
                    </template>

                    <Column field="id" header="Id"></Column>
                    <Column field="name" header="Nombre"></Column>
                    <Column field="last_modification_description" header="Ultimo Cambio"></Column>
                    <Column field="last_modification_date" header="Fecha Ultima Modificación"></Column>
                    <Column field="user" header="Usuario"></Column>
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editColor(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteColor(slotProps.data)" />
                        </template>
                    </Column>

            </DataTable>

            <Dialog v-model:visible="deleteColorDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span >Esta seguro de querer borrar <b>{{color.name}}</b>?</span>
            </div>
            <template #footer>
                <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteColor" />
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteColorDialog = false"/>
                
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

let colors = ref();
let color = ref({});
let deleteColorDialog = ref(false);

function getAllColors() {
    axios.get(import.meta.env.VITE_API_URL + '/api/color')
        .then(response => {
            colors.value = response.data;
            mapColors();
        })
        .catch(error => {
            console.log(error);
        });
}

function mapColors(){
    colors.value.forEach(color => {
        color.user = color.user.name + " " + color.user.surname;
        color.last_modification_date = new Date(color.last_modification_date).toLocaleString();
    });
}

function confirmDeleteColor(clr){
    color.value = clr;
    deleteColorDialog.value = true;
}

function editColor(color) {
    router.push({ name: 'ColorEdit', params: { id: color.id } });
}

function deleteColor() {
    deleteColorDialog.value = false;
    const id = color.value.id;
    color.value = {};

    axios.delete(import.meta.env.VITE_API_URL + '/api/color/' + id)
        .then(response => {
            notify({
                title: "Color eliminado",
                text: "El color ha sido eliminado correctamente.",
                type: "success",
                duration: 5000,
            });
            getAllColors();
        })
        .catch(error => {
            notify({title: "Error", text: "¡Error al eliminar!", type: "error"});
            console.log(error);
        });
}

onMounted(() => {
    getAllColors();
});

</script>