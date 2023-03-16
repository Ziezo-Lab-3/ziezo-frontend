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

<style>
#app {
    display: grid;
    grid-template-columns: 220px 1fr;
}
#content {
    padding: 1rem 3rem;
    height: calc(100vh);
    overflow-y: auto;
    background-color: var(--background);
    border-radius: 2rem 0 0 2rem;
}
</style>