<script setup>
import { reactive, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { getChatGroups } from '../../api/chatGroup';
import Avatar from '../Avatar.vue';

const router = useRouter();
const emit = defineEmits(['update-selection']);

const state = reactive({
    instances: [],
    initialized: false,
    isLoadingData: false,
    selectedChatGroup: null,
});

const selectChatGroup = (index) => {
    emit('update-selection', state.instances[index]);
    router.push(`/app/message/${state.instances[index]._id}`);
}

onMounted(async () => {
    state.isLoadingData = true;
    const chatGroups = await getChatGroups(localStorage.getItem('token'));
    state.instances = chatGroups.data;

    if (screen.width > 768 && state.instances.length > 0) 
        selectChatGroup(0);

    state.isLoadingData = false;
    state.initialized = true;
});
</script>
<template>
    <h2>Adresboek</h2>
    <div class="chat-list">
        <div v-if="!state.initialized">
            Loading...
        </div>
        <div v-else-if="state.instances.length === 0">
            <p>Geen chats gevonden</p>
        </div>
        <div v-else>
            <RouterLink v-for="(instance, index) in state.instances" :key="instance._id" :tabindex="2" :to="`/app/message/${instance._id}`" class="chat-link">
                <Avatar :src="instance.picture" :name="instance.name || '!'" :width="48" />
                <div>
                    <h3>{{ instance.name }}</h3>
                    <p>{{ instance.lastMessage }}</p>
                </div> 
                <div v-if="instance.unreadMessages > 0" class="bubble-unread">
                    {{ instance.unreadMessages }}
                </div> 
            </RouterLink>
        </div>
    </div>
</template>
<style scoped>
.chat-list {
    height: 100%;
    overflow-y: auto;
}
.chat-list > div {
    width: 100%;
}
.chat-link {
    color: inherit; /* blue colors for links too */
    text-decoration: inherit; /* no underline */
    padding: .5em;
    align-items: center;
    display: flex;
    align-items: center;
    width: 100%;
    box-shadow: inset 0px 0px var(--primary);
    transition: background-color .2s linear, box-shadow .2s linear;
    margin-bottom: .5em;
    padding-left: 1em;
}

.chat-link.router-link-active {
    box-shadow: inset 4px 0px var(--primary);
}

.chat-link:hover {
    cursor: pointer;
    background-color: var(--gray-100);
}

.chat-link.chat-link--active {
    background-color: #a4acc2;
}

.chat-link > div {
    margin-left: .5em;
    width: calc(100% - 4.5em); /* subtract the width of the image and padding from the container */
   
}

.chat-link > div > h3,
.chat-link > div > p {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}

.bubble-unread {
    background-color: var(--primary);
    border-radius: 50%;
    color: var(--white);
    font-size: .75em;
    font-weight: bold;
    height: 1.5em;
    aspect-ratio: 1/1;
    text-align: center;
    line-height: 1.5em;

    position: relative;
    right: 1.5em;
    top: -1em;
}
</style>