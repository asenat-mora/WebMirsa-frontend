<script setup>
    import ProductForm from "@/components/ProductForm.vue";
    import { ref, onBeforeMount } from "vue";
    import axios from "axios";

    const brands = ref(null);
    const colors = ref(null);
    const accessories = ref(null);
    const colorsMapped = ref([]);
    const productColors = ref([]);


    function getAllBrands() {
        axios.get(import.meta.env.VITE_API_URL + '/api/brand')
            .then(response => {
                brands.value = response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }

    function getAllAccessories() {
        axios.get(import.meta.env.VITE_API_URL + '/api/accessory')
            .then(response => {
                accessories.value = response.data;
            }).catch(error => {
                console.log(error);
            });
    }

    function getAllColors() {
        axios.get(import.meta.env.VITE_API_URL + '/api/color')
            .then(response => {
                colors.value = response.data;
                mapColors(colors);
            }).catch(error => {
                console.log(error);
            });
    }

    function mapColors(colors) {
        colors.value.forEach(color => {
            colorsMapped.value.push({
                value: color.id,
                label: color.name
            });
        });
    }


    onBeforeMount(() => {
        getAllBrands();
        getAllColors();
        getAllAccessories();
    })


</script>

<template>
    <ProductForm :brands="brands" :colors="colorsMapped" :accessories="accessories" mode="Create" :productColors="productColors"/>
</template>