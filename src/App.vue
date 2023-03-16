<script setup>
import { RouterView } from 'vue-router';
import Navigation from './components/Navigation.vue';
</script>

<template>
    <Navigation></Navigation>
    <div id="content">
        <RouterView></RouterView>
    </div>
</template>

<style scoped>
</style>