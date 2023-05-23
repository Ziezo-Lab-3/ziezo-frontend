<script setup>
import { onMounted, watch, ref } from 'vue';
import Message from './Message.vue';
import decodeJWT from '../../js/decodeJWT';

const props = defineProps({
    messages: {
        type: Array,
        required: true,
    },
    chatGroup: {
        type: Object,
        required: true,
    }
});

const emit = defineEmits(["request-messages"]);
const messageCount = ref(0);
const decodedJWT = decodeJWT(localStorage.getItem("token"));

const getMessageFormat = (message) => {
    // If the message is null, return null
    const index = props.messages.findIndex((value) => value.id === message?.id);
    if (message === null) return;
    const previous = props.messages[index - 1];
    const next = props.messages[index + 1];

    // Check if the message is the first or last message from the sender
    const isTop = !previous || (previous && previous.sender !== message?.sender);
    const isBottom = next && next.sender !== message?.sender;

    // If the message is the first or last message in the list, return the correct format
    if (isTop && isBottom) return "single";
    if (isTop) return "top";
    if (isBottom) return "bottom";
    return "middle";
}

const getUserByID = (id) => {
    if (props.chatGroup === null) return null;
    let user = props.chatGroup.members.find((value) => value._id === id);
    return user;
}

// Request messages when the user scrolls to the top of the chat__messages element
const onMessageScroll = (event) => {
    const element = event.target;
    if (element.scrollTop !== 0) return;
    if (props.hasOldest) return;
    emit("request-messages", {
        first: props.messages.length,
        last: props.messages.length + 10,
        filter: {
            chatGroup: props.chatGroup?._id
        }
    });
}

// Autoscroll behaviour
watch(() => props.messages, () => {
    setTimeout(() => {
        const chatMessages = document.querySelector(".chat__messages");
        const newCount = props.messages.length - messageCount.value;
        if (newCount <= 0) return;
        // get the last n elements from chatMessages
        const newElements = Array.from(chatMessages.children).slice(-newCount);
        // get the total height of the last n elements
        const addedHeight = newElements.reduce((acc, cur) => acc + cur.offsetHeight, 0);

        const scrollBottom = chatMessages.scrollHeight - chatMessages.scrollTop;
        if (scrollBottom - chatMessages.offsetHeight <= addedHeight) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        messageCount.value = props.messages.length;
    }, 10);
});

onMounted(() => {
    emit("request-messages", {
        first: 0,
        last: 10,
        filter: {
            chatGroup: props.chatGroup?._id
        }
    });
});
</script>
<template>
    <div class="chat__messages" @scroll="onMessageScroll">
        <Message v-for="item in props.messages" :key="item.id"
            :text="item.message" 
            :avatar="getUserByID(item.sender)?.avatar || ''"
            :self="item.sender === decodedJWT.id" 
            :date="item.createdAt"
            :name="getUserByID(item.sender).name_first + ' ' + getUserByID(item.sender).name_last"
            :format="getMessageFormat(item)"
        />
        <div class="chat__messages__empty" v-if="props.messages.length ===0">Stuur een bericht en start de conversatie!</div>
    </div>
</template>
<style scoped>
.chat__messages {
    overflow-y: auto;
    scroll-behavior: smooth;
}

.chat__messages__empty {
    text-align: center;
    margin-top: 1rem;
    color: var(--gray-400);
    }
</style>