<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue'
</script>

<template>
    <router-view :key ="$route.path"/>
</template>

<style>
body {
  margin: 0;
}
</style>
