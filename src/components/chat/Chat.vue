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

const sendMessageOnEnter = (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
}

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
        scrollChat();
    }
    else {
        console.error("Chat.vue sendMessage(): " + result.message);
    }
}

const getMessageFormat = (message) => {
    // If the message is null, return null
    const index = state.messages.findIndex((value) => value.id === message?.id);
    if (message === null) return;
    const previous = state.messages[index - 1];
    const next = state.messages[index + 1];

    // Check if the message is the first or last message from the sender
    const isTop = !previous || (previous && previous.sender !== message?.sender);
    const isBottom = next && next.sender !== message?.sender;

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
    if (messages.status === "success") {
        state.messages = [...state.messages, ...messages.data];
        state.isLoadingData = false;
        scrollChat();
    }
    else {
        console.error("Chat.vue onLazyLoad(): " + messages.message);
    }
}

// Handle scroll behavior of chat__messages
const scrollChat = () => {
    const chatMessages = document.querySelector(".chat__messages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

const getUserByID = (id) => {
    if (state.chatGroup === null) return null;
    let user = state.chatGroup.members.find((value) => value._id === id);
    console.log(user);
    return user;
}

onMounted(() => {
    state.decodedJWT = decodeJWT(localStorage.getItem("token"));
    state.initialized = true;
});

watch(() => props.chatGroup, async () => {
    state.messages = [];
    state.chatGroup = props.chatGroup;
});

watch(() => state.messages, () => {
    let x = Object.assign([], state.messages);
    x = x.map((value) => {
        value = Object.assign({}, value);
        return value;
    });
});

</script>
<template>
<div v-if="state.chatGroup !== null" class="chat__wrapper">
    <div class="chat__header"><h2>{{ props.chatGroup ? props.chatGroup.name : "Chat" }}</h2></div>
    <div class="chat__messages">
        <VirtualScroller
            :style="{height: '100%'}"
            :items="state.messages"
            :itemSize="50"
            scrollHeight="500px"
            :delay="250"
            :loading="state.isLoadingData"
            lazy
            @lazy-load="onLazyLoad">
            <template #item="{item}">
                <Message :text="item.message" 
                    :avatar="getUserByID(item.sender).avatar | ''"
                    :self="item.sender === state.decodedJWT.id" 
                    :date="item.createdAt"
                    :name="getUserByID(item.sender).name_first + ' ' + getUserByID(item.sender).name_last"
                    :format="getMessageFormat(item)"
                />
            </template>
            <p v-if="state.messages.length === 0" class="chat__empty-message">Stuur een bericht en start de conversatie!</p>
        </VirtualScroller>
    </div>
    <div class="chat__input">
        <InputText v-model="state.message" placeholder="Aa" :onkeypress="sendMessageOnEnter" />
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