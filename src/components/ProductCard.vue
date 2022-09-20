<template>
    <div class="card-item">
        <div class="product-a">
            <img class="im" :src="url" alt="prueba"/>
            <template v-if="store.getIsLoggedIn">
                <div class="buttons">
                    <button class="edit" @click="goToEdit">Editar</button>
                </div>
            </template>
            <template v-else>
                <template v-if="checkIfItemIsOnList()">
                    <div class="buttons">
                        <button class="edit" @click="removeFromQuotationList()">Remover</button>
                    </div>
                </template>
                <template v-else>
                    <div class="buttons">
                        <button class="edit" @click="addToQuotationList()">Agregar</button>
                    </div>
                </template>
                
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
    import { quotationStore } from "../stores/list";

    const store = authStore();
    const router = useRouter();
    const qStore = quotationStore();

    const props = defineProps({
        sku: String,
        accessory: String,
        brand: String,
        model: String,
        description: String,
        url: String,
        id: Number
    })

    function checkIfItemIsOnList() {
        return qStore.getList.some(item => item.id === props.id);
    }

    function removeFromQuotationList() {
        qStore.removeItemFromList(props.id);
    }

    function addToQuotationList() {
        const product = {
            sku: props.sku,
            accessory: props.accessory,
            brand: props.brand,
            model: props.model,
            description: props.description,
            url: props.url,
            id: props.id
        }
        qStore.setItemOnList(product);
    }

    function goToEdit(){
        
        router.push({name: "ProductEdit", params: {id: props.id}});
    }

</script>