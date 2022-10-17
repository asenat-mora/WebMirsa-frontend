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

//data variables
let brands = ref();
let brand = ref({});
let deleteBrandDialog = ref(false);
let createBrandDialog = ref(false);

//validation flag variables
let vName = ref(false);
let vKey = ref(false);

//errors array
let errors = ref(null);

//vmodel variables
let brandName = ref();
let key = ref();

const fieldsMap = {
    name: "Nombre",
    key: "Clave",
};

//validation functions
function checkName() {
    /* Busca que el nombre este definido */
    if (!brandName.value) {
        vName.value = true;
        errors.value.name = "El nombre de la marca es requerido";
        return;
    }
    /*quita espacios y los guarda en otra variable */
    let nameNoSpace = brandName.value.replace(/ /g, '');
    /* checa la longitud de la cadena, sin contar espacios */
    if (nameNoSpace.length < 3 || nameNoSpace.length > 20) {
        vName.value = true;
        errors.value.name = "El nombre de la marca debe tener entre 3 y 20 caracteres";
        return;
    }
    /* valida los caracteres aceptados */
    if (!/^[a-zA-Z ]+$/.test(brandName.value)) {
        errors.value.name = 'El nombre debe contener solo letras'
        vName.value = true
        /* console.log(brandName.value); */
    }

}

function createBrand() {
    createBrandDialog.value = false;
    axios.post(
        import.meta.env.VITE_API_URL + "/api/brand", {
        name: brandName.value,
        key: key.value,
    })
        .then((response) => {
            notify({
                title: "Exito",
                text: "¡Registro exitoso!",
                type: "success",
            });
            brandName.value = "";
            key.value = "";
            getAllBrands();
        })
        .catch((error) => {
            console.log(error);
            if (error.response.status === 409) {
                /* Validar duplicidad de datos */
                notify({
                    title: "Advertencia",
                    text: "¡El campo " +
                        fieldsMap[error.response.data.target] + " se encuentra duplicado!",
                    type: "warn",
                });
            } else {
                notify({
                    title: "Error",
                    text: "¡Error en el registro!",
                    type: "error",
                });
            }
        });
}

function checkKey() {
    /* Busca que la clave este definida */
    if (!key.value) {
        vKey.value = true;
        errors.value.key = "La clave es requerida";
        return;
    }
    /*quita espacios y los guarda en otra variable */
    let nameNoSpace = key.value.replace(/ /g, '');
    /* checa la longitud de la cadena, sin contar espacios */
    if (nameNoSpace.length < 1 || nameNoSpace.length > 3) {
        vKey.value = true;
        errors.value.key = "La clave de marca debe tener entre 1 y 3 caracteres";
        return;
    }
    /* valida los caracteres aceptados */
    if (!/^[a-zA-Z ]+$/.test(key.value)) {
        errors.value.key = 'La clave debe contener solo letras'
        vKey.value = true
    }
}

function validateForm() {
    errors.value = {};
    vName.value = false;
    vKey.value = false;
    checkName();
    checkKey();
    if (!vName.value && !vKey.value) {
        createBrandDialog.value = true;
    }
}

function getAllBrands(){
    axios.get(import.meta.env.VITE_API_URL + '/api/brand')
    .then(response => {
        brands.value = response.data;
        mapBrands();
    })
    .catch(error => {
        console.log(error);
    });
}

function mapBrands(){
    brands.value.forEach(brand => {
        brand.user = brand.user.name + " " + brand.user.surname;
        brand.last_modification_date = new Date(brand.last_modification_date).toLocaleString();
    });
}

function confirmDeleteBrand(brd){
    brand.value = brd;
    deleteBrandDialog.value = true;
}

function editBrand(brand) {
    router.push({ name: 'BrandEdit', params: { id: brand.id } });
}

function deleteBrand(){
    deleteBrandDialog.value = false;
    const id = brand.value.id;
    brand.value = {};

    axios.delete(import.meta.env.VITE_API_URL + '/api/brand/' + id)
    .then(response => {
        notify({title: "Exito", text: "¡Registro eliminado!", type: "success"});
        getAllBrands();
    })
    .catch(error => {
        console.log(error);
        notify({title: "Error", text: "¡Error al eliminar!", type: "error"});
    });

}

onMounted(() => {
    getAllBrands();
});

</script>

<template>

<div class="body-register-marca">
    <div class="register-container-marca">
        <header>CATALOGO DE MARCAS</header>
        <!-- Formulario de alta -->
        <form class="form-register-marca">
            <div class="form-first">
                <div class="details-marca">
                    <span class="title">ALTA DE MARCA</span>
                    <div class="fields">
                        <div class="input-field-b">
                            <label>Nombre*</label>
                            <input type="text" placeholder="Nombre de la marca" v-model="brandName" />
                            <div class="error" v-if="vName">{{ errors.name }}</div>
                        </div>
                        <div class="input-field-b">
                            <label>Clave*</label>
                            <input type="text" placeholder="Clave de la marca" v-model="key" />
                            <div class="error" v-if="vKey">{{ errors.key }}</div>
                        </div>
                    </div>
                </div>
                <div class="details-btns">
                    <button class="savebtn" type="button" @click="validateForm">
                        <span class="btnGuardar">Registrar</span>
                    </button>
                    
                </div>
                
            </div>
            <Dialog v-model:visible="createBrandDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-question-circle mr-3" style="font-size: 2rem" />
                    <span>Esta seguro de agregar <b>{{brandName}}</b>?</span>
                </div>
                <template #footer>
                    <Button label="Si" icon="pi pi-check" class="p-button-text" @click="createBrand" />
                    <Button label="No" icon="pi pi-times" class="p-button-text" @click="createBrandDialog = false" />
            
                </template>
            </Dialog>
        </form>


        
        <DataTable ref="dt" :value="brands" responsiveLayout="scroll" :paginator="true" :rows="10"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                :rowsPerPageOptions="[10,20,50]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}" filterDisplay="menu"
                dataKey="id" :globalFilterFields="['name', 'last_modification_description', 'user', 'key']" v-model:filters="filters1">

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
                <Column field="key" header="Clave"></Column>
                <Column field="last_modification_description" header="Ultimo Cambio"></Column>
                <Column field="last_modification_date" header="Fecha Ultima Modificación"></Column>
                <Column field="user" header="Usuario"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editBrand(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteBrand(slotProps.data)" />
                    </template>
                </Column>

        </DataTable>

        <Dialog v-model:visible="deleteBrandDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span >Esta seguro de querer borrar <b>{{brand.name}}</b>?</span>
            </div>
            <template #footer>
                <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteBrand" />
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteBrandDialog = false"/>
                
            </template>
        </Dialog>

        <div class="details-btns">
            <button type="button" class="cancelbtn" @click="goBack($event)">
                    <span class="btnCancelar">Volver</span>
            </button>           
        </div>

    </div>
</div>
</template>
