<script setup>
import { reactive, onMounted } from 'vue';

const state = reactive({
    messages: [
        {
            id: 1,
            message: "Hallo",
            sender: "aaaaaaaaaaaaaaaaaaaaaaaa",
            chatGroup: "aaaaaaaaaaaaaaaaaaaaaaaa",
            createdAt: "2021-10-01T12:00:00.000Z",
        },
        {
            id: 2,
            message: "Hey",
            sender: "64009e396dd8fec7e85aa8b4",
            chatGroup: "aaaaaaaaaaaaaaaaaaaaaaaa",
            createdAt: "2021-10-01T12:00:00.000Z",
        },
        {
            id: 3,
            message: "Bruh 1",
            sender: "aaaaaaaaaaaaaaaaaaaaaaaa",
            chatGroup: "aaaaaaaaaaaaaaaaaaaaaaaa",
            createdAt: "2021-10-01T12:00:00.000Z",
        },
        {
            id: 4,
            message: "Bruh 2",
            sender: "aaaaaaaaaaaaaaaaaaaaaaaa",
            chatGroup: "aaaaaaaaaaaaaaaaaaaaaaaa",
            createdAt: "2021-10-01T12:00:00.000Z",
        },
        {
            id: 5,
            message: "Bruh 3",
            sender: "aaaaaaaaaaaaaaaaaaaaaaaa",
            chatGroup: "aaaaaaaaaaaaaaaaaaaaaaaa",
            createdAt: "2021-10-01T12:00:00.000Z",
        },
        {
            id: 6,
            message: "Ik heb best wat ervaring in het klussen. Ik kan je helpen met het ophangen van een schilderij, het in elkaar zetten van een kast of het vervangen van een lamp. Ik heb een auto dus ik kan ook helpen met verhuizen.",
            sender: "aaaaaaaaaaaaaaaaaaaaaaaa",
            chatGroup: "aaaaaaaaaaaaaaaaaaaaaaaa",
            createdAt: "2021-10-01T12:00:00.000Z",
        },
        {
            id: 7,
            message: "Cool",
            sender: "64009e396dd8fec7e85aa8b4",
            chatGroup: "aaaaaaaaaaaaaaaaaaaaaaaa",
            createdAt: "2021-10-01T12:00:00.000Z",
        },
    ],
    users: [
        {
            id: "aaaaaaaaaaaaaaaaaaaaaaaa",
            name: "Kaitlyn Ullrich",
            avatar: "https://randomuser.me/api/portraits/women/51.jpg"
        },
        {
            id: "64009e396dd8fec7e85aa8b4",
            name: "Test User",
            avatar: "https://randomuser.me/api/portraits/men/18.jpg"
        }
    ],
    initialized: false,
    isLoadingData: false,
    message: "",
});

</script>
<template>
<div class="chat__wrapper">
    <div class="chat__header"></div>
    <div class="chat__messages">
        <div v-if="!state.initialized">
            Loading...
        </div>
        <div v-else-if="state.messages.length === 0">
            <p>Geen berichten</p>
        </div>
        <div v-else>
            <div v-for="message in state.messages" :key="message.id" class="chat__message">
                
            </div>
        </div>
    </div>
    <div class="chat__input">
        <InputText v-model="state.message" placeholder="Aa" />
        <Button icon="pi pi-send" aria-label="Send" />
    </div>
</div>
</template>
<style scoped>
.chat__wrapper {
    display: grid;
    grid-template-rows: auto 1fr auto;
}
.chat__input {
    display: grid;
    height: 3rem;
    grid-template-columns: 1fr auto;
    grid-gap: .5rem;
    padding: .25rem;
}
</style>