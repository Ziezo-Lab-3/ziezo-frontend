<script setup>
import { reactive, onMounted, watch } from 'vue';
import VirtualScroller from 'primevue/virtualscroller';
import decodeJWT from '../../js/decodeJWT';
import Message from './Message.vue';
import { getMessages, postMessage } from '../../api/message';

const props = defineProps({
    chatGroup: {
        type: Object,
        required: true,
    },
});
/**
  * The chat group to display the messages from
  * @type {{
  * decodedJWT: { id: String, iat: Number, exp: Number } | null,
  * messages: Array,
  * chatGroup: { _id: String, name: String, members: Array, avatar: String | null, lastMessage: String | null, unreadMessages: Number | null, createdAt: String, updatedAt: String | null, } | null,
  * initialized: Boolean,
  * isLoadingData: Boolean,
  * message: String,
  * }}
*/
const state = reactive({
    decodedJWT: null,
    messages: [],
    chatGroup: null,
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

const onLazyLoad = async () => {
    !state.isLoadingData && (state.isLoadingData = true);
    const messages = await getMessages(localStorage.getItem("token"), {
        first: state.messages.length,
        last: state.messages.length + 10,
        filter: {
            chatGroup: state.chatGroup?._id
        }
    });
}

// Handle scroll behavior of chat__messages
const scrollChat = () => {
    const chatMessages = document.querySelector(".chat__messages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

onMounted(() => {
    state.decodedJWT = decodeJWT(localStorage.getItem("token"));
    state.initialized = true;
});

watch(() => state.messages, () => {
    setTimeout(() => {
        scrollChat();
    }, 500);
});

watch(() => props.chatGroup, async () => {
    state.messages = [];
    state.chatGroup = props.chatGroup;
    scrollChat();
});

</script>
<template>
<div class="chat__wrapper">
    <div class="chat__header"><h2>{{ props.chatGroup ? props.chatGroup.name : "Chat" }}</h2></div>
    <div class="chat__messages">
        <div v-if="!state.initialized">
            Loading...
        </div>
        <VirtualScroller v-else
            :items="state.messages"
            :itemSize="50"
            :scrollHeight="500"
            showLoader
            :delay="250"
            :loading="state.isLoadingData"
            lazy
            @lazy-load="onLazyLoad">
            <template #item="{ message }">
                <Message :text="message.message" 
                    :avatar="state.chatGroup.members.find(value => value.id === message.sender).avatar"
                    :self="message.sender === state.decodedJWT.id" 
                    :date="message.createdAt"
                    :name="state.chatGroup.members.find(value => value.id === message.sender).name"
                    :format="getMessageFormat(message)"
                />
            </template>
        </VirtualScroller>
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