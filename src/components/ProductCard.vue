<template>
    <div class="card-item">
        <div class="product-a">
            <img class="im" :src="url" alt="prueba"/>
            <template v-if="store.getIsLoggedIn">
                <div class="buttons">
                    <button class="edit" @click="goToEdit">Editar</button>
                </div>
            </template>
            
        </div>
        <div class="info">
            <span class="sku">{{sku}}</span>
            <span class="name">{{accessory}}</span>
            <span class="brand">{{brand}}</span>
            <span class="model">{{model}}</span>
            <span class="description">{{description}}</span>
            
        </div>
    </div>

</template>

<script setup>
    import { authStore } from "../stores/auth";
    import { useRouter } from "vue-router";

    const store = authStore();
    const router = useRouter();

    const props = defineProps({
        sku: String,
        accessory: String,
        brand: String,
        model: String,
        description: String,
        url: String,
        id: Number
    })

    function goToEdit(){
        
        router.push({name: "productEdit", params: {id: props.id}});
    }

</script>