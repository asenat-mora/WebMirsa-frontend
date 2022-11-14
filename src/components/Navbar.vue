<template>

    <Menubar :model="items">
        <template #start>
			<img alt="logo" src="../assets/img/logo.png" id="logoMenu" height="40" margin="400px" class="mr-2">
		</template>
    </Menubar>

</template>


<script setup>
import { reactive } from "vue";
import { authStore } from "../stores/auth";

const store = authStore();

const items = reactive([
    {
        label: "Inicio",
        icon: "pi pi-fw pi-home",
        to: "/"
    },
    {
        label: "Filosofia",
        icon: "pi pi-fw pi-book",
        to: "/Philosophy",
        visible:() => !store.getIsLoggedIn,
    },
    {
        label: "Historia",
        icon: "pi pi-fw pi-calendar",
        to: "/History",
        visible:() => !store.getIsLoggedIn,
    },
    {
        label: "Productos",
        icon: "pi pi-fw pi-shopping-cart",
        to: "/productSearch",
        visible:() => !store.getIsLoggedIn,
    },
    {
        label: "Cotizacion",
        icon: "pi pi-fw pi-dollar",
        to: "/Cotizacion",
        visible:() => !store.getIsLoggedIn,
    },
    {
        label: "Acceso",
        icon: "pi pi-fw pi-user",
        to: "/Login",
        visible:() => !store.getIsLoggedIn,
    },
    {
        label:"Catalogo",
        icon: "pi pi-fw pi-file",
        visible:() => store.getIsLoggedIn,
        items: [
            {
                label: "Marcas",
                icon: "pi pi-fw pi-tag",
                items:[
                    {
                        label: "Detalle",
                        icon: "pi pi-fw pi-list",
                        to: "/BrandList",
                    }
                ]
            },
            {
                label: "SubMarcas",
                icon: "pi pi-fw pi-tags",
                items:[
                    {
                        label: "Detalle",
                        icon: "pi pi-fw pi-list",
                        to: "/SubBrandList",
                    }
                ]
            },
            {
                label: "Accesorios",
                icon: "pi pi-fw pi-car",
                items:[
                    {
                        label: "Detalle",
                        icon: "pi pi-fw pi-list",
                        to: "/AccesoryList",
                    }
                ]
            },
            {
                label: "Productos",
                icon: "pi pi-fw pi-book",
                items:[
                    {
                        label: "Nuevo",
                        icon: "pi pi-fw pi-plus",
                        to: "/AddProduct",
                    },
                    {
                        label: "Detalle",
                        icon: "pi pi-fw pi-list",
                        to: "/productSearch",
                    }
                ]
            },
            {
                label: "Colores",
                icon: "pi pi-fw pi-palette",
                items:[
                    {
                        label: "Detalle",
                        icon: "pi pi-fw pi-list",
                        to: "/ColorList",
                    }
                ]

            }
        ]
    },
    {
        label: "Usuarios",
        icon: "pi pi-fw pi-users",
        visible:() => store.getIsAdmin,
        items: [
            {
                label: "Nuevo",
                icon: "pi pi-fw pi-plus",
                to: "/AddUser",
            },
            {
                label: "Detalle",
                icon: "pi pi-fw pi-list",
                to: "/UserList",
            }
        ]
    },
    {
        label: "Cerrar sesión",
        icon: "pi pi-fw pi-sign-out",
        to: "/",
        visible:() => store.getIsLoggedIn,
        command: () => {
            store.logout();
        }
    }
    
]);


</script>