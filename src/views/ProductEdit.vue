<script setup>
    import ProductForm from "@/components/ProductForm.vue";
    import { ref, onBeforeMount } from "vue";
    import { useRoute } from "vue-router";
    import axios from "axios";

    const brands = ref(null);
    const colors = ref(null);
    const accessories = ref(null);
    const colorsMapped = ref([]);
    const productColors = ref([]);
    const product = ref({});
    const route = useRoute();

    function getProductById(){
        axios.get(import.meta.env.VITE_API_URL + '/api/product/' + route.params.id)
            .then(response => {
                product.value = response.data;
                mapColorsItem(product.value.productcolor, productColors);
            })
            .catch(error => {
                console.log(error);
                alert("¡Producto no encontrado, favor de intentarlo nuevamente!");
            });
    }

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
                mapColors(colors.value, colorsMapped);
            }).catch(error => {
                console.log(error);
            });
    }

    function mapColors(colors, resultingColors) {
        colors.forEach(color => {
            resultingColors.value.push({
                value: color.id,
                label: color.name
            });
        });
    }

    function mapColorsItem(colors, resultingColors){
        colors.forEach(object => {
            resultingColors.value.push(object.color.id);
        });
    }

    onBeforeMount(() => {
        getProductById();
        getAllBrands();
        getAllColors();
        getAllAccessories();
    })

</script>

<template>
    <ProductForm 
                :brands="brands" 
                :colors="colorsMapped" 
                :accessories="accessories" 
                :productId="product.id"
                mode="Update"
                :productColors="productColors" 
                :productDescription="product.description"
                :productSKU="product.sku" 
                :productPrice="product.price"
                :productModel="product.model" 
                :productBrand="product.brandId"
                :productAccessory="product.accessoryId"
                :productSide="product.side"
                :productImage="product.image" 
                />
</template>
