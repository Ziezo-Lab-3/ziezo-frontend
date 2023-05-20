<script setup>
import { reactive, onMounted, watch } from 'vue';
import decodeJWT from '../../js/decodeJWT';
import Message from './Message.vue';

const props = defineProps({
    /**
     * The chat group to display the messages from
     * @type {{
            _id: String,
            name: String,
            members: Array,
            avatar: String | null,
            lastMessage: String | null,
            unreadMessages: Number | null,
            createdAt: String,
            updatedAt: String | null,
        }}
     */
    chatGroup: {
        type: Object,
        required: true,
    },
});

const state = reactive({
    decodedJWT: null,
    messages: [],
    users: [],
    initialized: false,
    isLoadingData: false,
    message: "",
});

const getMessageFormat = (message) => {
    // If the message is null, return null
    const index = state.messages.findIndex((value) => value.id === message.id);
    if (message === null) return;
    const previous = state.messages[index - 1];
    const next = state.messages[index + 1];

    // Check if the message is the first or last message from the sender
    const isTop = !previous || (previous && previous.sender !== message.sender);
    const isBottom = next && next.sender !== message.sender;

    // If the message is the first or last message in the list, return the correct format
    if (isTop && isBottom) return "single";
    if (isTop) return "top";
    if (isBottom) return "bottom";
    return "middle";
}

// Handle scroll behavior of chat__messages
const scrollChat = () => {
    const chatMessages = document.querySelector(".chat__messages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
onMounted(() => {
    state.decodedJWT = decodeJWT(localStorage.getItem("token"));
    state.messages = [
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
            createdAt: "2021-10-01T12:02:00.000Z",
        },
        {
            id: 3,
            message: "Bruh 1",
            sender: "aaaaaaaaaaaaaaaaaaaaaaaa",
            chatGroup: "aaaaaaaaaaaaaaaaaaaaaaaa",
            createdAt: "2021-10-01T13:05:00.000Z",
        },
        {
            id: 4,
            message: "Bruh 2",
            sender: "aaaaaaaaaaaaaaaaaaaaaaaa",
            chatGroup: "aaaaaaaaaaaaaaaaaaaaaaaa",
            createdAt: "2021-10-01T13:05:30.000Z",
        },
        {
            id: 5,
            message: "Bruh 3",
            sender: "aaaaaaaaaaaaaaaaaaaaaaaa",
            chatGroup: "aaaaaaaaaaaaaaaaaaaaaaaa",
            createdAt: "2021-10-01T13:05:40.000Z",
        },
        {
            id: 6,
            message: "Ik heb best wat ervaring in het klussen. Ik kan je helpen met het ophangen van een schilderij, het in elkaar zetten van een kast of het vervangen van een lamp. Ik heb een auto dus ik kan ook helpen met verhuizen.",
            sender: "aaaaaaaaaaaaaaaaaaaaaaaa",
            chatGroup: "aaaaaaaaaaaaaaaaaaaaaaaa",
            createdAt: "2021-10-03T12:00:00.000Z",
        },
        {
            id: 7,
            message: "Cool",
            sender: "64009e396dd8fec7e85aa8b4",
            chatGroup: "aaaaaaaaaaaaaaaaaaaaaaaa",
            createdAt: "2021-10-03T14:00:00.000Z",
        },
    ];
    state.users = [
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
    ];
    state.initialized = true;
});

watch(() => state.messages, () => {
    setTimeout(() => {
        scrollChat();
    }, 500);
});

</script>
<template>
<div class="chat__wrapper">
    <div class="chat__header"><h2>{{ props.chatGroup ? props.chatGroup.name : "Chat" }}</h2></div>
    <div class="chat__messages">
        <div v-if="!state.initialized">
            Loading...
        </div>
        <div v-else-if="state.messages.length === 0">
            <p class="chat__empty-message">Stuur {{ state.users.length === 2 ? state.users.find(value => value.id !== state.decodedJWT.id).name + " " : ""}} een bericht en start de conversatie!</p>
        </div>
                <Message v-for="message in state.messages" :key="message.id"
                    :avatar="state.users.find(value => value.id === message.sender).avatar"
                    :text="message.message" 
                    :self="message.sender === state.decodedJWT.id" 
                    :date="message.createdAt"
                    :name="state.users.find(value => value.id === message.sender).name"
                    :format="getMessageFormat(message)"
                />
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
    max-height: 100%;
    min-height: 100%;
}
.chat__input {
    display: grid;
    height: 3rem;
    grid-template-columns: 1fr auto;
    grid-gap: .5rem;
    padding: .25rem;
}

.chat__empty-message {
    text-align: center;
    margin: 0;
    padding: 1rem;
    color: var(--secondary);
}

.chat__messages {
    overflow-y: auto;
    padding: 1rem 0;
}
</style>