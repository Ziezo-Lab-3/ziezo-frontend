<script setup>
import { ref, onMounted } from 'vue';
import { RouterView, useRouter, onBeforeRouteUpdate } from 'vue-router';
import Navigation from './Navigation.vue';
import Sidebar from 'primevue/sidebar';
import verifyToken from '../js/verifyToken';

const router = useRouter();
const menuOpen = ref(false);
const content = ref(null);

const contentScroll = ref(0);

onMounted(() => {
    if (!verifyToken()) {
        router.push('/login');
        return;
    }
    content.value.addEventListener('scroll', () => {
        const newScroll = content.value.scrollTop;
        if (newScroll > contentScroll.value) {
            document.getElementById('menu_toggle').classList.add('hidden');
        } else {
            document.getElementById('menu_toggle').classList.remove('hidden');
        }
        contentScroll.value = newScroll;
    })
});

onBeforeRouteUpdate((to, from, next) => {
    if (!verifyToken()) {
        router.push('/login');
        return;
    }
    next();
});
</script>
<template>
    <div id="nav_sidebar">
        <Navigation></Navigation>
    </div>
    <div id="content" ref="content">
        <RouterView></RouterView>
    </div>
    <div id="nav_mobile">
        <Sidebar v-model:visible="menuOpen" position="bottom" class="p-sidebar-md">
            <template #header>
                <div class="nav-logo" >
                    <img src="/images/Logo.svg" alt="Ziezo Logo">
                </div>
            </template>
            <Navigation></Navigation>
        </Sidebar>
        <div id="menu_toggle" @click="() => menuOpen = !menuOpen"><i class="pi pi-bars" style="font-size: 1.5rem"></i></div>
    </div>
</template>
<style scoped>
.nav-logo {
    width: calc(100vw - 4rem);
    display: flex;
    justify-content: center;
    padding-left: 2rem;
}
</style>