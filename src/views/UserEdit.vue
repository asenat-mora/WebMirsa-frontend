<template>
    <SignUpUser mode="Update" :id="parseInt(route.params.id)" :name="user.name" :surname="user.surname" :email="user.email"
        :verificationEmail="user.verificationEmail" :userRol="user.roles" />
</template>

<script setup>
    import { useRoute } from 'vue-router';
    import SignUpUser from '../components/SignUpUser.vue';
    import { onBeforeMount } from 'vue';
    import axios from 'axios';
    import { ref } from 'vue';
    
    const route = useRoute();
    const user = ref({});


    function getUserById(){
        axios.get(import.meta.env.VITE_API_URL + '/api/users/' + route.params.id)
            .then(response => {
                user.value = response.data;
                user.value.roles = user.value.roles[0].roleId;
            }).catch(error => {
                console.log(error);
                
            });
    }

    onBeforeMount(() => {
        getUserById();
    });

</script>