<script setup>
//import router view
import { useRouter, useRoute } from 'vue-router'
//import navigation component
import Navigation from './components/Navigation.vue'
</script>

<template>
    <Navigation></Navigation>
    <RouterView></RouterView>
</template>

<style scoped>
</style>