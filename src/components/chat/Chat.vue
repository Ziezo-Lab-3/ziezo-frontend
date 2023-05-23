<script setup>
import { reactive, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import decodeJWT from '../../js/decodeJWT';
import { getMessages, postMessage } from '../../api/message';
import { getChatGroups } from '../../api/chatGroup';
import ChatScroller from './ChatScroller.vue';

const router = useRouter();
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
    }
    else {
        console.error("Chat.vue onLazyLoad(): " + result.message);
    }
}
const updateChatGroup = async () => {
    const result = await getChatGroups(localStorage.getItem("token"));
    if (result.status === "success") {
        // Get id from url
        const id = router.currentRoute.value.params.id;

        // Find the chatGroup with the id from the url
        state.chatGroup = result.data.find((chatGroup) => chatGroup._id === id);
    }
    else {
        console.error("Chat.vue onMounted(): " + result.message);
    }
}

const back = () => {
    router.back();
}

onMounted(async () => {
    state.decodedJWT = decodeJWT(localStorage.getItem("token"));
    await updateChatGroup();
});

watch(() => router.currentRoute.value.params.id, async () => {
    await updateChatGroup();
});

watch(() => state.chatGroup, async () => {
    state.chatGroup = state.chatGroup;
    state.messages = [];
    loadNewMessages({
        first: 0,
        last: 10,
        filter: {
            chatGroup: state.chatGroup?._id
        }
    });
});

</script>
<template>
<div v-if="state.chatGroup !== null" class="chat__wrapper">
    <div class="chat__header"><h2><i style="font-size: 2rem" class="pi pi-arrow-left tablet-show" @click="back"></i>{{ state.chatGroup ? state.chatGroup.name : "Chat" }}</h2></div>
    <ChatScroller :messages="state.messages" :chat-group="state.chatGroup" @request-messages="loadNewMessages" />
    <div class="chat__input">
        <InputText v-model="state.message" placeholder="Aa" :onkeypress="e => { if (e.key === 'Enter') sendMessage() }" />
        <Button icon="pi pi-send" aria-label="Send" :onclick="sendMessage" />
    </div>
</div>
</template>
<style scoped>
h2 {
    display: flex;
    gap: 1rem;
}
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