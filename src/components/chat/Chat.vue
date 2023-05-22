<script setup>
import { reactive, onMounted, watch,ref } from 'vue';
import decodeJWT from '../../js/decodeJWT';
import { getMessages, postMessage } from '../../api/message';
import ChatScroller from './ChatScroller.vue';

const props = defineProps({
    chatGroup: {
        type: Object,
        required: true,
    },
});
/**
  * @type {{
  * decodedJWT: { id: String, iat: Number, exp: Number } | null,
  * messages: Array,
  * chatGroup: { _id: String, name: String, members: Array, avatar: String | null, lastMessage: String | null, unreadMessages: Number | null, createdAt: String, updatedAt: String | null, } | null,
  * message: String,
  * }}
*/
const state = reactive({
    decodedJWT: null,
    messages: [],
    chatGroup: null,
    message: "",
});

const sendMessage = async () => {
    if (state.message.trim() === "") return;
    if (state.chatGroup === null) return;
    const result = await postMessage(localStorage.getItem("token"), {
        message: state.message,
        sender: state.decodedJWT.id,
        chatGroup: state.chatGroup._id,
    });
    if (result.status === "success") {
        state.messages.push(result.data);
        state.message = "";
    }
    else {
        console.error("Chat.vue sendMessage(): " + result.message);
    }
}

const sanitize = (messages) => {
    // make sure each _id property only occurs once
    const ids = [];
    return messages.filter((message) => {
        if (ids.includes(message._id)) return false;
        ids.push(message._id);
        return true;
    });
}

const loadNewMessages = async (params) => {
    const result = await getMessages(localStorage.getItem("token"), params);
    if (result.status === "success") {
        // Combine the old messages with the new messages, and remove duplicates
        state.messages = sanitize([...state.messages, ...result.data]);
        state.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        console.log(state.messages);
    }
    else {
        console.error("Chat.vue onLazyLoad(): " + result.message);
    }
}

onMounted(() => {
    state.decodedJWT = decodeJWT(localStorage.getItem("token"));
});

watch(() => props.chatGroup, async () => {
    state.chatGroup = props.chatGroup;
    state.messages = [];loadNewMessages({
        first: 0,
        last: 10,
        filter: {
            chatGroup: props.chatGroup?._id
        }
    });
});
</script>
<template>
<div v-if="state.chatGroup !== null" class="chat__wrapper">
    <div class="chat__header"><h2>{{ props.chatGroup ? props.chatGroup.name : "Chat" }}</h2></div>
    <ChatScroller :messages="state.messages" :chat-group="state.chatGroup" @request-messages="loadNewMessages" />
    <div class="chat__input">
        <InputText v-model="state.message" placeholder="Aa" :onkeypress="e => { if (e.key === 'Enter') sendMessage() }" />
        <Button icon="pi pi-send" aria-label="Send" :onclick="sendMessage" />
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