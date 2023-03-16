<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import Navigation from './components/Navigation.vue';
import Sidebar from 'primevue/sidebar';

const menuOpen = ref(false);
const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
    console.log(menuOpen.value);
}
</script>

<template>
    <div id="nav_sidebar">
        <Navigation></Navigation>
    </div>
    <div id="content">
        <RouterView></RouterView>
    </div>
    <div id="nav_mobile">
        <Sidebar v-model:visible="menuOpen" position="bottom" class="p-sidebar-md">
            <Navigation></Navigation>
        </Sidebar>
        <div id="menu_toggle" @click="() => menuOpen = !menuOpen"><i class="pi pi-bars" style="font-size: 2rem"></i></div>
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
    grid-column: 2;
}

#nav_mobile {
    display: none;
}

#menu_toggle {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 100;
    cursor: pointer;
    background-color: var(--primary);
    border-radius: 50%;
    padding: 1rem;
    color: white;
}

@media (max-width: 768px) {
    #app {
        grid-template-columns: 1fr;
    }

    #content {
        border-radius: 0;
        grid-column: 1;
    }

    #nav_sidebar {
        display: none;
    }

    #nav_mobile {
        display: inherit;
    }
}</style>