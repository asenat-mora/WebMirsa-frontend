<template>
    <div class="body-register-marca">
        <div class="register-container-marca">
            <header>USUARIOS</header>
            <DataTable ref="dt" :value="users" responsiveLayout="scroll" :paginator="true" :rows="10"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                :rowsPerPageOptions="[10,20,50]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}" filterDisplay="menu"
                dataKey="id" :globalFilterFields="['name', 'surname', 'email', 'roles']" v-model:filters="filters1">

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
                    No se encontraron usuarios.
                </template>
                <template #loading>
                    Cargando la información de los usuarios. Por favor espere.
                </template>

                
                <Column field="name" header="Nombre"></Column>
                <Column field="surname" header="Apellido"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="roles" header="Roles"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editUser(slotProps.data)" />
                        <!-- <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" /> -->
                    </template>
                </Column>

            </DataTable>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import { useRouter } from 'vue-router';

let users = ref();
let router = useRouter();

const columns = ref([
    { field: 'id', header: 'Id' },
    { field: 'name', header: 'Nombre' },
    { field: 'surname', header: 'Apellido' },
    { field: 'email', header: 'Email' },
    { field: 'roles', header: 'Rol' },
]);
const filters1 = ref({
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
        });
const dt = ref();

const exportCSV = () => {
            dt.value.exportCSV();
        };
    
function getAllUsers(){
    axios.get(import.meta.env.VITE_API_URL + "/api/users")
        .then(response => {
            users.value = response.data;
            mapRoles();
        }).catch(error => {
            console.log(error);
        });
}

function mapRoles(){
    users.value.forEach(user => {
        user.roles = user.roles[0].roleId == 1 ? "Administrador" : "Capturista";
    });
}

function editUser(user){
    router.push({ name: 'UserEdit', params: { id: user.id } });
}




onMounted(() => {
    getAllUsers();
});

</script>
