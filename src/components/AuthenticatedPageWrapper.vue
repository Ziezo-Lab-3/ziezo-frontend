<script setup>
import { ref, onMounted } from 'vue';
import { RouterView, useRouter, onBeforeRouteUpdate } from 'vue-router';
import Navigation from './Navigation.vue';
import Sidebar from 'primevue/sidebar';
import verifyToken from '../js/verifyToken';

const router = useRouter();
const menuOpen = ref(false);
const content = ref(null);
const touch = ref(false);

const contentScroll = ref(0);

onMounted(() => {
    if (!verifyToken()) {
        router.push('/login');
        return;
    }
    content.value.addEventListener("touchstart", (e) => {
        touch.value = true;
        // check if #menu_toggle is clicked
        if (e.target.id === 'menu_toggle' || e.target.closest('#menu_toggle')) {
            return;
        }

        // if touchevent is active for more than 300ms, hide the menu
        setTimeout(() => {
            // check for updates to the touch event

            if (touch.value) {
                document.getElementById('menu_toggle').classList.add('menu_toggle--hidden');
            }
        }, 300);
    }, false);

    content.value.addEventListener("touchend", (e) => {
        touch.value = false;

        // check if #menu_toggle is clicked
        if (e.target.id === 'menu_toggle' || e.target.closest('#menu_toggle')) {
            return;
        }
        document.getElementById('menu_toggle').classList.remove('menu_toggle--hidden');
    }, false);
});

onBeforeRouteUpdate((to, from, next) => {
    const menuToggle = document.getElementById('menu_toggle');
    if (to.matched.some(record => record.meta.menuRight)) {
        menuToggle.classList.add('menu_toggle--right');
    }
    else {
        menuToggle.classList.remove('menu_toggle--right');
    }
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
                <div class="nav-logo">
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