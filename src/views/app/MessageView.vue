<script setup>
import Chat from "../../components/chat/Chat.vue";
import ChatList from "../../components/chat/ChatList.vue";
</script>
<template>
    <Card class="p-m-4 p-major">
        <template #title>Berichten</template>
        <template #content>
            <ChatList />
        </template>
    </Card>
</template>