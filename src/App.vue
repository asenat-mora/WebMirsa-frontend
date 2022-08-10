<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { authStore } from "@/stores/auth";


const store = authStore();
</script>

<template>

    
    <Navbar />
    
    <router-view :key ="$route.path"/>
    <notifications position="bottom left"/>
    <Footer v-if="!store.getIsLoggedIn" />
    
    
</template>

<style>
</style>
