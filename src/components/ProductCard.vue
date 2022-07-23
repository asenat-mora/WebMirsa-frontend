<template>
    <div class="card-item">
        <div class="product-a">
            <img class="im" :src="url" alt="prueba"/>
        </div>
        <div class="info">
            <span class="pku">{{sku}}</span>
            <span class="name">{{accessory}}</span>
            <span class="brand">{{brand}}</span>
            <span class="model">{{model}}</span>
            <span class="description">{{description}}</span>
            
        </div>
    </div>

</template>

<script setup>

    defineProps ({
        sku: String,
        accessory: String,
        brand: String,
        model: String,
        description: String,
        url: String
    })



</script>