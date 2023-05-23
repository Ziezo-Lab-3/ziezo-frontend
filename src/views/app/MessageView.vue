<script setup>
import { RouterView } from "vue-router";
import ChatList from "../../components/chat/ChatList.vue";
</script>
<template>
    <Card class="p-m-4 p-major">
        <template #title>Berichten</template>
        <template #content>
            <div class="message__wrapper">
                <ChatList @update-selection="updateSelection" />
                <RouterView />
            </div>
        </template>
    </Card>
</template>
<style scoped>
.message__wrapper {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-gap: 1rem;
    height: calc(100vh - 10.5rem);
}
</style>