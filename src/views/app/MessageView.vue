<script setup>
import { onMounted, watch } from "vue";
import { RouterView, useRouter } from "vue-router";
import ChatList from "../../components/chat/ChatList.vue";

const router = useRouter();

const handleVisibleElements = () => {
    const chatContainer = document.querySelector(".message__chat-container");
    const chatGroupContainer = document.querySelector(".message__chat-group-container");
    if (router.currentRoute.value.params.id !== undefined) {
        console.log("id is defined");
        chatContainer.classList.remove("tablet-hide");
        chatGroupContainer.classList.add("tablet-hide");
    }
    else {
        console.log("id is undefined");
        chatContainer.classList.add("tablet-hide");
        chatGroupContainer.classList.remove("tablet-hide");
    }
}

onMounted(() => handleVisibleElements());
watch(() => router.currentRoute.value.params.id, () => handleVisibleElements());
</script>
<template>
    <Card class="p-m-4 p-major">
        <template #title>Berichten</template>
        <template #content>
            <div class="message__wrapper">
                <div class="message__chat-group-container">
                    <ChatList @update-selection="updateSelection" />
                </div>
                <div class="message__chat-container">
                    <RouterView />
                </div>
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

.message__chat-container {
    display: grid;
    grid-template-columns: 1fr;
    height: calc(100vh - 10.5rem);
}

@media screen and (max-width: 1210px) {
    .message__wrapper {
        grid-template-columns: 180px 1fr;
    }
}

@media screen and (max-width: 768px) {
    .message__wrapper {
        grid-template-columns: 1fr;
    }
}
</style>